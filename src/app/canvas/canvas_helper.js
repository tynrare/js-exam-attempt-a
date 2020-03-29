/**
 * @file canvas_helper.js
 *
 * @author tynrare
 * @version 1
 * @module App/Canvas
 */

/**
 * thanks https://stackoverflow.com/a/39077686
 *
 * @param {number} r .
 * @param {number} g .
 * @param {number} b .
 * @returns {string} hex color
 */
function rgbToHex(r, g, b) {
	const hex = 16;

	return '#' + [r, g, b].map((x) => x.toString(hex).padStart(2, '0')).join('');
}

/**
 * Это класс работы с канвасом по-нарошку. Нужен только для выполнения тестового, иначе бесполезен
 *
 * #dom
 */
class CanvasHelper {
	/**
	 * Constructor constructs:)
	 *
	 * @param {number} width width in pixels
	 * @param {number} height height in pixels
	 */
	constructor(width, height) {
		this._width = width;
		this._height = height;
	}

	/**
	 * Creates canvas and adds it on page
	 *
	 * #dom
	 * #chain
	 *
	 * @param {string} rootEl DOM root id
	 * @returns {CanvasHelper} this
	 */
	init(rootEl) {
		const root = document.getElementById(rootEl);
		cgn.assert.ok(root);

		this._canvas = document.createElement('canvas');
		this._canvas.width = this._width;
		this._canvas.height = this._height;

		this._ctx = this._canvas.getContext('2d');

		root.appendChild(this._canvas);

		return this;
	}

	/**
	 * Fills full canvas with color
	 *
	 * #chain
	 *
	 * @param {object} color .
	 * @param {number} color.r .
	 * @param {number} color.g .
	 * @param {number} color.b .
	 * @returns {CanvasHelper} this
	 */
	fill(color) {
		this._ctx.beginPath();
		this._ctx.rect(0, 0, this._width, this._height);
		this._ctx.fillStyle = rgbToHex(color.r, color.g, color.b);
		this._ctx.fill();

		return this;
	}

	/**
	 * thanks https://stackoverflow.com/a/45140101
	 *
	 * #chain
	 *
	 * @param {object} props .
	 * @param {number} props.outerRadius star (circle) radius
	 * @param {number} [props.innerRadius=2] star (circle) inner radius
	 * @param {number} props.x pos x
	 * @param {number} props.y pos y
	 * @param {number} props.spikes number of spikes
	 * @param {string} props.color html color
	 * @returns {CanvasHelper} this
	 */
	drawStar({ outerRadius, innerRadius = outerRadius / 2, x, y, spikes, color }) {
		this._ctx.save();
		this._ctx.beginPath();
		this._ctx.translate(x, y);
		this._ctx.moveTo(0, 0 - outerRadius);
		for (let i = 0; i < spikes; i++) {
			this._ctx.rotate(Math.PI / spikes);
			this._ctx.lineTo(0, 0 - innerRadius);
			this._ctx.rotate(Math.PI / spikes);
			this._ctx.lineTo(0, 0 - outerRadius);
		}
		this._ctx.closePath();
		this._ctx.fillStyle = color;
		this._ctx.fill();
		this._ctx.restore();

		return this;
	}

	/**
	 * listens clicks on canvas
	 *
	 * #chain
	 *
	 * @param {Function} callback callback event function
	 * @returns {CanvasHelper} this
	 */
	on(callback) {
		this._canvas.addEventListener('click', callback);

		return this;
	}

	/**
	 * @param {number} x .
	 * @param {number} y .
	 *
	 * @returns {object} {r,g,b}
	 */
	getPixelColor(x, y) {
		const data = this._ctx.getImageData(x, y, 1, 1).data;

		return { r: data[0], g: data[1], b: data[2] };
	}

	/**
	 * Canvas width
	 */
	_width = 0;

	/**
	 * Canvas hieght
	 */
	_height = 0;

	/**
	 * @property {Element}
	 */
	_canvas = null;

	_ctx = null;
}

export default CanvasHelper;
