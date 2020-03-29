/**
 * @file model.js
 *
 * @author tynrare
 * @version 1
 * @module App/Spa
 */

import Backbone from 'backbone';

/**
 * https://backbonejs.org/#Model
 *
 * @augments Backbone.Model
 */
class BackboneItemModel extends Backbone.Model {
	/**
	 * @override
	 */
	defaults = {
		name: 'John',
		phone: '+123',
		edit: false
	};

	/**
	 * Checks input
	 *
	 * #pure
	 *
	 * @static
	 * @param {object} attributes .
	 * @param {string} attributes.name user name
	 * @param {string} attributes.phone user phone
	 * @returns {boolean} true if valid
	 */
	static validate(attributes) {
		return Boolean(attributes.name.length && attributes.phone.match(/^\+?(?<phone>\d+-?)+$/u));
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
}

export default BackboneItemModel;
