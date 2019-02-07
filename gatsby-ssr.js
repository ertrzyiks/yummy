const { renderToString } = require('react-dom/server')
const { renderStylesToString } = require('emotion-server')

exports.replaceRenderer = function ({ bodyComponent, replaceBodyHTMLString}) {
  const html = renderStylesToString(renderToString(bodyComponent))
  replaceBodyHTMLString(html)
}
