/**
 * based on https://backbonejs.org/docs/todos.html
 * and https://github.com/tastejs/todomvc/tree/master/examples/backbone
 *
 * @file index.js
 *
 * @author tynrare
 * @version 1
 * @module App/Spa
 */

import BackboneSpaView from './view.js';

const TEMPLATE = require('@res/html/backbone_spa_view.html');
const ROOT_EL_ID = 'approot';


//Стили для работы страницы
import '@res/css/app.css';

/**
 * This is root class for whole app
 *
 * https://backbonejs.org/#View
 */
class BackboneSpaManager {
	/**
	 * Creates DOM elements and backbone root view
	 *
	 * #dom
	 * #chain
	 *
	 * @returns {BackboneSpaManager} this
	 */
	init() {
		const el = document.createElement('div');
		el.id = ROOT_EL_ID;
		el.innerHTML = TEMPLATE;
		document.body.appendChild(el);

		this.view = new BackboneSpaView(ROOT_EL_ID);

		return this;
	}
}

export default BackboneSpaManager;
