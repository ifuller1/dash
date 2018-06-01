
var AssetsManager = function() {
    this.cacheName = 'appCache'; 
    this.cacheEntries = ['build/index.5e0f80de7271a7ae9d73.js','worker.js','/','/assets/stations.csv'];
    this.hashes = ['35f0248095b364658ee9','index',''];
};

AssetsManager.prototype.addAllToCache = function() {
    if(!this.cacheName)
        throw new Error('Please provide cacheName in plugin options');
    const ctx = this;

    return caches.open(ctx.cacheName).then(function(cache) {
      Promise.all(
        ctx.cacheEntries.map(function(asset){cache.add(asset)})
      );
    });            
};

AssetsManager.prototype.removeNotInAssets = function() {
    var ctx = this;   
    
     return caches.open(ctx.cacheName).then(function(cache) {
          cache.keys().then(function(keys) {
              return Promise.all(
                keys.filter(function(request){
                  var erase = true;
                  var noErase = false;          
                  return ctx.cacheEntries.indexOf(request.url) >= 0 ? noErase:erase;
                }).map(function(entryToErase){          
                  cache.delete(entryToErase);                                
                })      
              );
          });
      }); 
};

