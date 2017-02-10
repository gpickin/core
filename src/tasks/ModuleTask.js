import fs from "fs";
import path from "path";
import gulpif from "gulp-if";
import nop from "gulp-nop";
import defaultShell from "spawn-default-shell";

export default class ModuleTask extends Elixir.Task {

    constructor(name, moduleName, baseDir) {
        super( name );
        this.moduleName = moduleName;
        this.filepath = path.join( baseDir, this.moduleName, "gulpfile.js" );
        this.command = `gulp --gulpfile ${this.filepath}${ Elixir.isWatching() ? " watch" : ""}`;
    }

    gulpTask() {
        return (
            gulp.src( "" )
                .pipe( gulpif(
                    this.gulpfileExists(),
                    this.runModuleGulpfile()
                ) )
                .on( "error", this.onError() )
                .pipe( this.onSuccess() )
        );
    }

    gulpfileExists() {
        return fs.existsSync( this.filepath );
    }

    runModuleGulpfile() {
        this.recordStep( `Running Elixir for ${this.moduleName}.` );
        const child = defaultShell.spawn( this.command );
        child.stdout.on('data', data => console.log(`${data}`) );
        child.stderr.on('data', data => console.log(`${data}`) );
        return nop();
    }

}
