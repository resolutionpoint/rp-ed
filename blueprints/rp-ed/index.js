module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return this.addBowerPackagesToProject([
        { name: 'ckeditor', target: '~4.5.9' },
        { name: 'codemirror', target: '~5.13.0' },
        { name: 'colpick', target: '~2.0.2' }
    ]);
  }
};
