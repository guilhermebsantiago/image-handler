import fs from 'fs'
import path from 'path';

export async function makeDirectory(name:string|any){
    if(!path.dirname("./unzipedFiles")){
        fs.mkdir('./unzipedFiles', err=>{ console.error(err) })
    }
    
    fs.mkdir(`./unzipedFiles/${name}`, err =>{ })
}