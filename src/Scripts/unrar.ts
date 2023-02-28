import { createExtractorFromFile } from 'node-unrar-js'

export async function extractRarArchive(file:string, destination:string) {
  try {
    // Create the extractor with the file information (returns a promise)
    const extractor = await createExtractorFromFile({
      filepath: file,
      targetPath: destination
    });

    // Extract the files
    [...extractor.extract().files];
  } catch (err) {
    // May throw UnrarError, see docs
    console.error(err);
  }
}
