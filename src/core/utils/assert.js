/**
 * @file assert.js
 * @author tynrare
 * @version 1
 * @module Core/CoreNamespace
 */

import assert from 'assert';

/**
 * Proxy for assert methods which can't display error in console if they unhandled
 */
export default new Proxy(assert, {
	get(target, prop) {
		const field = target[prop];
		if (typeof field === 'function') {
			return (...args) => {
				try {
					field(...args);
				} catch (err) {
					throw new Error(err);
				}
			};
		}

		return field;
	}
});
