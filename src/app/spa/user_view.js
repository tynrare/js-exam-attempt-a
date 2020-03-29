/**
 * @file user_view.js
 *
 * @author tynrare
 * @version 1
 * @module App/Spa
 */

import Backbone from 'backbone';
import Handlebars from 'handlebars';
import { showMessage } from './helpers.js';

const TEMPLATE = require('@res/html/backbone_item_view.html');

/**
 * Это вьюшка для списка пользователей, таблица имя-телефон-редактировать
 *
 * P.S. Не нравится именование "user", т.к. оно вводит неоднозначность, но по тз это "список пользователей", так что в общем-то не моя проблема
 *
 * @augments Backbone.View
 */
class BackboneUserView extends Backbone.View {
	/**
	 * #code-debt: пересоздаю темлейт каждый рендер, чего можно было бы избежать с каким-нибудь реактивным фреймворком
	 *
	 * @override
	 */
	render() {
		const edit = this.model.get('edit');

		this.el.innerHTML = this.template(this.model.toJSON());

		//Reinit cache
		this.cached.dom = {
			editButton: this.el.querySelector('#edit'),
			deleteButton: this.el.querySelector('#remove'),
			saveButton: this.el.querySelector('#save'),
			nameInput: this.el.querySelector('#name-input'),
			phoneInput: this.el.querySelector('#phone-input')
		};

		this.cached.dom.editButton.addEventListener('click', this.toggleEditMode.bind(this));
		this.cached.dom.saveButton.addEventListener('click', this.confirmEdit.bind(this));
		this.cached.dom.deleteButton.addEventListener('click', this.deleteSelfEntry.bind(this));

		this.el.querySelectorAll(`.${edit ? 'view' : 'edit'}-item`).forEach((e) => {
			e.classList.add('hidden');
		});

		return this;
	}

	/**
	 * Cleanups element
	 *
	 * #dom
	 *
	 * @override
	 * @returns {BackboneUserView} this
	 */
	remove() {
		this.el.parentElement.removeChild(this.el);

		return this;
	}

	/**
	 * #code-debt: отстойно, когда у конструктора сайд эффекты, но так работает фреймворк
	 * #dom
	 *
	 * @override
	 */
	constructor({ model }) {
		super({ model });

		this.el = document.createElement('tr');

		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	}

	/**
	 * Sets editing mode for element
	 *
	 * @param {boolean} edit enable or disable edit
	 */
	setEditMode(edit) {
		this.model.set('edit', edit);
	}

	/**
	 * Toggles editing mode for element
	 */
	toggleEditMode() {
		this.setEditMode(!this.model.get('edit'));
	}

	/**
	 * Updates model and exits edit and rerenders all
	 *
	 * #nonpure
	 * #dom
	 */
	confirmEdit() {
		const attributes = {
			name: this.cached.dom.nameInput.value,
			phone: this.cached.dom.phoneInput.value
		};
		if (this.model.validate(attributes)) {
			//this.model.save(attributes); //doesn't work
			//work
			for (const key in attributes) {
				this.model.set(key, attributes[key]);
			}
			this.toggleEditMode();
		} else {
			showMessage('input invalid');
		}
	}

	/**
	 * Removes element from list
	 */
	deleteSelfEntry() {
		this.model.destroy();
	}

	template = Handlebars.compile(TEMPLATE);

	tagName = 'table';

	cached = {
		dom: {}
	};
}

export default BackboneUserView;
