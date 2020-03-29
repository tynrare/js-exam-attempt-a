/**
 * @file index.js
 *
 * @author tynrare
 * @version 1
 * @module Tests/Manual/Index
 */

/* eslint-disable global-require */
//Add new tests here:
const testCasesList = {
	'Canvas task': require('@test/manual/canvas_test.mtest.js'),
	'SPA task': require('@test/manual/spa_test.mtest.js')
};
/* eslint-enable global-require */

/**
 * starts test if it set in URL
 */
export function initTests() {
	const urlParams = new URLSearchParams(window.location.search);

	if (urlParams.has('testcase')) {
		const name = urlParams.get('testcase');
		const testcase = testCasesList[name];
		cgn.log.log(`start test '${name}'`);
		testcase.default();
	} else {
		const ul = document.createElement('ui');
		for (const key in testCasesList) {
			const li = document.createElement('li');
			li.innerHTML = `<a href='?testcase=${key}'>run '${key}' test</a>`;
			ul.appendChild(li);
		}
		document.body.appendChild(ul);

		cgn.log.error('nothing to run. select case in dev menu');
	}
}

initTests();

/**
 * Sets new URL and reloads page. Expects new page will start 'initTests'
 *
 * @param {string} name test name to run (in testCaseList)
 */
export function runTestCase(name) {
	window.location.search = new URLSearchParams({ testcase: name }).toString();
}
