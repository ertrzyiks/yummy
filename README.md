[![CircleCI](https://circleci.com/gh/ertrzyiks/yummy.svg?style=svg)](https://circleci.com/gh/ertrzyiks/yummy)

![logotype green](https://user-images.githubusercontent.com/40405175/42126266-4acf4cc4-7c7d-11e8-9c13-8880608247f8.png)

# yummy
Searchable repository of recipes we frequently use and are yummy.

## Development

### NodeJS dependencies

```
yarn install
```

### Working with gatsby

Start development server
```
yarn start
```


Preview website in production mode

```
yarn build
yarn serve
```

Website is update on master push, so everytime a PR is merged.
You can start a manual deployment with:

```
yarn deploy
```

## Screenshot comparison

Screenshot comparison is done with [puppeter](https://github.com/GoogleChrome/puppeteer)
controlling headless browser and [blink-diff](https://github.com/yahoo/blink-diff) to compare
taken screenshots.

Screenshots are save in `puppeteer/screenshots` folder:

 - current - screenshots take in the last run
 - golden - perfect screenshots, baseline for testing
 - diff - comparison between golden and current

To run visual regression tests use:
```
yarn test:visual
```

If you want to accept all the detected changes run:
```
yarn test:visual:update
```

## E2e testing

End to end testing is done with Cypress, to start testing session use:

```
yarn test:e2e
```

A single run is possible with

```
yarn test:e2e:ci
```

## Storybook

The project has the react Storybook configured for the ease of testing visual components.

The stories are located in the `src/stories` folder.

Configuration files can be found at the top level of the project inside the `.storybook` folder. The setup is customized for Gatsby.

Storybook scans the contents of the `src` folder for files ending in `.stories.js` and displays them on the test page.

To start it use the following command which sends you over to `localhost:6006`:
```
yarn storybook
```

## Recipe template

There is a recipe template available for new recipes:
```
yarn new-recipe
```

The script puts the new file into the correct recipe directory according to the selected category and title, and populates it with the required sections. 

## Logo

Huge thanks to [@zuuritaly](https://github.com/zuuritaly) for the logo.

## License

[MIT](./LICENSE)
