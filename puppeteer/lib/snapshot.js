const fs = require('fs');
const mkdirp = require('mkdirp');
const { compareScreenshots } = require('./compare')

async function capture(page, filePath, viewport) {
  await page.setViewport(viewport)
  await page.screenshot({
    path: filePath,
    fullPage: true
  })
}

async function snapshotPage({page, name, viewport, forceUpdate}) {
  const directory  = `puppeteer/screenshots/`
  mkdirp.sync(`${directory}/current`)
  mkdirp.sync(`${directory}/golden`)
  mkdirp.sync(`${directory}/diff`)

  const currentPath = `${directory}/current/${name}.png`
  const goldenPath = `${directory}/golden/${name}.png`
  const diffPath = `${directory}/diff/${name}.png`

  await capture(page, `${directory}/current/${name}.png`, viewport)

  if (!fs.existsSync(goldenPath) || forceUpdate) {
    fs.copyFileSync(currentPath, goldenPath)
    return {status: 'ok'}
  }

  const matches = await compareScreenshots({ currentPath, goldenPath, diffPath })
  return matches ?
    {status: 'ok'} :
    {status: 'error', message: `Screenshot does not match. See ${diffPath}`}
}

module.exports = {
  capture,
  snapshotPage
}
