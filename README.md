# globjoin

Join paths and globs.

## Install
```
$ npm install --save https://github.com/amobiz/globjoin.git
```

## API

### `globjoin(paths, globs, [filter])`
Join paths and globs.

Like Node's [path.join()](https://nodejs.org/api/path.html#path_path_join_path1_path2) that join all arguments together and normalize the resulting path, `globjoin` takes arbitrary number of paths and/or arrays of paths, join them together and take care of negative globs.
#### Context
Don't care.
#### Parameters
##### `paths/globs`
The paths/globs or arrays of paths/globs to join.
#### Returns
The result glob, or array of globs if any of paths/globs are array.
#### Example
```
var join = require('globjoin');
var globs1 = join(__dirname, ['**/*.js', '!**/test*.js']);
var globs2 = join('test', 'fixture', 'app', ['views', '!services'], ['**/*', '!*.{js,json,coffee,ts}']);
```

Check out test for more examples.

## Test
```
$ npm test
```