'use strict';

import { AsyncStorage } from 'react-native';

const deviceStorage = {
	get(key, default) {
		return AsyncStorage.getItem(key).then(value => {
            if (value === null || value === undefined) {
                return default;
            }
			return JSON.parse(value);
		});
	},

	save(key, value) {
		return AsyncStorage.setItem(key, JSON.stringify(value));
	},

	update(key, value) {
		return deviceStorage.get(key).then(item => {
			value = typeof value === 'string' ? value : Object.assign({}, item, value);
			return AsyncStorage.setItem(key, JSON.stringify(value));
		});
	},

	delete(key) {
		return AsyncStorage.removeItem(key);
	}
};

module.exports = deviceStorage;
