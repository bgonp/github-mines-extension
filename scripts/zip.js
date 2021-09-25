/* eslint-disable */
const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')

const packageJson = require('../package.json')
const { version } = packageJson

const zip = new JSZip()
const zipPath = path.resolve(__dirname, `../build/github-mines-${version}.zip`)

const options = { type: 'nodebuffer', streamFiles: true }

zip.folder('../build')
zip.generateNodeStream(options).pipe(fs.createWriteStream(zipPath))
