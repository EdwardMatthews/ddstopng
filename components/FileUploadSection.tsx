'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, ArrowRight, Download } from 'lucide-react'

interface FileUploadProps {
  dictionary: {
    dropzone: {
      title: string
      subtitle: string
    }
    convert: string
    converting: string
    download: string
  }
}

export default function FileUploadSection({ dictionary }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [converting, setConverting] = useState(false)
  const [convertedData, setConvertedData] = useState<{
    data: string;
    filename: string;
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.name.toLowerCase().endsWith('.dds')) {
      setFile(selectedFile)
      setConvertedData(null)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.name.toLowerCase().endsWith('.dds')) {
      setFile(droppedFile)
      setConvertedData(null)
    }
  }

  const handleConvert = async () => {
    if (!file) return

    setConverting(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setConvertedData(data)
    } catch (error) {
      console.error('Conversion failed:', error)
    } finally {
      setConverting(false)
    }
  }

  const handleDownload = () => {
    if (!convertedData) return

    const link = document.createElement('a')
    link.href = convertedData.data
    link.download = convertedData.filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <input
          type="file"
          accept=".dds"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label 
          htmlFor="file-upload"
          className="cursor-pointer"
        >
          <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <p className="text-lg mb-2">{dictionary.dropzone.title}</p>
          <p className="text-sm text-gray-500">{dictionary.dropzone.subtitle}</p>
        </label>

        {file && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">{file.name}</p>
          </div>
        )}
      </motion.div>

      {file && !convertedData && (
        <motion.button
          onClick={handleConvert}
          disabled={converting}
          className="mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {converting ? (
            <span className="flex items-center">
              {dictionary.converting}
              <ArrowRight className="ml-2 w-5 h-5 animate-pulse" />
            </span>
          ) : (
            <span className="flex items-center">
              {dictionary.convert}
              <ArrowRight className="ml-2 w-5 h-5" />
            </span>
          )}
        </motion.button>
      )}

      {convertedData && (
        <motion.button
          onClick={handleDownload}
          className="mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="mr-2 w-5 h-5" />
          {dictionary.download}
        </motion.button>
      )}
    </div>
  )
} 