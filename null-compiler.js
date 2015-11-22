function noop() {
  return null;
}

require.extensions['.css'] = noop;
require.extensions['.less'] = noop;
require.extensions['.png'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.gif'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.ttf'] = noop;
require.extensions['.eot'] = noop;
require.extensions['.woff'] = noop;
require.extensions['.woff2'] = noop;
require.extensions['.wav'] = noop;
