describe('Rollup Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('compiles', function(done) {
        Elixir(mix => mix.rollup('main.js'));

        runGulp(() => {
            shouldExist('./includes/js/main.js',
`(function (exports) {
'use strict';

var SomeComponent = function SomeComponent() {
    ['one', 'two'].map(function (item) { return alert(item); });
};

new SomeComponent();

}((this.ColdBoxElixirBundle = this.ColdBoxElixirBundle || {})));

//# sourceMappingURL=main.js.map
`);

            done();
        });
    });
});
