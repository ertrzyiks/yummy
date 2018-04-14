var util = require('util')
var potrace = require('potrace')
var SVGO = require('svgo')
var sharp = require('sharp')
var Promise = require('bluebird')
var streamToArray = require('stream-to-array')
var streamToArrayAsync = Promise.promisify(streamToArray)
var trace = Promise.promisify(potrace.posterize)
const replace = require('string-replace-async')

var svgo = new SVGO({
  plugins: [{
    cleanupAttrs: true,
  }, {
    removeDoctype: true,
  },{
    removeXMLProcInst: true,
  },{
    removeComments: true,
  },{
    removeMetadata: true,
  },{
    removeTitle: true,
  },{
    removeDesc: true,
  },{
    removeUselessDefs: true,
  },{
    removeEditorsNSData: true,
  },{
    removeEmptyAttrs: true,
  },{
    removeHiddenElems: true,
  },{
    removeEmptyText: true,
  },{
    removeEmptyContainers: true,
  },{
    removeViewBox: false,
  },{
    cleanUpEnableBackground: true,
  },{
    convertStyleToAttrs: true,
  },{
    convertColors: true,
  },{
    convertPathData: true,
  },{
    convertTransform: true,
  },{
    removeUnknownsAndDefaults: true,
  },{
    removeNonInheritableGroupAttrs: true,
  },{
    removeUselessStrokeAndFill: true,
  },{
    removeUnusedNS: true,
  },{
    cleanupIDs: true,
  },{
    cleanupNumericValues: true,
  },{
    moveElemsAttrsToGroup: true,
  },{
    moveGroupAttrsToElems: true,
  },{
    collapseGroups: true,
  },{
    removeRasterImages: false,
  },{
    mergePaths: true,
  },{
    convertShapeToPath: true,
  },{
    sortAttrs: true,
  },{
    transformsWithOnePath: false,
  },{
    removeDimensions: true,
  }]
});

var fs = require('fs')
var tmp
try {
  tmp = fs.readFileSync('tmp.json').toString()
} catch (ex) {
  tmp = '{}'
}
var cache = JSON.parse(tmp)

function loadFileContent(stream) {
  return streamToArrayAsync(stream).then(function (parts) {
    const buffers = parts.map(function (part) {
      return util.isBuffer(part) ? part : Buffer.from(part)
    });

    return Buffer.concat(buffers);
  })
}

function isHtmlFile(filePath) {
  return filePath.match(/\.html$/)
}

function processHtmlFile(route, content) {
  return replace(content, /__LQIP_COLOR\([^\(]+\)/g, function (placeholder) {
    var matches = placeholder.match(/__LQIP_COLOR\(([^\(]+)\)/)
    var url = matches[1]

    return loadFileContent(route.get(url))
      .then(function (buffer) {
        if (cache[url]) { return cache[url] }

        return sharp(buffer)
          .resize(140)
          .toBuffer()
          .then(function (buffer) {
            hexo.log.info('Processing', url)
            return trace(buffer, {
              turnPolicy: potrace.Potrace.TURNPOLICY_WHITE,
              optTolerance: 5,
              turdSize: 3,
              threshold: 180,
              steps: 2,
              color: '#ec973b',
              background: 'transparent'
            })
          })
          .then(function (data) {
            return svgo.optimize(data).then(function (result) {
              return result.data
            })
          })

      })
      .then(function (svg) {
        if (!cache[url]) cache[url] = svg
        fs.writeFileSync('tmp.json', JSON.stringify(cache))

        return "url('data:image/svg+xml," + encodeURI(svg) + "')"
      })
  })
}

hexo.extend.filter.register('after_generate', function () {
  var hexo = this
  var route = hexo.route
  var routes = route.list()
  var htmlFiles = routes.filter(isHtmlFile)

  return Promise.map(htmlFiles, function (filePath) {
    return loadFileContent(route.get(filePath)).then(function (buffer) {
      return route.set(filePath, function () {
        return processHtmlFile(route, buffer.toString())
      })
    })
  })
});

hexo.extend.helper.register('lqip_for', function (path, opts) {
  const options = {
    type: 'color',
    ...opts
  }
  return '__LQIP_COLOR(' + path +')'
})
