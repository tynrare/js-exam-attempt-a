/**
 * @file core_namespace.js
 * @author tynrare
 * @version 1
 * @module Core/CoreNamespace
 */

import logger from '@core/utils/logger.js';
import events from '@core/utils/events_manager.js';
import delays from '@core/utils/delays.js';
import assert from '@core/utils/assert.js';

/**
 * От core game namespace. Глобальный объект, доступный во всем коде.
 * Хранит в себе основные игровые и сервисные методы и параметры
 *
 * @namespace
 * @public
 * @borrows module:Utils/Logger.Logger as logger
 * @borrows module:Utils/EventsManager.EventsManager as events
 */
const cgn = {
	/**
	 * @see {@link module:Core/Utils/Logger.Logger}
	 * @static
	 */
	log: logger,
	/**
	 * @see {@link module:Core/Utils/EventsManager.EventsManager}
	 * @static
	 */
	events,
	/**
	 * @see {@link module:Core/Utils/Delays.Delays}
	 * @static
	 */
	delays,
	/**
	 * @see https://nodejs.org/api/assert.html
	 * @static
	 */
	assert
};

export default cgn;
