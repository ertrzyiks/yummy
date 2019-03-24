const puppeteer = require('puppeteer')
const { Suite } = require('./suite')
const { snapshotPage } = require('./snapshot')

async function testSession({run, onScreenshot}) {
  const suite = new Suite()
  const forceUpdate = process.env.UPDATE_SNAPSHOTS === 'true'

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()

  const snapshot = async (name, viewport) => {
    const testCase = suite.add(name)
    const result = await snapshotPage({page, name, viewport, forceUpdate})
    if (result.status === 'ok') {
      testCase.success()
    } else {
      testCase.failure(result.message)
    }

    onScreenshot(suite.getByName(name))
  }

  await run({snapshot, page})

  await browser.close()

  return suite
}

module.exports = {
  test: function test (run) {
    function processTestCase(testCase) {
      console.log(`* (${testCase.status}) ${testCase.name} `)
      if (testCase.status == 'failure') {
        console.log(`  ${testCase.message}`)
      }
    }

    function processResults(suite) {
      if (suite.failure) {
        console.log('')
        console.log('FAILURE')
        console.log('Some screenshots do not match the base line.')
        process.exit(1)
      }
    }

    testSession({run, onScreenshot: processTestCase})
      .then(suite => {
        processResults(suite)
      })
      .catch(error => {
        console.error(error)
        process.exit(1)
      })
  }
}
