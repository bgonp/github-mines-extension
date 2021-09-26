/* eslint-disable */
const fs = require('fs')
const path = require('path')

const ICON_SIZES = [16, 32, 48, 64, 128]

const buildPath = path.resolve(__dirname, '../build')

if (fs.existsSync(buildPath)) {
  const manifestSrc = path.resolve(__dirname, '../manifest.json')
  const manifestDest = path.resolve(buildPath, 'manifest.json')
  fs.copyFileSync(manifestSrc, manifestDest)

  ICON_SIZES.forEach(size => {
    const iconSrc = path.resolve(__dirname, `../icons/icon${size}.png`)
    const iconDest = path.resolve(buildPath, `icon${size}.png`)
    fs.copyFileSync(iconSrc, iconDest)
  })
}
