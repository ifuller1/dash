!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="build/",n(n.s=38)}({38:function(e,t){importScripts("/build/AssetsManager.js");const n=new AssetsManager,o=n.hashes[0]+"1.2.3";self.addEventListener("install",e=>{e.waitUntil(caches.open(o).then(e=>(console.log("Opened cache for:",__webpack_hash__,n.cacheEntries),e.addAll(n.cacheEntries))))}),self.addEventListener("activate",e=>{console.log("*** NEW SERVICE WORKER ACTIVE ***"),caches.keys().then(e=>Promise.all(e.map(e=>{if(e!==o)return caches.delete(e)})))}),self.addEventListener("fetch",e=>{console.log("fetch request",__webpack_hash__,e.request.url),e.respondWith(caches.match(e.request).then(function(t){return console.log("cache match",__webpack_hash__),t?(console.log("cache response",e.request),t):fetch(e.request)}))}),console.log("Worker with valid cache<<"),self.addEventListener("message",e=>{const t=new URL(location).searchParams.get("indexJs");console.log(t,"indexJs"),console.log("Message to",o),console.log("msg",e),self.postMessage("my result JSJS")})}});