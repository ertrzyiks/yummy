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
gatsby developer
```


Preview website in production mode

```
gatsby build
gatsby server
```
Update website

```
npm run deploy
```

### Content snippets

There are a few custom snippets available for reusable content - currently all around the chicken ingredient:
- `ki` (with an optional `weight` arg) for the ingredient line
- `kpz` for the soup preparation line
- `kpo` for the dinner prep line.

All snippets can be found in the `scripts/snippets.js` file.

## Logo

Huge thanks to [@zuuritaly](https://github.com/zuuritaly) for the logo.

## License

[MIT](./LICENSE)
