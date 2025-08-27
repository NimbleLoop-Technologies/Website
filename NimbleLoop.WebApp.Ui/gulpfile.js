const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const { deleteAsync } = require('del');
const fs = require('fs');
const path = require('path');

// PostCSS plugins configuration for different builds
const globalPostcssPlugins = [
    require('@tailwindcss/postcss')({
        config: './tailwind.config.js'
    })
];

const isolationPostcssPlugins = [
    require('@tailwindcss/postcss')({
        config: './tailwind.isolation.config.js'
    })
];

// Paths configuration
const paths = {
    // Global styles
    globalInput: './wwwroot/css/src/style-input.css',
    globalOutput: './wwwroot/css/dist/',
    
    // CSS isolation files
    razorTwCss: './Components/**/*.razor.tw.css',
    
    // Clean patterns - ONLY clean generated files, never source files
    cleanGlobal: './wwwroot/css/dist/style.css',
    cleanIsolation: [
        './Components/**/*.razor.css',
        './*.razor.css'
        // Explicitly NOT including wwwroot/**/*.razor.css to be safe
    ]
};

/**
 * Clean global style.css file
 */
async function cleanGlobalCss() {
    return await deleteAsync([paths.cleanGlobal]);
}

/**
 * Clean all generated .razor.css files (including any duplicates)
 */
async function cleanIsolationCss() {
    return await deleteAsync(paths.cleanIsolation);
}

/**
 * Clean all generated CSS files (both global and isolation)
 */
async function cleanAll() {
    return await deleteAsync([paths.cleanGlobal, ...paths.cleanIsolation]);
}

/**
 * Build global style.css from style-input.css
 * This scans the entire project for Tailwind classes
 */
function buildGlobalCss() {
    return gulp.src(paths.globalInput)
        .pipe(postcss(globalPostcssPlugins))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(paths.globalOutput));
}

/**
 * Build CSS isolation files - processes all .razor.tw.css files
 * This only processes classes within each individual .tw.css file
 */
function buildIsolationCss() {
    return gulp.src(paths.razorTwCss, { base: '.' })
        .pipe(postcss(isolationPostcssPlugins))
        .pipe(rename(function (pathObj) {
            // Transform filename: Component1.razor.tw.css -> Component1.razor.css
            pathObj.basename = pathObj.basename.replace('.razor.tw', '.razor');
        }))
        .pipe(gulp.dest('.'));
}

/**
 * Build all CSS files (global + isolation)
 */
const buildAll = gulp.series(buildGlobalCss, buildIsolationCss);

/**
 * List all .razor.tw.css files in the project (utility task)
 */
async function listIsolationFiles() {
    const { glob } = require('glob');
    
    try {
        const files = await glob(paths.razorTwCss);
        
        console.log('Found .razor.tw.css files:');
        if (files.length === 0) {
            console.log('  No .razor.tw.css files found');
        } else {
            files.forEach(file => {
                const outputFile = file.replace('.razor.tw.css', '.razor.css');
                console.log(`  ${file} -> ${outputFile}`);
            });
        }
        
        console.log(`\nGlobal CSS: ${paths.globalInput} -> ${paths.globalOutput}style.css`);
    } catch (err) {
        console.error('Error finding files:', err);
        throw err;
    }
}

/**
 * Verify that isolation files are created in the correct locations
 */
async function verifyIsolationPaths() {
    const { glob } = require('glob');
    
    try {
        const twFiles = await glob(paths.razorTwCss);
        const cssFiles = await glob('./Components/**/*.razor.css');
        
        console.log('Verifying CSS isolation file paths:');
        
        twFiles.forEach(twFile => {
            const expectedCssFile = twFile.replace('.razor.tw.css', '.razor.css');
            const cssExists = cssFiles.includes(expectedCssFile);
            
            console.log(`  ${twFile}`);
            console.log(`  -> ${expectedCssFile} ${cssExists ? '?' : '?'}`);
            
            if (cssExists) {
                const twDir = path.dirname(twFile);
                const cssDir = path.dirname(expectedCssFile);
                if (twDir === cssDir) {
                    console.log(`     Same directory: ?`);
                } else {
                    console.log(`     Different directories: ?`);
                    console.log(`     TW:  ${twDir}`);
                    console.log(`     CSS: ${cssDir}`);
                }
            }
            console.log('');
        });
        
    } catch (err) {
        console.error('Error verifying paths:', err);
        throw err;
    }
}

// Export tasks
exports.clean = cleanAll;
exports['clean-global'] = cleanGlobalCss;
exports['clean-isolation'] = cleanIsolationCss;
exports['clean-all'] = cleanAll;

exports.build = buildAll;
exports['build-global'] = buildGlobalCss;
exports['build-isolation'] = buildIsolationCss;
exports['build-all'] = buildAll;

exports.list = listIsolationFiles;
exports.verify = verifyIsolationPaths;

// Alias tasks for package.json scripts
exports['build-css'] = buildAll;
exports['clean-css'] = cleanAll;

// Default task
exports.default = buildAll;exports.default = buildAll;