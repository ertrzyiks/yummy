const {testSession, processResults} = require('./lib/browser');

(async () => {
  const suite = await testSession(async ({page, snapshot}) => {
    await page.goto('http://localhost:8001', {waitUntil: 'networkidle2'})

    await snapshot('homepage', {width: 1440, height: 960})
    await snapshot('homepage-mobile', {width: 420, height: 700})
  })

  processResults(suite)
})()

