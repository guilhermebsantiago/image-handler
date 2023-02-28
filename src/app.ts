import express from "express";
import multer from "multer";
import { storage } from "../multerConfig";
import { ChapterHandler } from "./Handlers/chapterHandler";
import { extractRarArchive } from "./Scripts/unrar";
import { makeDirectory } from "./Scripts/mkdir";
import decompress from "decompress";

const upload = multer({ storage: storage });
const app = express();

app.use("/files", express.static("uploads"));

app.post("/upload", upload.single("file"), async (req, res) => {
  if (req.file?.filename.endsWith(".rar")) {
    await makeDirectory(req.file?.filename);
    await extractRarArchive(
      `./uploads/${req.file?.filename}`,
      `./src/unzipedFiles/${req.file?.filename}`
    );
    ChapterHandler.getFiles(`./src/unzipedFiles/${req.file?.filename}`,req.file?.filename)
  } else if (req.file?.filename.endsWith(".zip")) {
    await makeDirectory(req.file?.filename);
    await decompress(
      `./uploads/${req.file?.filename}`,
      `./src/unzipedFiles/${req.file?.filename}`
    );
    ChapterHandler.getFiles(`./src/unzipedFiles/${req.file?.filename}`,req.file?.filename)
  } else {
    return res.json("Não é um arquivo rar ou zip!");
  }

  return res.json(req.file?.filename);
});

app.listen(3000);
