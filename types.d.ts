/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="next/navigation-types/navigation" />

declare module '*.json' {
  const value: any
  export default value
}

declare module 'dds-converter' {
  export class DDSLoader {
    constructor(buffer: Buffer)
    parse(): {
      buffer: Buffer
      width: number
      height: number
    }
  }
} 