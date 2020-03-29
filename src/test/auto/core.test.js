/* eslint-disable max-lines-per-function */

import assert from 'assert';

describe('Core tests', () => {
	describe('Events', () => {
		beforeEach(() => {
			cgn.events.init();
		});
		it('on/emit', (done) => {
			cgn.events.on('test', done);
			cgn.events.emit('test');
		});
		it('addListener/emit', (done) => {
			cgn.events.addListener('test', done);
			cgn.events.emit('test');
		});
		it('once/emit', (done) => {
			cgn.events.once('test', done);
			cgn.events.emit('test');
			//if it triggers twice, we'll get error
			cgn.events.emit('test');
		});
		it('off', (done) => {
			cgn.events.on('test', done);
			cgn.events.emit('test');
			cgn.events.off('test', done);
			//if it triggers twice, we'll get error
			cgn.events.emit('test');
		});
		it('off by id', (done) => {
			const id = cgn.events.on('test', done);
			cgn.events.emit('test');
			cgn.events.off(id);
			//if it triggers twice, we'll get error
			cgn.events.emit('test');
		});
		it('off wrong id', () => {
			cgn.events.off('123123123idid');
		});
		it('group', (done) => {
			cgn.events.on('test', done, null, 'test_group');
			cgn.events.emit('test');
			//if it triggers twice, we'll get error
			cgn.events.discard('test_group');
			cgn.events.emit('test');
		});
		it('context', (done) => {
			const context = {
				done() {
					assert.equal(this, context);
					done();
				}
			};
			cgn.events.on('test', context.done, context);
			cgn.events.emit('test');
		});
	});
	describe('Delays', () => {
		it('update', (done) => {
			cgn.delays.update(done);
			//in test we have not main loop, trigger manual
			cgn.events.emit('update');
		});
		it('update throw', () => {
			cgn.delays.update(() => {
				throw new Error('Suppose to be handled');
			});
			//in test we have not main loop, trigger manual
			//it doesn't throw any errors
			cgn.events.emit('update');
		});
		it('immediate', (done) => {
			cgn.delays.immediate(done);
		});
		it('immediate throw', () => {
			cgn.delays.immediate(() => {
				throw new Error('Suppose to be handled');
			});
		});
		it('inteval', (done) => {
			const id = cgn.delays.inteval(() => {
				cgn.delays.clearInterval(id);
				done();
			}, 1);
		});
		it('inteval throw', (done) => {
			const id = cgn.delays.inteval(() => {
				cgn.delays.clearInterval(id);
				done();
				throw new Error('Suppose to be handled');
			}, 1);
		});
		it('timeout', (done) => {
			cgn.delays.timeout(done);
		});
		it('timeout throw', (done) => {
			cgn.delays.timeout(() => {
				done();
				throw new Error('Suppose to be handled');
			});
		});
		it('timeout clear', (done) => {
			const id = cgn.delays.timeout(() => {
				done();
			});
			cgn.delays.clearTimeout(id);
			done();
		});
	});
	describe('Logger (check console)', () => {
		before(() => {
			cgn.log.groups.test1 = 2;
			cgn.log.groups.test2 = 5;
		});
		it('simple log', () => {
			cgn.log.log('simple log');
		});
		it('warn log', () => {
			cgn.log.warn('warn log');
		});
		it('error log', () => {
			cgn.log.error('error log');
		});
		it('group log', () => {
			cgn.log.loggingLevel = 2;
			cgn.log.group('test1', 'this log should display');
			cgn.log.group.log('test1', 'this log should display too');
			cgn.log.group('test2', 'this log should not display');
		});
		it('group warn', () => {
			cgn.log.loggingLevel = 2;
			cgn.log.group.warn('test1', 'this warn should display');
			cgn.log.group.warn('test2', 'this warn should not display');
		});
		it('group error', () => {
			cgn.log.loggingLevel = 2;
			cgn.log.group.error('test1', 'this error should display');
			cgn.log.group.error('test2', 'this error should not display');
		});
		it('assignGroupLevels', () => {
			const val = 5;
			cgn.log.assignGroupLevels({ TEST_LEVEL: val });
			cgn.assert.equal(cgn.log.groups.TEST_LEVEL, val);
		});
	});
	describe('Asset', () => {
		it('get prop', () => {
			assert.equal(assert.prototype, cgn.assert.prototype);
		});
		it('get function', () => {
			assert.notEqual(assert.ok, cgn.assert.ok);
			cgn.assert.ok(true);
			assert.throws(() => {
				cgn.assert.ok(false);
			});
			assert.throws(() => {
				cgn.assert.equal(1, 2);
			});
		});
	});
});
