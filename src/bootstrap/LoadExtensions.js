/**
 * Load any official Elixir extensions, if
 * they have been installed by the user.
 */
function loadOfficialExtensions() {
    loadExtension('coldbox-elixir-rollup-official');
    loadExtension('coldbox-elixir-stylus');
    loadExtension('coldbox-elixir-browserify-official');
    loadExtension('coldbox-elixir-webpack-official');
    loadExtension('coldbox-elixir-browsersync-official');

    require('require-dir')('../tasks/recipes');
};


/**
 * Load a single Elixir extension, while
 * suppressing any errors.
 *
 * @param  {string} name
 */
function loadExtension(name) {
    try { require(name); }
    catch (e) {}
}

loadOfficialExtensions();
