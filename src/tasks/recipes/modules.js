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

Elixir.extend( "module", function( modules, baseDir, fileName ) {
    baseDir = baseDir || Elixir.config.appPaths[ "modules_app" ];
    fileName = fileName || "elixir-module.js";

    if ( ! Array.isArray( modules ) ) {
        modules = [ modules ];
    }

    modules.forEach( function( module ) {
        discoverModule( module, baseDir, fileName );
    } );
} );

Elixir.extend( "modules", function( includes, excludes, fileName ) {
    includes = includes || [ Elixir.config.appPaths[ "modules_app" ] ];
    excludes = excludes || [];
    fileName = fileName || "elixir-module.js";

    if ( ! Array.isArray( includes ) ) {
        includes = [ includes ];
    }

    includes.forEach( function( baseDir ) {
        let modules = fs.readdirSync( path.resolve( baseDir ) )
            .filter( file => fs.statSync( path.resolve( baseDir, file ) ).isDirectory() )
            .filter( dir => excludes.indexOf( dir ) < 0 )
            .filter( dir => fs.existsSync( path.join( baseDir, dir, fileName ) ) );

        modules.forEach( module => discoverModule( module, baseDir, fileName ) );
    } );
} );

function discoverModule( moduleName, baseDir, fileName ) {
    var modulePath = path.join( baseDir, moduleName );
    var moduleGulpfilePath = path.resolve( path.join( modulePath, fileName ) );
    try {
        var moduleGulpfile = require( moduleGulpfilePath );
    }
    catch ( err ) {
        Elixir.log.error( `No ${fileName} found in ${modulePath}` );
        return;
    }
    var originalBasePath = Elixir.config.basePath;
    Elixir.config.basePath = modulePath;
    try {
        moduleGulpfile( Elixir.mixins );
    }
    catch ( err ) {
        Elixir.log.error( `${fileName} in ${modulePath} does not expose a mix function.

Something like:

module.exports = function( mix ) {
    mix.sass( "app.scss" );
};` );
        return;
    }
    finally {
        Elixir.config.basePath = originalBasePath;
    }
}
