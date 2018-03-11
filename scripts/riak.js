var Riak = require('basho-riak-client')

var config = hexo.config.search_index
var riakConfig = config.riak
var log = hexo.log

function commandHelp() {
  log.info('Usage: hexo search_index [command]')
  log.info('Available commands:')
  log.info('  - test')
  log.info('    Test you configuration')
}

function commandTest() {
  var onConnect = function (err, c) {
    if (err) {
      log.error(err)
      c.stop(function () { process.exit(1) })
      return
    }

    c.ping(function (err, rslt) {
      var exitCode = 0

      if (err) {
        log.error(err)
        c.stop(function () { process.exit(1) })
        return
      } else if (rslt){
        log.info('OK')
      } else {
        log.error('Not OK')
      }

      c.stop()
    })
  }

  var client = new Riak.Client(riakConfig.nodes, onConnect);
}

hexo.extend.console.register('search-index', 'dd', function (params) {
  if (!riakConfig.nodes) { log.error('Configuration search_index.riak.nodes is empty, check you _config.yml'); return }

  var command = params._[0]

  if (command == 'test') {
    commandTest()
  } else {
    commandHelp()
  }
})
