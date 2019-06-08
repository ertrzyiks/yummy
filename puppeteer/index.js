const {test} = require('./lib/visual-regression')

test(async ({page, snapshot}) => {
  const responsiveSnapshot = async (name) => {
    await snapshot(`${name}`, {width: 1440, height: 960})
    await snapshot(`${name}-mobile`, {width: 420, height: 700})

  }

  await page.goto('http://localhost:8001', {waitUntil: 'networkidle2'})
  await responsiveSnapshot('homepage')

  await page.goto('http://localhost:8001/obiady', {waitUntil: 'networkidle2'})
  await responsiveSnapshot('category')

  await page.goto('http://localhost:8001/tag/kurczak', {waitUntil: 'networkidle2'})
  await responsiveSnapshot('tag')

  await page.goto('http://localhost:8001/zupy/zupa-b', {waitUntil: 'networkidle2'})
  await responsiveSnapshot('recipe')

  await page.goto('http://localhost:8001/desery/deser-a', {waitUntil: 'networkidle2'})
  await responsiveSnapshot('recipe-with-gallery')
})

