// just copy and paste this script either into the url bar with javascript: infront of the code or copy and paste into the browser console by opening dev tools using ctrl+shift+i

(()=>{const f=window.fetch,s=XMLHttpRequest.prototype.send;window.fetch=(...a)=>f(...a).then(r=>{try{let b=JSON.parse(a[1]?.body);b?.token&&alert(`f:${b.token}`)}catch{};return r});XMLHttpRequest.prototype.send=function(b){this.addEventListener('load',()=>{try{let t=JSON.parse(b);t?.token&&alert(`x:${t.token}`)}catch{}});s.call(this,b)};console.log("M")})();
