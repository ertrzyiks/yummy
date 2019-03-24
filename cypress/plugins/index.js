
module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'electron') {
      return {
        width: 1280,
        height: 800
      }
    }
  })
}
