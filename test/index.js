'use strict';

var	test = require('mocha-cases');

var join = require('../');

var cases = [{
	name: 'should join single path and single glob',
	value: ['test', 'fixture', 'app', '*.js'],
	expected: 'test/fixture/app/*.js'
}, {
	name: 'should join single path and multiple globs',
	value: ['test/fixture/app/views', ['*.js', '*.coffee']],
	expected: ['test/fixture/app/views/*.js', 'test/fixture/app/views/*.coffee']
}, {
	name: 'should join multiple paths and single glob',
	value: ['test/fixture/app', ['views', 'services'], '*.js'],
	expected: ['test/fixture/app/views/*.js', 'test/fixture/app/services/*.js']
}, {
	name: 'should join multiple paths and multiple glob',
	value: ['test/fixture/app', ['views', 'services'], ['*.js', '*.coffee']],
	expected: ['test/fixture/app/views/*.js', 'test/fixture/app/views/*.coffee', 'test/fixture/app/services/*.js', 'test/fixture/app/services/*.coffee']
}, {
	name: 'should handle negative globs',
	value: ['test/fixture/app', ['views', '!services'], ['*.js', '!*.{coffee,ts}']],
	expected: ['test/fixture/app/views/*.js', '!test/fixture/app/views/*.{coffee,ts}', '!test/fixture/app/services/*.js', '!test/fixture/app/services/*.{coffee,ts}']
}];

describe('globjoin()', function () {
	test(cases, function (args) {
		return join.apply(null, args);
	});
});
