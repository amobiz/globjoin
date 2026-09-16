# globjoin

Join paths and globs.

![npm](https://shieldcn.dev/group/npm/license/globjoin+/npm/globjoin+npm/dw/globjoin+github/amobiz/globjoin/stars.svg)

![chart](https://shieldcn.dev/chart/npm/globjoin.svg)

## Install

```bash
$ npm install globjoin
```

## API

Like Node's [`path.join()`](https://nodejs.org/api/path.html#path_path_join_path1_path2), which joins all arguments and normalizes the resulting path, `globjoin` accepts an arbitrary number of paths and/or arrays of globs, joins them together, and handles negative globs.

```typescript
function globjoin(...globs: Array<string>): string;

function globjoin(...globs: Array<string | string[]>): string[];
```

Important: Starting with version 1.0.0, negative globs are handled differently. Negative globs are now treated as negations of the corresponding path segments. For example:

`globjoin(["src", "!app", "!view"])` => `"src/app/view"`

While in version 0.1.4, the same input produced:

`globjoin(["src", "!app", "!view"])` => `"!src/app/view"`

This is a breaking behavior change to be aware of when upgrading to version 1.0.0.

#### Example

```typescript
import globjoin from "globjoin";

const globs1 = globjoin("src", ["**/*.js", "!**/test*.js"]);

const globs2 = globjoin(
  "test",
  "fixture",
  "app",
  ["views", "!services"],
  ["**/*", "!*.{js,json,coffee,ts}"],
);
```

Check out test for more examples.

## Issues

[Issues](https://github.com/amobiz/globjoin/issues)

## Test

```bash
$ npm test
```

## Changelog

[Changelog](./CHANGELOG.md)

## License

[MIT](https://opensource.org/licenses/MIT)

## Author

[Amobiz](https://github.com/amobiz)

## Contributor

[StreetStrider](https://github.com/StreetStrider)
