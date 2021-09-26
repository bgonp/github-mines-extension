/* eslint-disable */
const path = require('path')
const AdmZip = require('adm-zip')

const packageJson = require('../package.json')
const { name, version } = packageJson

const zip = new AdmZip()
const targetPath = path.resolve(__dirname, `../build/${name}-${version}.zip`)

const FILES = [
  'manifest.json',
  'build/index.js',
  'build/index.css',
  'icons/icon16.png',
  'icons/icon32.png',
  'icons/icon48.png',
  'icons/icon64.png',
  'icons/icon128.png'
]

FILES.forEach(file => {
  const filePath = path.resolve(__dirname, `../${file}`)
  zip.addLocalFile(filePath)
})

zip.writeZip(targetPath)
