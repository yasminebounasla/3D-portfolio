import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'src/assets';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

for (const f of files) {
  const outPath = path.join(dir, f.replace(/\.(png|jpg)$/, '.webp'));
  await sharp(path.join(dir, f))
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(outPath);
  console.log('✓', f, '→', outPath);
}