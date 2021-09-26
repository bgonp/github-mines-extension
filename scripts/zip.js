/* eslint-disable */
const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')

const manifest = require('../manifest.json')
const { version } = manifest

const zip = new JSZip()
const zipPath = path.resolve(__dirname, `../build/github-mines-${version}.zip`)

const FILES = [
  'manifest.json',
  'index.js',
  'index.css',
  'icon16.png',
  'icon32.png',
  'icon48.png',
  'icon64.png',
  'icon128.png'
]

const options = { type: 'nodebuffer', streamFiles: true }

FILES.forEach(file => {
  const filePath = path.resolve(__dirname, `../build/${file}`)
  const fileBuffer = fs.readFileSync(filePath)
  zip.file(file, fileBuffer)
})

zip.generateNodeStream(options).pipe(fs.createWriteStream(zipPath))
