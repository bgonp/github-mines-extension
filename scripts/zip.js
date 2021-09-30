/* eslint-disable */
const path = require('path')
const zip = new (require('adm-zip'))()

const packageJson = require('../package.json')
const { name, version } = packageJson

const BROWSER_MANIFESTS = {
  chrome: 'chrome/manifest.json',
  firefox: 'firefox/manifest.json',
}

const FILES = [
  'build/index.js',
  'build/index.css',
  'icons/icon16.png',
  'icons/icon32.png',
  'icons/icon48.png',
  'icons/icon64.png',
  'icons/icon128.png'
]

Object.entries(BROWSER_MANIFESTS).forEach(([browser, manifest]) => {
  const zipName = `${name}-${browser}-${version}`
  const targetPath = path.resolve(__dirname, `../build/${zipName}.zip`)
  const files = [manifest, ...FILES]

  files.forEach(file => {
    const filePath = path.resolve(__dirname, `../${file}`)
    zip.addLocalFile(filePath)
  })

  zip.writeZip(targetPath)
})
