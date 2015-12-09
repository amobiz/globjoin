# globjoin

Adding base paths to globs.

## Install
```
npm install --save https://github.com/amobiz/globjoin.git
```

## API

### `globjoin(paths, globs, [filter])`
Add base paths to globs.

Note: unlike Node's [path.join()](https://nodejs.org/api/path.html#path_path_join_path1_path2) that join all arguments together and normalize the resulting path, `globjoin` take either a path, or an array of paths and treat them as separate folders.
#### Context
Don't care.
#### Parameters
##### `paths`
The path or array of paths to add.
##### `globs`
The glob or array of globs to join.
##### `filter`
Optional. With signature: `function(path): boolean`. Can be used to validate existent of folder, or to filter out unwanted folders.
#### Returns
The result glob, or array of globs if any of paths or globs are array.
#### Example
```
var join = require('globjoin');
var globs = join(__dirname, '**/*.{png,jpg,gif}');
```

#### `globjoin.exist(path)`
A filter that check if the given path exists.

#### Example
```
var join = require('globjoin');
var globs = join(['views', 'styles'], '**/*.{png,jpg,gif}', join.exist);
```
