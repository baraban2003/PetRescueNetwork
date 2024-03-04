export const fileToByteArray = async (file: File): Promise<Uint8Array> => {
  return new Promise<Uint8Array>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result instanceof ArrayBuffer) {
        const arrayBuffer = event.target.result
        const byteArray = new Uint8Array(arrayBuffer)
        resolve(byteArray)
      } else {
        reject(new Error("Failed to read file as ArrayBuffer"))
      }
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsArrayBuffer(file)
  })
}
