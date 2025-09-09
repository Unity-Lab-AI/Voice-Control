(function() {
  function loadEnv() {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/.env', false);
      xhr.send(null);
      if (xhr.status === 200) {
        var lines = xhr.responseText.split('\n');
        window.env = window.env || {};
        lines.forEach(function(line) {
          var match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
          if (match) {
            window.env[match[1]] = match[2];
          }
        });
      } else {
        window.env = window.env || {};
      }
    } catch (e) {
      console.warn('Could not load .env file', e);
      window.env = window.env || {};
    }
  }

  loadEnv();

  window.withPollinationsToken = function(url) {
    var token = window.env && window.env.POLLINATIONS_API_TOKEN;
    if (!token) return url;
    var separator = url.indexOf('?') === -1 ? '?' : '&';
    return url + separator + 'token=' + encodeURIComponent(token);
  };
})();
