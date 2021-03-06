# randomatic [![NPM version](https://img.shields.io/npm/v/randomatic.svg)](https://www.npmjs.com/package/randomatic)

> Generate randomized strings of a specified length, fast. Only the length is necessary, but you can optionally generate patterns using any combination of numeric, alpha-numeric, alphabetical, special or custom characters.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i randomatic --save
```

Install with [bower](http://bower.io/)

```sh
$ bower install randomatic --save
```

## Usage

```js
var randomize = require('randomatic');
```

## API

```js
randomize(pattern, length, options);
```

* `pattern` **{String}**: The pattern to use for randomizing
* `length` **{Object}**: The length of the string to generate

### pattern

> The pattern to use for randomizing

Patterns can contain any combination of the below characters, specified in any order.

**Example:**

To generate a 10-character randomized string using all available characters:

```js
randomize('*', 10);
//=>

randomize('Aa0!', 10);
//=>
```

* `a`: Lowercase alpha characters (`abcdefghijklmnopqrstuvwxyz'`)
* `A`: Uppercase alpha characters (`ABCDEFGHIJKLMNOPQRSTUVWXYZ'`)
* `0`: Numeric characters (`0123456789'`)
* `!`: Special characters (`~!@#$%^&()_+-={}[];\',.`)
* `*`: All characters (all of the above combined)
* `?`: Custom characters (pass a string of custom characters to the options)

### length

> the length of the string to generate

**Examples:**

* `randomize('A', 5)` will generate a 5-character, uppercase, alphabetical, randomized string, e.g. `KDJWJ`.
* `randomize('0', 2)` will generate a 2-digit random number
* `randomize('0', 3)` will generate a 3-digit random number
* `randomize('0', 12)` will generate a 12-digit random number
* `randomize('A0', 16)` will generate a 16-character, alpha-numeric randomized string

If `length` is left undefined, the length of the pattern in the first parameter will be used. For example:

+ `randomize('00')` will generate a 2-digit random number
* `randomize('000')` will generate a 3-digit random number
* `randomize('0000')` will generate a 4-digit random number...
* `randomize('AAAAA')` will generate a 5-character, uppercase alphabetical random string...

These are just examples, [see the tests](./test.js) for more use cases and examples.

## options

#### chars

Type: `String`

Default: `undefined`

Define a custom string to be randomized.

**Example:**

* `randomize('?', 20, {chars: 'jonschlinkert'})` will generate a 20-character randomized string from the letters contained in `jonschlinkert`.
* `randomize('?', {chars: 'jonschlinkert'})` will generate a 13-character randomized string from the letters contained in `jonschlinkert`.

## Usage Examples

* `randomize('A', 4)` (_whitespace insenstive_) would result in randomized 4-digit uppercase letters, like, `ZAKH`, `UJSL`... etc.
* `randomize('AAAA')` is equivelant to `randomize('A', 4)`
* `randomize('AAA0')` and `randomize('AA00')` and `randomize('A0A0')` are equivelant to `randomize('A0', 4)`
* `randomize('aa')`: results in double-digit, randomized, lower-case letters (`abcdefghijklmnopqrstuvwxyz`)
* `randomize('AAA')`: results in triple-digit, randomized, upper-case letters (`ABCDEFGHIJKLMNOPQRSTUVWXYZ`)
* `randomize('0', 6)`: results in six-digit, randomized nubmers (`0123456789`)
* `randomize('!', 5)`: results in single-digit randomized, _valid_ non-letter characters (`~!@#$%^&()_+-={}[];\',.`)
* `randomize('A!a0', 9)`: results in nine-digit, randomized characters (any of the above)

_The order in which the characters are defined is insignificant._

## Related

* [pad-left](https://www.npmjs.com/package/pad-left): Left pad a string with zeros or a specified string. Fastest implementation. | [homepage](https://github.com/jonschlinkert/pad-left)
* [pad-right](https://www.npmjs.com/package/pad-right): Right pad a string with zeros or a specified string. Fastest implementation. | [homepage](https://github.com/jonschlinkert/pad-right)
* [repeat-string](https://www.npmjs.com/package/repeat-string): Repeat the given string n times. Fastest implementation for repeating a string. | [homepage](https://github.com/jonschlinkert/repeat-string)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/randomatic/issues/new).

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright ?? 2015 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the MIT license.

***

_This file was generated by [verb](https://github.com/verbose/verb) on December 10, 2015._