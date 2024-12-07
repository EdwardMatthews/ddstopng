import { NextRequest, NextResponse } from 'next/server'
import { convertDDStoPNG } from '@/lib/ddsConverter'

export async function POST(request: NextRequest) {
  console.log('Conversion requested')
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    
    console.log('File converted to buffer')
    // Convert DDS to PNG
    const pngBuffer = await convertDDStoPNG(buffer)
    
    console.log('PNG buffer created')

    // Return the PNG buffer as base64
    const base64Data = pngBuffer.toString('base64')
    return NextResponse.json({ 
      data: `data:image/png;base64,${base64Data}`,
      filename: file.name.replace('.dds', '.png')
    })
  } catch (error) {
    console.error('Conversion error:', error)
    return NextResponse.json(
      { error: 'Failed to convert file' },
      { status: 500 }
    )
  }
} 