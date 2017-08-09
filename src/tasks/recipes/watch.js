import { each, groupBy, pluck, union } from 'underscore';
import inSequence from 'run-sequence';

const batch = Elixir.Plugins.batch;

/*
 |----------------------------------------------------------------
 | Watcher
 |----------------------------------------------------------------
 |
 | When you want to keep an eye on your files for changes, and
 | then re-trigger Gulp, then you should use the gulp watch
 | command. This way, you can auto-compile on each save!
 |
 */

gulp.task( "watch",  [], (callback) => {
    Elixir.hooks.watch.forEach(hook => hook());

    let batchOptions = Elixir.config.batchOptions;
    let watchOptions = Elixir.config.watch;

    // `Elixir.tasks.tasks` is to get it out of the TaskCollection
    let groupedTasks = groupBy( Elixir.tasks.tasks, "name" )
    each( groupedTasks, function( tasks, name ) {
        let watchers = union( pluck( tasks, "watchers" ) );
        if ( watchers ) {
            gulp.watch( watchers, watchOptions, batch( batchOptions, events => {
                events.on( "end", gulp.start( name ) );
                events.on( "end", ( Elixir.tasks.watching = name ) && gulp.start( name ) );
            }));
        }
    } );

    // run the tasks once.
    inSequence.apply( this, Object.keys( groupedTasks ).concat( callback ) );
});
