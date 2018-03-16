# yummy
Searchable repository of recipes we frequently use and are yummy.

## Development

### ImageMagick

On Ubuntu

```
$ apt-get install imagemagick
```

On Mac OS X

```
$ brew install imagemagick
```

On CentOS

```
$ yum install imagemagick
```

### NodeJS dependencies

```
npm i
```

If you run into issues with `mozjpeg` not building properly, please follow the solution described here:

https://github.com/imagemin/imagemin-mozjpeg/issues/1

And then run `npm rebuild mozjpeg`


### Working with hexo

Start hexo server
```
npm start
```

If you'd like to display not only ready posts but also drafts, run the server with an additional flag:
```
npm start -- --draft
```

Build production version

```
npm run build
```

### Content snippets

There are a few custom snippets available for reusable content - currently all around the chicken ingredient:
- `ki` (with an optional `weight` arg) for the ingredient line
- `kpz` for the soup preparation line
- `kpo` for the dinner prep line.

All snippets can be found in the `scripts/snippets.js` file.