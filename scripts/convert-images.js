const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const imagesDir = path.resolve(__dirname, '../public/assets/images');

async function convertPngToWebp(fileName) {
  const inputPath = path.join(imagesDir, fileName);
  const outputPath = path.join(
    imagesDir,
    `${path.basename(fileName, path.extname(fileName))}.webp`
  );

  await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);
  console.log(`Converted ${fileName} -> ${path.basename(outputPath)}`);
}

async function main() {
  const entries = await fs.readdir(imagesDir, { withFileTypes: true });
  const pngFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => path.extname(fileName).toLowerCase() === '.png');

  if (pngFiles.length === 0) {
    console.log('No PNG images found to convert.');
    return;
  }

  await Promise.all(pngFiles.map(convertPngToWebp));
  console.log(`Done. Converted ${pngFiles.length} PNG image(s).`);
}

main().catch((error) => {
  console.error('Failed to convert images:', error);
  process.exitCode = 1;
});
