javascript:(function() {
  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    const response = await originalFetch.apply(this, args);
    try {
      const requestBody = args[1]?.body ? JSON.parse(args[1].body) : {};
      if (requestBody.token) {
        alert("[Simulation] Token detected in fetch request: " + requestBody.token);
      }
    } catch (e) {}
    return response;
  };

  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(body) {
    this.addEventListener('load', function() {
      try {
        const requestBody = JSON.parse(body);
        if (requestBody.token) {
          alert("[Simulation] Token detected in XHR request: " + requestBody.token);
        }
      } catch (e) {}
    });
    return originalXHRSend.apply(this, [body]);
  };
  console.log("Network monitoring enabled. Tokens will trigger alerts.");
})();
