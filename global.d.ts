/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly NEXT_PUBLIC_API_URL: string
  }
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

declare module '*.json' {
  const content: { [key: string]: any }
  export default content
} 