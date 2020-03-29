/**
 * @file collection.js
 *
 * @author tynrare
 * @version 1
 * @module App/Spa
 */

import Backbone from 'backbone';
import BackboneItemModel from './model.js';
import { LocalStorage } from 'backbone.localstorage';

/**
 * https://backbonejs.org/#Collection
 *
 * @augments Backbone.Collection
 */
class BackboneItemsCollection extends Backbone.Collection {
	/**
	 */
	constructor() {
		super();

		/**
		 * #code-debt:
		 * а) по идее localStorage сам должен слушать эти эвенты, но почему-то этого неделает
		 * б) TODO: тут нужен трешхолд на обновление, потому что их за раз фигачит штуки 3
		 */
		this.on('all', () => {
			this.localStorage.update(this);
			this.localStorage.save();
		});
	}

	/**
	 * Checks input
	 *
	 * #pure
	 *
	 * @param {object} attributes .
	 * @param {string} attributes.name user name
	 * @param {string} attributes.phone user phone
	 * @returns {boolean} true if valid
	 */
	validate(attributes) {
		return BackboneItemModel.validate(attributes);
	}

	/**
	 * Whatever it means
	 * "We keep the Todos in sequential order, despite being saved by unordered
	 * GUID in the database. This generates the next order number for new items."
	 *
	 * @returns {number} order of element
	 */
	nextOrder() {
		return this.length ? this.last().get('order') + 1 : 1;
	}

	// Todos are sorted by their original insertion order.
	comparator = 'order';

	/**
	 * @override
	 */
	model = BackboneItemModel;

	localStorage = new LocalStorage('backbone-users-collection');

	id = 'items-collection';
}

export default BackboneItemsCollection;
