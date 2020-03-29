/**
 * @file helpers.js
 *
 * @author tynrare
 * @version 1
 * @module App/Spa/Helpers
 */

/**
 * Shows message on screen
 * You have to init view first
 *
 * @param {string} message message to show
 */
export function showMessage(message) {
	const el = document.querySelector('#message-holder');

	//restart animation for case
	el.classList.remove('show');

	el.innerHTML = message;
	el.classList.add('show');
	el.addEventListener('animationend', () => {
		el.classList.remove('show');
	});
}
