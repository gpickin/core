import TestingTask from '../TestingTask';

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

Elixir.extend('testbox', function(src, command) {
    new TestingTask('testbox', src, command);
});
