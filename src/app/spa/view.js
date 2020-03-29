/**
 * @file view.js
 *
 * @author tynrare
 * @version 1
 * @module App/Spa
 */

import Backbone from 'backbone';
import BackboneItemsCollection from './collection.js';
import BackboneUserView from './user_view.js';
import { showMessage } from './helpers.js';

const MODELS_TEMPLATE = require('@res/default-users.json');

/**
 * This is root class for whole app
 *
 * P.S. Имхо, backbone вместе со своим jquery добавляют лишний Мб зависимостей,
 * при этом увеличивая сложность приложения своими (В данном случае неуместными) паттернами, при этом заментно понижая надежность:
 * как и самой возрастающей сложностью, так и абсолютно бездарной документацией
 *
 * https://backbonejs.org/#View
 *
 * @augments Backbone.View
 */
class BackboneSpaView extends Backbone.View {
	/**
	 * Не использую initialize т.к. он вызывается до конструктора
	 *
	 * @param {string} rootEl app element root name
	 */
	constructor(rootEl) {
		super();

		this.el = rootEl;

		this.cached.dom = {
			newUserButton: document.querySelector('#create-new-user'),
			newUserName: document.querySelector('#new-user-name'),
			newUserPhone: document.querySelector('#new-user-phone')
		};

		//View.events тож не пажет, даже не хочу разбираться. Возможно надо как-то отдельно jquery инициализировать
		this.cached.dom.newUserButton.addEventListener('click', this.createNewUserEntry.bind(this));

		//FIXME:
		//Без понятия нормально ли работать с полем View.collection, в документации про нее ничего
		//Но выглядит вполне логичным
		this.collection = new BackboneItemsCollection();

		this.listenTo(this.collection, 'add', this.domAddNew);
		this.listenTo(this.collection, 'reset', this.domAddAllCollection);
		this.listenTo(this.model, 'change', this.render);

		this.collection.fetch();
		//Из-за того что прослушка включается после создания коллекции, добавлять дефолтные значения приходится отдельно
		if (!this.collection.length) {
			this.collection.reset(MODELS_TEMPLATE);
		}
	}

	/**
	 * #code-debt: вообще стоило бы эти поля сделать частью таблицы, но по тз формулировка "под табилцей", так что рассматриваю как отдельную сущность.
	 * Хотя в любом случае нужно хотя бы повесить логику в еще один инстанс BackboneUserView, чтоб код не дублировать
	 * #dom
	 * #nonpure
	 */
	createNewUserEntry() {
		const attributes = {
			edit: false,
			name: this.cached.dom.newUserName.value,
			phone: this.cached.dom.newUserPhone.value
		};

		if (this.collection.validate(attributes)) {
			this.cached.dom.newUserName.value = '';
			this.cached.dom.newUserPhone.value = '';

			this.collection.create(attributes);
		} else {
			showMessage('input invalid');
		}
	}

	/**
	 * @param {Backbone.Model} model model from collection
	 */
	domAddNew(model) {
		const view = new BackboneUserView({ model });
		//Не знаю почему автоматом не подвязывается например на collection.change, поэтому отлавливаю вручную
		document.querySelector('#users-table').appendChild(view.render().el);
	}

	/**
	 * Ad
	 */
	domAddAllCollection() {
		this.collection.each(this.domAddNew, this);
	}

	cached = {
		dom: {}
	};
}

export default BackboneSpaView;
