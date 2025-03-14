const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("📦 Installing legacy dependencies...")

// Define your legacy dependencies here with specific versions
const legacyDependencies = {
  // Regular dependencies
  dependencies: {
    // Example: 'package-name': 'specific-version'
    "date-fns": "2.29.3",
    "react-day-picker": "8.7.1",
    "next-themes": "0.2.1",
  },
  // Dev dependencies
  devDependencies: {
    // Example: 'package-name': 'specific-version'
  },
}

// Install regular dependencies
if (Object.keys(legacyDependencies.dependencies).length > 0) {
  const depsToInstall = Object.entries(legacyDependencies.dependencies)
    .map(([pkg, version]) => `${pkg}@${version}`)
    .join(" ")

  console.log(`🔧 Installing regular dependencies: ${depsToInstall}`)
  try {
    execSync(`npm install ${depsToInstall}`, { stdio: "inherit" })
    console.log("✅ Regular dependencies installed successfully")
  } catch (error) {
    console.error("❌ Failed to install regular dependencies:", error.message)
    process.exit(1)
  }
}

// Install dev dependencies
if (Object.keys(legacyDependencies.devDependencies).length > 0) {
  const devDepsToInstall = Object.entries(legacyDependencies.devDependencies)
    .map(([pkg, version]) => `${pkg}@${version}`)
    .join(" ")

  console.log(`🔧 Installing dev dependencies: ${devDepsToInstall}`)
  try {
    execSync(`npm install -D ${devDepsToInstall}`, { stdio: "inherit" })
    console.log("✅ Dev dependencies installed successfully")
  } catch (error) {
    console.error("❌ Failed to install dev dependencies:", error.message)
    process.exit(1)
  }
}

// Update package.json with the installed versions
try {
  const packageJsonPath = path.join(process.cwd(), "package.json")
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

  // Update dependencies
  for (const [pkg, version] of Object.entries(legacyDependencies.dependencies)) {
    if (!packageJson.dependencies) {
      packageJson.dependencies = {}
    }
    packageJson.dependencies[pkg] = version
  }

  // Update devDependencies
  for (const [pkg, version] of Object.entries(legacyDependencies.devDependencies)) {
    if (!packageJson.devDependencies) {
      packageJson.devDependencies = {}
    }
    packageJson.devDependencies[pkg] = version
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log("📝 Updated package.json with legacy dependency versions")
} catch (error) {
  console.error("❌ Failed to update package.json:", error.message)
}

console.log("🎉 Legacy dependencies installation complete!")
console.log("📋 You can customize the legacy dependencies in scripts/install-legacy-deps.js")

