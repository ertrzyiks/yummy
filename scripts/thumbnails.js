const Promise = require('bluebird')
const minimatch = require('minimatch')
const sharp = require('sharp')
const path = require('path')
const streamToArray = require('stream-to-array')
const streamToArrayAsync = Promise.promisify(streamToArray)

const include = 'content/**/*.jpg'
const width = 900

function getNewPath(oldPath, options) {
  const base = path.basename(oldPath)
  const dir = path.dirname(oldPath)

  return dir + '/' + options.prefix + '_' + base
}

function thumbnails() {
  const hexo = this
  const route = hexo.route
  const routes = route.list()

  return Promise.mapSeries(routes, function (filePath) {
    if (!minimatch(filePath, include)) {
      return
    }

    const stream = route.get(filePath);
    return streamToArrayAsync(stream)
      .then(function(arr) {
        if(typeof arr[0] === 'string'){
          return arr[0];
        }else{
          return Buffer.concat(arr);
        }
      }).then(function (buffer) {
        return sharp(buffer).resize(width).toBuffer()
      }).then(function (output) {
        const newPath = getNewPath(filePath, {prefix: 'thumb'})
        console.log(newPath)
        return hexo.route.set(newPath, output)
      })
  })
}

hexo.extend.helper.register('image_version', function (original, options) {
  return getNewPath(original, options)
});


hexo.extend.filter.register('after_generate', thumbnails)
