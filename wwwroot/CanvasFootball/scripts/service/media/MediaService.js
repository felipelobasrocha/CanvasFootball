function MediaService(){

    this.loadCanvasMedia = function(canvas){
        setCanvasAudio('goal',GOAL_SOUND_URL,canvas);
        setCanvasAudio('referee',REFEREE_WHISTLE_SOUND_URL,canvas);
    };
    this.loadImages = function(){
        var images = getImages();

        Promise.all(images).then(function(successurl){
            return successurl;
        }).then(function(arraySrc){
            arraySrc.forEach(function (value, i){
                document.images[i].src = value;
            });
        }).catch(function(errorurl){
            console.log('Error loading ' + errorurl)
        });
    };
    var getImages = function(){
        var images = [];
        images.push(getImage('brazilFlag',BRAZIL_FLAG_URL));
        images.push(getImage('nZFlag',NEWZEALAND_FLAG_URL));
        return images;
    };    
    var getImage = function(imageName,imageUrl){
        var mediaImage = new MediaImage(imageName,imageUrl);
        return mediaImage.loadImage();
    };    
    var setCanvasAudio = function(audioName,audioUrl,canvas){
        var mediaAudio = new MediaAudio(audioName,audioUrl);
        mediaAudio.loadSound();
        canvas.setAudio(mediaAudio);
    };
}