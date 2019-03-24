const puppeteer = require('puppeteer')
const { Suite } = require('./suite')
const { snapshotPage } = require('./snapshot')

function processResults(suite) {
  suite.each(testCase => {
    console.log(`* (${testCase.status}) ${testCase.name} `)
    if (testCase.status == 'failure') {
      console.log(`  ${testCase.message}`)
    }
  })

  if (suite.failure) {
    console.log('')
    console.log('FAILURE')
    console.log('Some screenshots do not match the base line.')
    process.exit(1)
  }
}

async function testSession(cb) {
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
  }

  await cb({snapshot, page})

  await browser.close()

  return suite
}

module.exports = {
  testSession,
  processResults
}
