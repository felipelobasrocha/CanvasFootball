function MediaImage(key,url){
    var key = key;
    var url = url;

    this.loadImage = function(){
        return new Promise(function(resolve,reject){
            var img = new Image()
            img.onload = function(){
                resolve(url);
            }
            img.onerror = function(){
                reject(url);
            }
            img.src = url;
        });
    };
}