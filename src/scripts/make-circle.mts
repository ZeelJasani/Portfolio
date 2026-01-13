import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = path.join(process.cwd(), 'public', 'icons', 'ZeelJasani.png');
const outputPath = path.join(process.cwd(), 'public', 'icons', 'ZeelJasaniCircle.png');

async function makeCircle() {
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        const width = metadata.width || 0;
        const height = metadata.height || 0;
        const size = Math.min(width, height);

        // Create a circle SVG mask
        const circleSvg = Buffer.from(
            `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`
        );

        await image
            .resize(size, size, { fit: 'cover' }) // Ensure it's square
            .composite([{
                input: circleSvg,
                blend: 'dest-in' // Keeps only the overlapping part (the circle)
            }])
            .toFile(outputPath);

        console.log(`Success! Created circular icon at: ${outputPath}`);
    } catch (error) {
        console.error('Error processing image:', error);
    }
}

makeCircle();
