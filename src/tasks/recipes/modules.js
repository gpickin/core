import ModuleTask from "../ModuleTask";
import fs from "fs";
import path from "path";

/*
 |----------------------------------------------------------------
 | Module Compilation Task
 |----------------------------------------------------------------
 |
 | This task will run a gulpfile in the specified module
 | allowing you to keep your application and its
 | assets clean and modular.
 |
 */

Elixir.extend( "module", function( name, baseDir = Elixir.config.appPaths[ "modules_app" ] ) {
    new ModuleTask( "module", name, baseDir );
});

Elixir.extend( "modules", function( baseDir = Elixir.config.appPaths[ "modules_app" ] ) {
    var modules = fs.readdirSync( path.resolve( baseDir ) )
        .filter( file => fs.statSync( path.resolve( baseDir, file ) ).isDirectory() )
        .filter( dir => fs.existsSync( path.join( baseDir, dir, "gulpfile.js" ) ) )
        .forEach( module => new ModuleTask( "module", module, baseDir ) );
} );
