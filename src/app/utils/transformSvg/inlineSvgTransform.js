const SVGO = require('svgo');
const cuid = require('cuid');
const applySvgoPluginDefaults = require('./pluginDefaults');

// THIS MUST BE RUN IN A NODE ENV
// can leverage ipc channels to execute
// commands in our electron shell

function toInlineSvg(svg, options) {
  options = options || {};
  if (!options.id) options.id = cuid();
  options.svgoPlugins = applySvgoPluginDefaults(
    options.svgoPlugins,
    options.id
  );

  const svgo = new SVGO({
    plugins: options.svgoPlugins
  });
  return svgo.optimize(svg).then(result => result.data);
}

module.exports = toInlineSvg;