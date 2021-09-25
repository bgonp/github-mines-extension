/* eslint-disable */
const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')

const manifest = require('../manifest.json')
const { version } = manifest

const zip = new JSZip()
const zipPath = path.resolve(__dirname, `../build/github-mines-${version}.zip`)

const options = { type: 'nodebuffer', streamFiles: true }

zip.folder('../build')
zip.generateNodeStream(options).pipe(fs.createWriteStream(zipPath))
