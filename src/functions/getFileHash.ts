import { readFileSync } from 'fs'
import { createHash } from 'crypto'

export const getFileHash = (filePath: string): string => {
  //read file contents
  const fileBuffer = readFileSync(filePath)

  //create a hash object
  const hash = createHash('sha256')
  
  //pass the file buffer to the hash object
  hash.update(fileBuffer)

  return hash.digest('hex')
}