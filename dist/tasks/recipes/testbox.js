'use strict';

var _TestingTask = require('../TestingTask');

var _TestingTask2 = _interopRequireDefault(_TestingTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 |----------------------------------------------------------------
 | TestBox Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire TestBox test suite and it
 | will show notifications indicating the success or failure
 | of that test suite. It works great with your bdd task.
 |
 */

Elixir.extend('testbox', function (src, command) {
  new _TestingTask2.default('testbox', src, command);
});