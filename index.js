'use strict';

var Path = require('path');

function join(/* globs */) {
	var args = Array.prototype.splice.call(arguments, 0);
	return args.reduce(function (result, globs) {
		return _apply(result, function (path) {
			return _apply(globs, function (glob) {
				return _join(path, glob);
			});
		});
	}, '');
}

function _apply(value, fn) {
	if (Array.isArray(value)) {
		return value.reduce(function (result, value) {
			return result.concat(fn(value))
		}, []);
	}
	return fn(value);
}

function _join(path, glob) {
	var negative;

	if (glob[0] === '!') {
		glob = glob.substr(1);
		if (path[0] === '!') {
			negative = '';
		} else {
			negative = '!';
		}
		return negative + Path.join(path, glob);
	}
	return Path.join(path, glob);
}

module.exports = join;
