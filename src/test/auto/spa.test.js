const assert = require('assert');
import BackboneSpaManager from '@app/app/spa/index.js';
import BackboneItemModel from '@app/app/spa/model.js';
import { showMessage } from '@app/app/spa/helpers.js';

const collectionModelsTemplate = require('@res/default-users.json');

describe('SPA Task', () => {
	localStorage.clear();
	const manager = new BackboneSpaManager();

	it('BackboneItemModel.validate', () => {
		assert.ok(!BackboneItemModel.validate({ name: '', phone: '' }));
		assert.ok(!BackboneItemModel.validate({ name: 'a', phone: '' }));
		assert.ok(!BackboneItemModel.validate({ name: 'a', phone: 'a' }));
		assert.ok(!BackboneItemModel.validate({ name: 'a', phone: '+' }));
		assert.ok(!BackboneItemModel.validate({ name: 'a', phone: '++2' }));
		assert.ok(!BackboneItemModel.validate({ name: 'a', phone: '+2-2-2-2-2-2222---2' }));
		assert.ok(!BackboneItemModel.validate({ name: 'a', phone: '+2-2-2-2-2-2222---' }));
		assert.ok(BackboneItemModel.validate({ name: 'a', phone: '+2-2-2-2-2-2222' }));
		assert.ok(BackboneItemModel.validate({ name: 'a', phone: '2-2-2-2-2-2222' }));
		assert.ok(!BackboneItemModel.validate({ name: '', phone: '2-2-2-2-2-2222' }));
		//etc.
	});
	it('init', () => {
		manager.init();
		assert.ok(manager.view);
		assert.ok(document.querySelector('#approot'));
	});
	it('SpaMessage show', () => {
		showMessage('a');
		const message = document.querySelector('#message-holder');
		assert.equal(message.innerHTML, 'a');
		assert.ok(message.classList.contains('show'));
	});
	it('init BackboneSpaView', () => {
		assert.ok(manager.view.cached.dom.newUserButton);
		assert.ok(manager.view.cached.dom.newUserName);
		assert.ok(manager.view.cached.dom.newUserPhone);
	});
	it('default BackboneItemsCollection collection', () => {
		assert.deepEqual(collectionModelsTemplate, manager.view.collection.toJSON());
	});
	it('BackboneSpaView.createNewUserEntry', () => {
		manager.view.cached.dom.newUserName.value = 'a';
		manager.view.cached.dom.newUserPhone.value = '+1';
		manager.view.createNewUserEntry();

		assert.equal(manager.view.cached.dom.newUserName.value, '');
		assert.equal(manager.view.cached.dom.newUserPhone.value, '');
		assert.equal(manager.view.collection.length, collectionModelsTemplate.length + 1);
		assert.equal(manager.view.collection.last().get('name'), 'a');
		assert.equal(manager.view.collection.last().get('phone'), '+1');
		assert.equal(
			document.querySelector('#users-table').children.length,
			collectionModelsTemplate.length + 1
		);
	});
	it('BackboneSpaView.createNewUserEntry error', () => {
		manager.view.cached.dom.newUserName.value = '';
		manager.view.cached.dom.newUserPhone.value = '';
		manager.view.createNewUserEntry();
		assert.ok(document.querySelector('#message-holder').classList.contains('show'));
	});
	it('BackboneItemsCollection storage', () => {
		const root = document.querySelector('#approot');
		root.parentElement.removeChild(root);
		manager.init();

		assert.equal(
			document.querySelector('#users-table').children.length,
			collectionModelsTemplate.length + 1
		);
	});
	it('BackboneUserView remove', () => {
		document.querySelector('#users-table #remove').click();
		assert.equal(
			document.querySelector('#users-table').children.length,
			collectionModelsTemplate.length
		);
	});
	it('BackboneUserView edit', () => {
		document.querySelector('#users-table #edit').click();
		document.querySelector('#users-table #name-input').value = 'abc';
		document.querySelector('#users-table #save').click();
		assert.equal(document.querySelector('#users-table #name-view').innerHTML, 'abc');
	});
	it('BackboneUserView edit error', () => {
		document.querySelector('#users-table #edit').click();
		document.querySelector('#users-table #name-input').value = '';
		document.querySelector('#users-table #save').click();
		assert.ok(document.querySelector('#message-holder').classList.contains('show'));
	});
});
