import sharp from 'sharp'

// DDS header flags
const DDSD_CAPS = 0x1
const DDSD_HEIGHT = 0x2
const DDSD_WIDTH = 0x4
const DDSD_PITCH = 0x8
const DDSD_PIXELFORMAT = 0x1000
const DDSD_MIPMAPCOUNT = 0x20000
const DDSD_LINEARSIZE = 0x80000
const DDSD_DEPTH = 0x800000

// DDS pixel format flags
const DDPF_ALPHAPIXELS = 0x1
const DDPF_ALPHA = 0x2
const DDPF_FOURCC = 0x4
const DDPF_RGB = 0x40
const DDPF_YUV = 0x200
const DDPF_LUMINANCE = 0x20000

// DDS FourCC codes
const FOURCC_DXT1 = 0x31545844 // "DXT1"
const FOURCC_DXT3 = 0x33545844 // "DXT3"
const FOURCC_DXT5 = 0x35545844 // "DXT5"

interface DDSHeader {
  magic: number
  size: number
  flags: number
  height: number
  width: number
  pitchOrLinearSize: number
  depth: number
  mipmapCount: number
  pixelFormat: {
    size: number
    flags: number
    fourCC: number
    rgbBitCount: number
    rBitMask: number
    gBitMask: number
    bBitMask: number
    aBitMask: number
  }
}

function readDDSHeader(buffer: Buffer): DDSHeader {
  const magic = buffer.readUInt32LE(0)
  if (magic !== 0x20534444) { // "DDS "
    throw new Error('Invalid DDS file')
  }

  return {
    magic,
    size: buffer.readUInt32LE(4),
    flags: buffer.readUInt32LE(8),
    height: buffer.readUInt32LE(12),
    width: buffer.readUInt32LE(16),
    pitchOrLinearSize: buffer.readUInt32LE(20),
    depth: buffer.readUInt32LE(24),
    mipmapCount: buffer.readUInt32LE(28),
    pixelFormat: {
      size: buffer.readUInt32LE(76),
      flags: buffer.readUInt32LE(80),
      fourCC: buffer.readUInt32LE(84),
      rgbBitCount: buffer.readUInt32LE(88),
      rBitMask: buffer.readUInt32LE(92),
      gBitMask: buffer.readUInt32LE(96),
      bBitMask: buffer.readUInt32LE(100),
      aBitMask: buffer.readUInt32LE(104)
    }
  }
}

function decodeDXT1Block(block: Buffer, pixels: Buffer, width: number, x: number, y: number) {
  const c0 = block.readUInt16LE(0)
  const c1 = block.readUInt16LE(2)
  const codes = block.readUInt32LE(4)

  // Extract RGB565 colors
  const colors = [
    { r: ((c0 >> 11) & 0x1F) << 3, g: ((c0 >> 5) & 0x3F) << 2, b: (c0 & 0x1F) << 3, a: 255 },
    { r: ((c1 >> 11) & 0x1F) << 3, g: ((c1 >> 5) & 0x3F) << 2, b: (c1 & 0x1F) << 3, a: 255 }
  ]

  // Generate intermediate colors
  if (c0 > c1) {
    colors.push({
      r: (2 * colors[0].r + colors[1].r) / 3,
      g: (2 * colors[0].g + colors[1].g) / 3,
      b: (2 * colors[0].b + colors[1].b) / 3,
      a: 255
    })
    colors.push({
      r: (colors[0].r + 2 * colors[1].r) / 3,
      g: (colors[0].g + 2 * colors[1].g) / 3,
      b: (colors[0].b + 2 * colors[1].b) / 3,
      a: 255
    })
  } else {
    colors.push({
      r: (colors[0].r + colors[1].r) / 2,
      g: (colors[0].g + colors[1].g) / 2,
      b: (colors[0].b + colors[1].b) / 2,
      a: 255
    })
    colors.push({ r: 0, g: 0, b: 0, a: 0 }) // Transparent black
  }

  // Write pixels
  for (let py = 0; py < 4; py++) {
    for (let px = 0; px < 4; px++) {
      const idx = (codes >> ((py * 4 + px) * 2)) & 0x3
      const color = colors[idx]
      const offset = ((y + py) * width + (x + px)) * 4

      if (offset < pixels.length - 3) {
        pixels[offset] = color.r
        pixels[offset + 1] = color.g
        pixels[offset + 2] = color.b
        pixels[offset + 3] = color.a
      }
    }
  }
}

