hexo.extend.tag.register('ki', function(args, content){
  var weight = args[0] || 400
  return 'filet z kurczaka (~' + weight + 'g)'
});

hexo.extend.tag.register('kpo', function(args, content) {
  var isZlocista = args[0]
  var spicePart = isZlocista
    ? 'przyprawie złocistej'
    : 'przyprawach'
  return 'Kurczaka umyć, pokroić w kostkę i zamarynować w ' +  spicePart + ' na 15 min.\n' +
    'Po tym czasie obsmażyć na oliwie do miękkości.'
})

hexo.extend.tag.register('kpz', function(args, content) {
  return 'Kurczaka umyć, pokroić i dorzucić do gotującej się zupy.'
})