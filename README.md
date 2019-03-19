[![CircleCI](https://circleci.com/gh/ertrzyiks/yummy.svg?style=svg)](https://circleci.com/gh/ertrzyiks/yummy)

![logotype green](https://user-images.githubusercontent.com/40405175/42126266-4acf4cc4-7c7d-11e8-9c13-8880608247f8.png)

# yummy
Searchable repository of recipes we frequently use and are yummy.

## Development

### NodeJS dependencies

```
npm i
```

### Working with gatsby

Start development server
```
gatsby develop
```


Preview website in production mode

```
gatsby build
gatsby serve
```
Update website

```
npm run deploy
```

## Storybook

The project has the react Storybook configured for the ease of testing visual components.

The stories are located in the `src/stories` folder.

Configuration files can be found at the top level of the project inside the `.storybook` folder. The setup is customized for Gatsby.

Storybook scans the contents of the `src` folder for files ending in `.stories.js` and displays them on the test page.

To start it use the following command which sends you over to `localhost:6006`:
```
npm run storybook
```

## Logo

Huge thanks to [@zuuritaly](https://github.com/zuuritaly) for the logo.

## License

[MIT](./LICENSE)
