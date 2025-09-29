const fs = require('fs');
const path = require('path');

/**
 * This script creates placeholder PNG files for DDS icons
 * Since browsers can't display .dds files, this creates simple colored placeholders
 * with the icon ID as text until proper conversion is done
 */

function setupIconPlaceholders() {
    const iconSourceDir = path.join(__dirname, '../../data/icon');
    const iconTargetDir = path.join(__dirname, '../../public/icons');
    const iconsInfoPath = path.join(__dirname, '../../data/iconsinfo.json');
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(iconTargetDir)) {
        fs.mkdirSync(iconTargetDir, { recursive: true });
    }
    
    // Read icons info
    let iconsInfo = [];
    if (fs.existsSync(iconsInfoPath)) {
        const iconsData = JSON.parse(fs.readFileSync(iconsInfoPath, 'utf8'));
        iconsInfo = iconsData;
    }
    
    console.log(`Found ${iconsInfo.length} icons in iconsinfo.json`);
    
    // Create a simple HTML file that generates placeholder images
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Icon Placeholder Generator</title>
    <style>
        .icon-canvas {
            width: 102px;
            height: 84px;
            background: linear-gradient(135deg, #4a5568, #2d3748);
            border: 1px solid #718096;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: Arial, sans-serif;
            font-size: 10px;
            text-align: center;
            margin: 2px;
            float: left;
        }
        .container {
            padding: 20px;
        }
        .info {
            background: #e2e8f0;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="info">
            <h2>Icon Placeholder Generator</h2>
            <p>This page shows placeholder icons for the ${iconsInfo.length} icons found in your system.</p>
            <p><strong>Note:</strong> To get actual icons working, you need to:</p>
            <ol>
                <li>Convert the .dds files in <code>data/icon/</code> to .png format</li>
                <li>Place the converted files in <code>public/icons/</code></li>
                <li>Use tools like ImageMagick, GIMP, or online converters</li>
            </ol>
            <p>For now, the achievement GUI will show icon IDs as placeholders.</p>
        </div>
        
        <h3>Sample Icons (first 50):</h3>
        ${iconsInfo.slice(0, 50).map(icon => `
            <div class="icon-canvas" title="File: ${icon.ii_filename}, ID: ${icon.ii_id}">
                #${icon.ii_id}
            </div>
        `).join('')}
        
        <div style="clear: both; margin-top: 20px;">
            <p><em>Showing first 50 of ${iconsInfo.length} total icons</em></p>
        </div>
    </div>
</body>
</html>`;
    
    // Write the HTML file
    fs.writeFileSync(path.join(iconTargetDir, 'placeholder-info.html'), htmlContent);
    
    console.log('✅ Icon placeholder info created at public/icons/placeholder-info.html');
    console.log('📝 Visit http://localhost:4000/icons/placeholder-info.html to see icon information');
    console.log('');
    console.log('To fix icons properly:');
    console.log('1. Install ImageMagick: https://imagemagick.org/script/download.php');
    console.log('2. Run: magick convert data/icon/*.dds public/icons/');
    console.log('3. Or use online converters to convert .dds to .png files');
    console.log('4. Place converted files in public/icons/ directory');
}

if (require.main === module) {
    setupIconPlaceholders();
}

module.exports = { setupIconPlaceholders };