Js.log({j|Postback code from worker here...!|j});
/* WebWorkers.setWorkerOnMessage(
     WebWorkers.self,
     (e: WebWorkers.MessageEvent.t) => {
       Js.log("I am the Web Worker and I have received a message:");
       Js.log(WebWorkers.MessageEvent.data(e));
       WebWorkers.postMessageFromWorker("my result");
     },
   ); */
/* let cacheName = "my-site-cache-v1";

   let urlsToCache = ["/", "/styles/main.css", "/script/main.js"];

   WebWorkers.self.addEventListener("install", event =>
     /* // Perform install steps */
     event.waitUntil(
       caches.open_(cacheName).then_(cache => {
         Js.log("Opened cache");
         cache.addAll(urlsToCache);
       }),
     )
   ); */