const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Real DDS to PNG converter
 * This script provides multiple methods to convert DDS files properly
 */

async function convertDdsFiles() {
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
    console.log('Trying different conversion methods...\n');
    
    // Method 1: Try ImageMagick (if available)
    if (await tryImageMagickInstall()) {
        console.log('✓ ImageMagick found! Converting files...');
        await convertWithImageMagick(iconSourceDir, iconTargetDir, ddsFiles);
        return;
    }
    
    // Method 2: Try FFmpeg (if available)
    if (await tryFFmpeg()) {
        console.log('✓ FFmpeg found! Converting files...');
        await convertWithFFmpeg(iconSourceDir, iconTargetDir, ddsFiles);
        return;
    }
    
    // Method 3: Manual conversion instructions
    console.log('❌ No automatic conversion tools found.');
    console.log('\n=== Manual Conversion Required ===');
    console.log('Please use one of these methods to convert DDS files to PNG:');
    console.log('');
    console.log('Option 1 - Install ImageMagick:');
    console.log('1. Download from: https://imagemagick.org/script/download.php#windows');
    console.log('2. Install with "Add to PATH" option checked');
    console.log('3. Restart your terminal');
    console.log('4. Run this script again');
    console.log('');
    console.log('Option 2 - Use GIMP (Free):');
    console.log('1. Download GIMP: https://www.gimp.org/downloads/');
    console.log('2. Install DDS plugin for GIMP');
    console.log('3. Batch convert: File > Export As > PNG');
    console.log('');
    console.log('Option 3 - Online Converter:');
    console.log('1. Visit: https://convertio.co/dds-png/');
    console.log('2. Upload DDS files from data/icon/ folder');
    console.log('3. Download converted PNG files');
    console.log('4. Place them in public/icons/ folder');
    console.log('');
    console.log('Option 4 - Use XnConvert (Free):');
    console.log('1. Download: https://www.xnview.com/en/xnconvert/');
    console.log('2. Add data/icon/ folder');
    console.log('3. Set output format to PNG');
    console.log('4. Set output folder to public/icons/');
    console.log('5. Click Convert');
    
    // Create a batch file for Windows users
    createWindowsBatchFile(iconSourceDir, iconTargetDir);
}

async function tryImageMagickInstall() {
    try {
        execSync('magick -version', { stdio: 'ignore' });
        return true;
    } catch (error) {
        return false;
    }
}

async function tryFFmpeg() {
    try {
        execSync('ffmpeg -version', { stdio: 'ignore' });
        return true;
    } catch (error) {
        return false;
    }
}

async function convertWithImageMagick(sourceDir, targetDir, ddsFiles) {
    let converted = 0;
    let failed = 0;
    
    for (const ddsFile of ddsFiles) {
        const sourcePath = path.join(sourceDir, ddsFile);
        const targetPath = path.join(targetDir, ddsFile.replace('.dds', '.png'));
        
        // Skip if already exists
        if (fs.existsSync(targetPath)) {
            console.log(`⏭️  Skip: ${ddsFile} (already exists)`);
            converted++;
            continue;
        }
        
        try {
            execSync(`magick "${sourcePath}" "${targetPath}"`, { stdio: 'ignore' });
            console.log(`✅ ${ddsFile} -> ${ddsFile.replace('.dds', '.png')}`);
            converted++;
        } catch (error) {
            console.log(`❌ Failed: ${ddsFile}`);
            failed++;
        }
    }
    
    console.log(`\n=== Conversion Complete ===`);
    console.log(`✅ Converted: ${converted}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📁 Output: ${targetDir}`);
}

async function convertWithFFmpeg(sourceDir, targetDir, ddsFiles) {
    let converted = 0;
    let failed = 0;
    
    for (const ddsFile of ddsFiles.slice(0, 5)) { // Test with first 5
        const sourcePath = path.join(sourceDir, ddsFile);
        const targetPath = path.join(targetDir, ddsFile.replace('.dds', '.png'));
        
        if (fs.existsSync(targetPath)) {
            console.log(`⏭️  Skip: ${ddsFile} (already exists)`);
            converted++;
            continue;
        }
        
        try {
            execSync(`ffmpeg -i "${sourcePath}" "${targetPath}"`, { stdio: 'ignore' });
            console.log(`✅ ${ddsFile} -> ${ddsFile.replace('.dds', '.png')}`);
            converted++;
        } catch (error) {
            console.log(`❌ Failed: ${ddsFile}`);
            failed++;
        }
    }
    
    console.log(`\n=== Test Conversion Complete ===`);
    console.log(`✅ Converted: ${converted}`);
    console.log(`❌ Failed: ${failed}`);
}

function createWindowsBatchFile(sourceDir, targetDir) {
    const batchContent = `@echo off
echo DDS to PNG Conversion Batch File
echo ================================
echo.
echo This batch file will help you convert DDS files to PNG
echo.
echo Prerequisites:
echo 1. Install ImageMagick from: https://imagemagick.org/script/download.php#windows
echo 2. Make sure "Add to PATH" is checked during installation
echo 3. Restart your command prompt
echo.
pause
echo.
echo Converting DDS files...
echo.

cd /d "${sourceDir}"
for %%f in (*.dds) do (
    echo Converting %%f...
    magick "%%f" "${targetDir}\\%%~nf.png"
)

echo.
echo Conversion complete!
echo Check the ${targetDir} folder for PNG files.
pause`;

    const batchPath = path.join(__dirname, '../../convert-dds-to-png.bat');
    fs.writeFileSync(batchPath, batchContent);
    
    console.log(`\n📄 Created batch file: convert-dds-to-png.bat`);
    console.log('You can run this batch file after installing ImageMagick');
}

if (require.main === module) {
    convertDdsFiles().catch(console.error);
}

module.exports = { convertDdsFiles };