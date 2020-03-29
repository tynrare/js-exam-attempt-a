/**
 * @file canvas_test.js
 *
 * @author tynrare
 * @version 1
 * @module Tests/Manual
 */

import CanvasHelper from '@app/app/canvas/canvas_helper.js';

const CANVASA_WIDTH = 600;
const CANVASA_HEIGHT = 600;

const CANVASB_WIDTH = 600;
const CANVASB_HEIGHT = 50;

const TEST_STAR_SPIKES = 5;

const TASK_COLORS = ['red', 'blue', 'green', 'yellow', 'black'];

/**
 * Creates #root element in document
 *
 * #dom
 */
function initRoot() {
	const el = document.createElement('div');
	el.id = 'root';
	el.style.width = CANVASA_WIDTH + 'px';

	document.body.appendChild(el);
}

/**
 * Default test entry point
 *
 * 1. Создать 2 канваса 600x600 и 600x50, нарисовать в большем 5 закрашенных 5-и конечных звезд.
 * Красного, синего, зеленого, желтого и черного цветов и по клику мышкой на цветной звезде - закрашивать маленький канвас - соответствующим цветом.
 * При клике на белую (не закрашенную) область большого канваса - маленький канвас - закрашивать белым.
 */
export default function run() {
	//===
	//inits
	initRoot();

	const canvasA = new CanvasHelper(CANVASA_WIDTH, CANVASA_HEIGHT)
		.init('root')
		.fill({ r: 255, b: 255, g: 255 });

	const canvasB = new CanvasHelper(CANVASB_WIDTH, CANVASB_HEIGHT).init('root');

	//===
	//stars draw
	const starSize = CANVASA_WIDTH / TASK_COLORS.length;
	for (let i = 0; i < TASK_COLORS.length; i++) {
		canvasA.drawStar({
			outerRadius: starSize / 2,
			x: starSize * (i + 0.5),
			y: starSize * (i + 0.5),
			spikes: TEST_STAR_SPIKES,
			color: TASK_COLORS[i]
		});
	}

	//===
	//app 'loop'
	canvasA.on((event) => {
		const color = canvasA.getPixelColor(event.x, event.y);
		canvasB.fill(color);
	});
}
