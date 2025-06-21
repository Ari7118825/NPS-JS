// just run this in console

(() => {
  const originalFetch = fetch;
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;
  const originalXHRSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

  function fetchUserInfo(token) {
    originalFetch("https://discord.com/api/v9/users/@me", {
      headers: { Authorization: token }
    })
    .then(res => res.json())
    .then(data => {
      // Do nothing here, no alert or sending
      // You can add custom logic if needed
    })
    .catch(() => {});
  }

  fetch = (...args) => {
    try {
      const headers = args[1]?.headers;
      if (headers) {
        const h = new Headers(headers);
        const token = h.get("Authorization") || h.get("authorization");
        if (token) fetchUserInfo(token);
      }
    } catch {}

    return originalFetch(...args);
  };

  XMLHttpRequest.prototype.open = function(...args) {
    this._headers = {};
    return originalXHROpen.apply(this, args);
  };

  XMLHttpRequest.prototype.setRequestHeader = function(key, value) {
    this._headers[key] = value;
    return originalXHRSetRequestHeader.apply(this, [key, value]);
  };

  XMLHttpRequest.prototype.send = function(body) {
    this.addEventListener("load", () => {
      const token = this._headers["Authorization"] || this._headers["authorization"];
      if (token) fetchUserInfo(token);
    });
    return originalXHRSend.apply(this, [body]);
  };
})();
