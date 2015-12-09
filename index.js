'use strict';

var FileSystem = require('fs'),
	Path = require('path'),
	glob = require('glob'),
	globby = require('globby');

function join(paths, globs, filter) {
	filter = _filter(filter);
	return _apply(paths, _path);

	function _path(path) {
		if (filter(path)) {
			if (Array.isArray(globs)) {
				return globs.map(function (glob) {
					return _join(path, glob);
				});
			}
			return _join(path, globs);
		}

		// path not exist or not a folder or not forced, assumes that globs override path.
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

function _filter(force) {
	if (typeof force === 'function') {
		return force;
	}
	return join.force;
}

function _apply(value, fn) {
	if (Array.isArray(value)) {
		return value.reduce(function (result, value) {
			return result.concat(fn(value))
		}, []);
	}
	return fn(value);
}

/**
 * Check if the given directory path exist.
 */
join.exist = function (path) {
	try {
		return FileSystem.statSync(path).isDirectory();
	} catch (ex) {
		return false;
	}
};

join.force = function () {
	return true;
};

module.exports = join;
