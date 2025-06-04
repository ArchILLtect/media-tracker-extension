const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");

const browsers = ["chrome", "firefox", "edge"];
const baseDir = path.resolve(__dirname, "..");
const srcDir = path.join(baseDir, "src");
const manifestsDir = path.join(baseDir, "manifests");
const buildDir = path.join(baseDir, "build");

async function buildExtension(browser) {
    const outDir = path.join(buildDir, browser);
    await fs.emptyDir(outDir);

    // Copy all source files
    await fs.copy(srcDir, outDir);

    // Copy appropriate manifest
    const manifestSrc = path.join(manifestsDir, `manifest.${browser}.json`);
    const manifestDest = path.join(outDir, "manifest.json");
    await fs.copy(manifestSrc, manifestDest);

    // Zip it
    const zipPath = path.join(buildDir, `media-tracker-${browser}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(outDir, false);
    await archive.finalize();

    console.log(`✅ Built ${browser} -> ${zipPath}`);
}

async function runBuild() {
    for (const browser of browsers) {
        await buildExtension(browser);
    }
}

runBuild();
