Package.describe({
  name: "nova:share",
  summary: "Telescope share module package",
  version: "0.25.7",
  git: "https://github.com/TelescopeJS/telescope-share.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use(['nova:core@0.25.7']);

  api.addFiles([
    'lib/share.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/post_share.html',
    'lib/client/post_share.js',
    'lib/client/post_share.scss'
  ], ['client']);

  // api.export();
});
