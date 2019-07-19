const { Select, List } = require('enquirer');
const slugify = require('underscore.string/slugify')

module.exports = {
  prompt: (args) => {
    const { inquirer } = args

    let recipe = {}

    const selectPrompt = new Select({
      name: 'category',
      message: 'Wybierz kategorię',
      choices: ['sniadaniowe', 'zupy', 'obiady', 'desery', 'koktajle']
    });

    return selectPrompt.run()
      .then(category => {recipe.category = category })
      .then(() => inquirer
        .prompt({
          type: 'input',
          name: 'title',
          message: "Podaj tytuł przepisu"
        }))
      .then(({title}) => {
        recipe.title = title
        recipe.titleSlug = slugify(title)
      })
      .then(() => inquirer
        .prompt({
          type: 'input',
          name: 'requiredTime',
          message: "Podaj czas przygotowania (w minutach), np. 120 dla dwóch godzin"
        }))
      .then(({requiredTime}) => recipe.requiredTime = requiredTime)
      .then(() => {
        const listPrompt = new List({
          name: 'tags',
          message: 'Podaj tagi rozdzielone przecinkiem'
        });

        return listPrompt.run()
      })
      .then(tags => {
        recipe.tags = tags
        recipe.date = `${new Date().toISOString().substring(0, 19)}Z`
        return recipe
      })
  }
}