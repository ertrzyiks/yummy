hexo.extend.filter.register('after_post_render', function(data) {
  var categoryNames = data.categories.map(function(c) {
    return c.name
  })

  if (categoryNames.indexOf('obiady') === -1) {
    return
  }

  var tags = data.tags.map(function(t) {
    return t.name
  })

  var meatPattern = /(kurczak|indyk)/im
  var hasChickenOrTurkey = data.content.match(meatPattern)

  var potentiallyMissingTag = hasChickenOrTurkey
    ? hasChickenOrTurkey[1].toLowerCase()
    : 'wegetariańskie'

  if (tags.indexOf(potentiallyMissingTag) === -1) {
    hexo.log.warn('Post ' + data.title + ' is missing the tag: ' + potentiallyMissingTag)
  }
});
