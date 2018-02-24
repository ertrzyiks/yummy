var fontawesome = require('@fortawesome/fontawesome');
var solid       = require('@fortawesome/fontawesome-free-solid').default;
var brands       = require('@fortawesome/fontawesome-free-brands').default;

fontawesome.library.add(solid)
fontawesome.library.add(brands)

hexo.extend.helper.register('fa_css', function () {
  return fontawesome.dom.css()
});

hexo.extend.helper.register('fa_inline', function (iconName, opts) {
  var options = opts || {prefix: 'fas'}

  return fontawesome.icon({ prefix: options.prefix, iconName: iconName }).html
});
