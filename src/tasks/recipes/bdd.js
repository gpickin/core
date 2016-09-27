/*
 |----------------------------------------------------------------
 | BDD Watcher
 |----------------------------------------------------------------
 |
 | This task will keep an eye on any tasks that are part of the
 | tdd category. By default this includes TestBox specs.
 | Run `gulp bdd` and your tests will auto-trigger.
 |
 */

gulp.task('bdd', function() {
    Elixir.log.message('Watching for tests...');

    runAllTasks();

    Elixir.tasks
        .filter(task  => task.category == 'bdd')
        .forEach(task => gulp.watch(task.watchers, [task.name]));
});


/**
 * Trigger all registered tasks.
 */
function runAllTasks() {
    gulp.start('default');

    Elixir.isRunningAllTasks = false;
}
