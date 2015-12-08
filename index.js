'use strict';

var FileSystem = require('fs'),
	Path = require('path'),
	glob = require('glob'),
	globby = require('globby');

function join(paths, globs, force) {
	var filter = _filter(force);
	return _apply(paths, _path);

	function _filter(force) {
		if (typeof force === 'boolean') {
			return function () {
				return force;
			};
		} else if (typeof force === 'function') {
			return force;
		}
		return function(path) {
			try {
				return FileSystem.statSync(path).isDirectory();
			} catch (ex) {
				// the directory path not exist;
				return false;
			}
		};
	}

	function _apply(value, fn) {
		var values;

		if (Array.isArray(value)) {
			return value.reduce(function (result, value) {
				return result.concat(fn(value))
			}, []);
		}
		return fn(value);
	}

	function _path(path) {
		if (filter(path)) {
			if (Array.isArray(globs)) {
				return globs.map(function (glob) {
					return _join(path, glob);
				});
			}
			return _join(path, globs);
		}

		// path not exist or not a folder, assumes that globs override path.
		return globs;
	}

	function _join(path, glob) {
		var negative;

		if (glob[0] === '!') {
			negative = '!';
			glob = glob.substr(1);
		} else {
			negative = '';
		}
		return negative + Path.join(path, glob);
	}
}

module.exports = join;
