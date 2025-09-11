import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { getFileHash } from '../functions/getFileHash.js'
import { askChoices } from '../functions/askChoices.js'

export const findDuplicate = async (targetPath: string, interactive: boolean): Promise<void> => {
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

  for(const [hash, hashFiles] of hashMap.entries()){
    if (hashFiles.length > 1) {
      console.log(`${chalk.bgWhite('Duplicated files:')} \n`)
      for(const f of hashFiles){
        console.log(' -', f)
      }

      if(interactive){
        const action = await askChoices()

        if(action === "delete"){
          for(let i = 1; i < hashFiles.length; i++){
            fs.unlinkSync(hashFiles[i] as fs.PathLike)
            console.log("Deleted all duplicates")
          }
        }
        else if(action === "move"){
          
        }
      }
    }
  }
  
}