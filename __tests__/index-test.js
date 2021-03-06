'use strict';

const Q = require('q');

function getTestData() {
	return {
		isATest: true
	};
}

const INDEX_PATH = '../src/index';

jest.dontMock(INDEX_PATH);

jest.setMock('react-native', {
	AsyncStorage: {
		setItem: jest.genMockFunction().mockImplementation(function() {
			return Q.promise(function(resolve) {
				resolve(null);
			});
		}),
		getItem: jest.genMockFunction().mockImplementation(function() {
			return Q.promise(function(resolve) {
				resolve(JSON.stringify(getTestData()));
			})
		}),
		removeItem: jest.genMockFunction().mockImplementation(function() {
			return Q.promise(function(resolve) {
				resolve(null);
			})
		})
	}
});

describe('save', function() {

	pit('should return a promise with no errors', function() {
		var store = require(INDEX_PATH);
		return store.save('testing', getTestData()).then(function(error) {
			expect(error).toEqual(null);
		});
	});

});

describe('get', function() {

	pit('should return a promise with saved data', function() {
		var store = require(INDEX_PATH);
		return store.get('testing').then(function(error) {
			expect(error).toEqual(getTestData());
		});
	});

});

describe('update', function() {

	pit('should return a promise with no errors', function() {
		var store = require(INDEX_PATH);
		return store.update('testing', {
			isAGoodTest: false
		}).then(function(error) {
			expect(error).toEqual(null);
		});
	});

	pit('should handle a string and return a promise with no errors', function() {
		var store = require(INDEX_PATH);
		return store.update('testing', 'asdf').then(function(error) {
			expect(error).toEqual(null);
		});
	});

});

describe('delete', function() {

	pit('should return a promise with no errors', function() {
		var store = require(INDEX_PATH);
		return store.delete('testing').then(function(error) {
			expect(error).toEqual(null);
		});
	});

});