function decodeDXT3Block(block: Buffer, pixels: Buffer, width: number, x: number, y: number) {
  // First 8 bytes are the alpha values (4 bits per pixel)
  for (let py = 0; py < 4; py++) {
    for (let px = 0; px < 4; px++) {
      const alphaOffset = py * 4 + px
      const alphaByte = block[Math.floor(alphaOffset / 2)]
      const alpha = alphaOffset % 2 === 0 ? 
        (alphaByte & 0x0F) << 4 : 
        (alphaByte & 0xF0)
      
      const offset = ((y + py) * width + (x + px)) * 4 + 3
      if (offset < pixels.length) {
        pixels[offset] = alpha
      }
    }
  }

  // Remaining 8 bytes are the color block (same as DXT1)
  decodeDXT1Block(block.slice(8), pixels, width, x, y)
}

function decodeDXT5Block(block: Buffer, pixels: Buffer, width: number, x: number, y: number) {
  const alpha0 = block[0]
  const alpha1 = block[1]
  
  // Generate alpha table
  const alphas = [alpha0, alpha1]
  if (alpha0 > alpha1) {
    for (let i = 0; i < 6; i++) {
      alphas.push(((6 - i) * alpha0 + (i + 1) * alpha1) / 7)
    }
  } else {
    for (let i = 0; i < 4; i++) {
      alphas.push(((4 - i) * alpha0 + (i + 1) * alpha1) / 5)
    }
    alphas.push(0)
    alphas.push(255)
  }

  // Extract alpha indices
  let alphaCodes = 0n
  for (let i = 0; i < 6; i++) {
    alphaCodes = alphaCodes | (BigInt(block[i + 2]) << BigInt(8 * i))
  }

  // Write alpha values
  for (let py = 0; py < 4; py++) {
    for (let px = 0; px < 4; px++) {
      const idx = Number((alphaCodes >> BigInt((py * 4 + px) * 3)) & 0x07n)
      const offset = ((y + py) * width + (x + px)) * 4 + 3
      if (offset < pixels.length) {
        pixels[offset] = alphas[idx]
      }
    }
  }

  // Decode color block (same as DXT1)
  decodeDXT1Block(block.slice(8), pixels, width, x, y)
}

export async function convertDDStoPNG(buffer: Buffer): Promise<Buffer> {
  try {
    const header = readDDSHeader(buffer)
    const { width, height } = header

    // Create buffer for raw pixel data
    const pixels = Buffer.alloc(width * height * 4)

    if (header.pixelFormat.flags & DDPF_FOURCC) {
      const blockSize = header.pixelFormat.fourCC === FOURCC_DXT1 ? 8 : 16
      const blocksWide = Math.ceil(width / 4)
      const blocksHigh = Math.ceil(height / 4)

      for (let y = 0; y < blocksHigh; y++) {
        for (let x = 0; x < blocksWide; x++) {
          const blockOffset = 128 + (y * blocksWide + x) * blockSize
          const block = buffer.slice(blockOffset, blockOffset + blockSize)

          switch (header.pixelFormat.fourCC) {
            case FOURCC_DXT1:
              decodeDXT1Block(block, pixels, width, x * 4, y * 4)
              break
            case FOURCC_DXT3:
              decodeDXT3Block(block, pixels, width, x * 4, y * 4)
              break
            case FOURCC_DXT5:
              decodeDXT5Block(block, pixels, width, x * 4, y * 4)
              break
            default:
              throw new Error(`Unsupported DDS format: ${header.pixelFormat.fourCC.toString(16)}`)
          }
        }
      }
    } else if (header.pixelFormat.flags & DDPF_RGB) {
      // Handle uncompressed RGB/RGBA
      const bytesPerPixel = header.pixelFormat.rgbBitCount / 8
      const dataOffset = 128 // Header size

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcOffset = dataOffset + (y * width + x) * bytesPerPixel
          const dstOffset = (y * width + x) * 4

          if (bytesPerPixel >= 3) {
            pixels[dstOffset] = buffer[srcOffset + 2] // R
            pixels[dstOffset + 1] = buffer[srcOffset + 1] // G
            pixels[dstOffset + 2] = buffer[srcOffset] // B
            pixels[dstOffset + 3] = bytesPerPixel === 4 ? buffer[srcOffset + 3] : 255 // A
          }
        }
      }
    } else {
      throw new Error('Unsupported DDS format')
    }

    // Convert to PNG using sharp
    return await sharp(pixels, {
      raw: {
        width,
        height,
        channels: 4
      }
    })
    .png()
    .toBuffer()
  } catch (error) {
    console.error('DDS conversion error:', error)
    throw new Error('Failed to convert DDS file')
  }
} 