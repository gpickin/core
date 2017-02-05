import fs from "fs";
import path from "path";
import gulpif from "gulp-if";
import shell from "gulp-shell";

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
        return shell( this.command );
    }

}
