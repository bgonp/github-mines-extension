/* eslint-disable */
const fs = require('fs')
const path = require('path')

const buildPath = path.resolve(__dirname, '../build')
const options = { recursive: true, force: true }

if (fs.existsSync(buildPath)) fs.rmSync(buildPath, options)
