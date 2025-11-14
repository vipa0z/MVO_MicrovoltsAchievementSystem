const fs = require('fs');
const path = require('path');

/**
 * This script creates a mapping for icon files and copies them to public directory
 * Since browsers can't display .dds files, we assume they've been converted to .png
 * This script creates the necessary directory structure and file mappings
 */

function convertIconsToPng() {
    const iconSourceDir = path.join(__dirname, '../../data/icon');
    const iconTargetDir = path.join(__dirname, '../../public/icons');
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(iconTargetDir)) {
        fs.mkdirSync(iconTargetDir, { recursive: true });
    }
    
    // Read all .dds files from source directory
    const files = fs.readdirSync(iconSourceDir);
    const ddsFiles = files.filter(file => file.endsWith('.dds'));
    
    console.log(`Found ${ddsFiles.length} .dds files to process`);
    
    // Create a mapping file for the conversion
    const conversionMap = {};
    
    ddsFiles.forEach(file => {
        const pngFile = file.replace('.dds', '.png');
        conversionMap[file] = pngFile;
        
        // For now, just log what would be converted
        // In a real scenario, you'd use a tool like ImageMagick or similar
        console.log(`Would convert: ${file} -> ${pngFile}`);
    });
    
    // Write the conversion mapping
    fs.writeFileSync(
        path.join(__dirname, '../../data/icon-conversion-map.json'),
        JSON.stringify(conversionMap, null, 2)
    );
    
    console.log('✅ Icon conversion mapping created');
    console.log('📝 Note: You need to manually convert .dds files to .png using external tools');
    console.log('   Recommended: ImageMagick, GIMP, or online converters');
    console.log('   Place converted .png files in public/icons/ directory');
}

if (require.main === module) {
    convertIconsToPng();
}

module.exports = { convertIconsToPng };