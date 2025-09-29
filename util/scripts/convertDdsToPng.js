const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Convert DDS files to PNG format for web display
 * This script attempts multiple conversion methods
 */

async function convertDdsToPng() {
    const iconSourceDir = path.join(__dirname, '../../data/icon');
    const iconTargetDir = path.join(__dirname, '../../public/icons');
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(iconTargetDir)) {
        fs.mkdirSync(iconTargetDir, { recursive: true });
    }
    
    // Get all DDS files
    const files = fs.readdirSync(iconSourceDir);
    const ddsFiles = files.filter(file => file.endsWith('.dds'));
    
    console.log(`Found ${ddsFiles.length} DDS files to convert`);
    
    let convertedCount = 0;
    let failedCount = 0;
    
    // Try different conversion methods
    const conversionMethods = [
        tryImageMagick,
        tryFFmpeg,
        tryOnlineConverter,
        createPlaceholderPng
    ];
    
    for (const ddsFile of ddsFiles) { // Convert all files
        const sourcePath = path.join(iconSourceDir, ddsFile);
        const targetPath = path.join(iconTargetDir, ddsFile.replace('.dds', '.png'));
        
        // Skip if already converted
        if (fs.existsSync(targetPath)) {
            console.log(`✓ Already exists: ${ddsFile}`);
            convertedCount++;
            continue;
        }
        
        let converted = false;
        for (const method of conversionMethods) {
            try {
                await method(sourcePath, targetPath, ddsFile);
                console.log(`✓ Converted: ${ddsFile}`);
                converted = true;
                convertedCount++;
                break;
            } catch (error) {
                // Try next method
                continue;
            }
        }
        
        if (!converted) {
            console.log(`✗ Failed: ${ddsFile}`);
            failedCount++;
        }
    }
    
    console.log(`\n=== Conversion Summary ===`);
    console.log(`✓ Converted: ${convertedCount}`);
    console.log(`✗ Failed: ${failedCount}`);
    console.log(`📁 Output directory: ${iconTargetDir}`);
}

function tryImageMagick(sourcePath, targetPath, filename) {
    try {
        execSync(`magick "${sourcePath}" "${targetPath}"`, { stdio: 'ignore' });
        return true;
    } catch (error) {
        throw new Error('ImageMagick not available');
    }
}

function tryFFmpeg(sourcePath, targetPath, filename) {
    try {
        execSync(`ffmpeg -i "${sourcePath}" "${targetPath}"`, { stdio: 'ignore' });
        return true;
    } catch (error) {
        throw new Error('FFmpeg not available');
    }
}

function tryOnlineConverter(sourcePath, targetPath, filename) {
    // This would require an API call to an online converter
    // For now, we'll skip this method
    throw new Error('Online converter not implemented');
}

function createPlaceholderPng(sourcePath, targetPath, filename) {
    // Create a simple colored PNG as placeholder
    const Canvas = require('canvas');
    const canvas = Canvas.createCanvas(102, 84);
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 102, 84);
    gradient.addColorStop(0, '#4a5568');
    gradient.addColorStop(1, '#2d3748');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 102, 84);
    
    // Add border
    ctx.strokeStyle = '#718096';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, 102, 84);
    
    // Add filename text
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const shortName = filename.replace('.dds', '').substring(0, 12);
    ctx.fillText(shortName, 51, 42);
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(targetPath, buffer);
    
    return true;
}

// Alternative method: Install canvas package first
async function installCanvasAndConvert() {
    console.log('Installing canvas package for PNG generation...');
    try {
        execSync('npm install canvas', { stdio: 'inherit' });
        await convertDdsToPng();
    } catch (error) {
        console.error('Failed to install canvas package:', error.message);
        console.log('\nAlternative solutions:');
        console.log('1. Install ImageMagick: https://imagemagick.org/script/download.php');
        console.log('2. Use online DDS to PNG converters');
        console.log('3. Use GIMP to batch convert files');
        
        // Create simple HTML placeholders instead
        createHtmlPlaceholders();
    }
}

function createHtmlPlaceholders() {
    const iconSourceDir = path.join(__dirname, '../../data/icon');
    const iconTargetDir = path.join(__dirname, '../../public/icons');
    
    if (!fs.existsSync(iconTargetDir)) {
        fs.mkdirSync(iconTargetDir, { recursive: true });
    }
    
    const files = fs.readdirSync(iconSourceDir);
    const ddsFiles = files.filter(file => file.endsWith('.dds'));
    
    console.log('Creating HTML-based icon placeholders...');
    
    // Create a simple SVG for each icon
    ddsFiles.slice(0, 50).forEach(ddsFile => {
        const svgContent = `
<svg width="102" height="84" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4a5568;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2d3748;stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="102" height="84" fill="url(#grad)" stroke="#718096" stroke-width="1"/>
    <text x="51" y="42" font-family="Arial" font-size="8" fill="#e2e8f0" text-anchor="middle" dominant-baseline="middle">
        ${ddsFile.replace('.dds', '').substring(0, 12)}
    </text>
</svg>`;
        
        const svgPath = path.join(iconTargetDir, ddsFile.replace('.dds', '.svg'));
        fs.writeFileSync(svgPath, svgContent);
    });
    
    console.log(`✓ Created ${Math.min(50, ddsFiles.length)} SVG placeholders`);
}

if (require.main === module) {
    // Try to install canvas and convert, fallback to HTML placeholders
    installCanvasAndConvert();
}

module.exports = { convertDdsToPng };