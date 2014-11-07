var mach = require('../index');

mach.call = require('../utils/callApp');
mach.proxy = require('../utils/createProxy');

var mergeProperties = require('../utils/mergeProperties');

[ 'DELETE',
  'GET',
  'HEAD',
  'OPTIONS',
  'POST',
  'PUT',
  'TRACE'
].forEach(function (method) {
  mach[method.toLowerCase()] = function (app, callback, options) {
    if (options == null && typeof callback !== 'function') {
      options = callback;
      callback = null;
    }

    // Don't mutate options.
    options = options ? mergeProperties({}, options) : {};
    options.method = method;

    return mach.call(app, callback, options);
  };
});

module.exports = mach;
