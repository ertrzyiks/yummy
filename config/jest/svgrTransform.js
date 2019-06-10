// Svg loader stub - the real loader (@svgr/webpack) is asynchronous and jest can't handle it
module.exports = {
  process(src, path) {
    return `
      module.exports = {
        __esModule: true, 
        default: "${path}", 
        ReactComponent: () => {return null}
      }
    `
  }
}