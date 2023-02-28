import fs from "fs/promises";

export class ChapterHandler {
  private static checkFiles(images: string[], path:string) {
    if (
      images.every((e) => e.endsWith(".jpeg")) ||
      images.every((e) => e.endsWith(".jpg")) ||
      images.every((e) => e.endsWith(".png"))
    ) {
      this.uploadToCloud(Math.floor(Math.random()*10))
    } else {
      this.deleteUnvalidatedFiles(path)
    }
  }

  public static async getFiles(directory:string, path:string){
    
    let filesList:string[] = await fs.readdir(directory)

    this.checkFiles(filesList, path)
  }

  private static deleteUnvalidatedFiles(path:string){
    fs.rm(`./src/unzipedFiles/${path}`, {recursive:true})
    fs.unlink(`./uploads/${path}`)
    console.log("Invalid file, try with only images .png, .jpg or .jpeg")
  }

  private static uploadToCloud(time:number){
    console.log("uploading to cloud...")
    setTimeout(()=>{
      console.log("Done!")
    }, time)
  }
}
