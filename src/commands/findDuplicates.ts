import chalk from 'chalk'
import fs, { readFileSync } from 'fs'
import path from 'path'
import crypto, { createHash } from 'crypto'

const getFileHash = (filePath: string): string => {
  //read file contents
  const fileBuffer = readFileSync(filePath)

  //create a hash object
  const hash = createHash('sha256')
  
  //pass the file buffer to the hash object
  hash.update(fileBuffer)

  return hash.digest('hex')
}

export const findDuplicate = (targetPath: string): void => {
  const absPath = path.resolve(targetPath)

  if(!fs.existsSync(absPath)){
    console.log(chalk.red("Incorrect path / folder not found"))
    return 
  }

  const files: string[] = fs.readdirSync(absPath)

  if (files.length === 0) {
    console.log(chalk.yellow("Empty folder"))
    return
  }

  const hashMap = new Map<string, string[]>()
  for(const file of files){
    const filePath = path.join(absPath, file)
    const stat: fs.Stats = fs.statSync(filePath)

    if(stat.isFile()){
      const hash = getFileHash(filePath)

      if(!hashMap.has(hash)){
        hashMap.set(hash, [])
      }

      hashMap.get(hash)?.push(filePath)
    }
  }

  for(const [hash, hashedFiles] of hashMap.entries()){
    if (hashedFiles.length > 1) {
      console.log(`${chalk.bgWhite('Duplicated files:')} \n`)
      for(const f of hashedFiles){
        console.log(' -', f)
      }
    }
  }
  
}