var	Chai = require('chai'),
	expect = Chai.expect,
	test = require('mocha-cases');

var join = require('../');

var cases = [{
	name: 'should join single path and single glob',
	value: {
		paths: 'test/fixture/app',
		globs: '*.js'
	},
	expected: 'test/fixture/app/*.js'
}, {
	name: 'should join single path and multiple globs',
	value: {
		paths: 'test/fixture/app/views',
		globs: ['*.js', '*.coffee']
	},
	expected: ['test/fixture/app/views/*.js', 'test/fixture/app/views/*.coffee']
}, {
	name: 'should join multiple paths and single glob',
	value: {
		paths: ['test/fixture/app/views', 'test/fixture/app/services'],
		globs: '*.js'
	},
	expected: ['test/fixture/app/views/*.js', 'test/fixture/app/services/*.js']
}, {
	name: 'should join multiple paths and multiple glob',
	value: {
		paths: ['test/fixture/app/views', 'test/fixture/app/services'],
		globs: ['*.js', '*.coffee']
	},
	expected: ['test/fixture/app/views/*.js', 'test/fixture/app/views/*.coffee', 'test/fixture/app/services/*.js', 'test/fixture/app/services/*.coffee']
}, {
	name: 'should handle negative globs',
	value: {
		paths: ['test/fixture/app/views', 'test/fixture/app/services'],
		globs: ['*.js', '!*.{coffee,ts}']
	},
	expected: ['test/fixture/app/views/*.js', '!test/fixture/app/views/*.{coffee,ts}', 'test/fixture/app/services/*.js', '!test/fixture/app/services/*.{coffee,ts}']}];

describe('globjoin()', function () {
	test(cases, function (value, force) {
		return join(value.paths, value.globs, force);
	});
});
