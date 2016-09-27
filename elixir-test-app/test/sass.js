describe('Sass Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('compiles Sass files to the includes/css directory', done => {
        Elixir(mix => mix.sass('app.scss'));

        runGulp(() => {
            shouldExist('./includes/css/app.css');

            done();
        });
    });

    it('creates sourcemaps for compiled Sass files', done => {
        Elixir(mix => mix.sass('app.scss'));

        runGulp(() => {
            shouldExist('./includes/css/app.css.map');

            done();
        });
    });

    it('compiles to the source file name, if a single file is given', done => {
        Elixir(mix => mix.sass('another.scss'));

        runGulp(() => {
            shouldExist('./includes/css/another.css');

            done();
        });
    });

    it('compiles to a custom directory and file name', done => {
        Elixir(mix => mix.sass(['app.scss', 'another.scss'], './public/styles/done.css'));

        runGulp(() => {
            shouldExist('./public/styles/done.css');

            done();
        });
    });
});
