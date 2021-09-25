/* eslint-disable */
const fs = require('fs')
const path = require('path')

const buildPath = path.resolve(__dirname, '../build')
const manifestSrc = path.resolve(__dirname, '../manifest.json')
const manifestDest = path.resolve(buildPath, 'manifest.json')

if (fs.existsSync(buildPath)) fs.copyFileSync(manifestSrc, manifestDest)
