function MediaAudio(key,url){
    this.key = key;
    this.url = url;
    this.audio = new Audio();

    this.playSound = function(time){
        var audio = this.audio;
        audio.play();
        setTimeout(function(){
            audio.pause();
            audio.currentTime = 0;
        }, time);
    };
    this.loadSound = function(){
        this.audio.src = this.url;
        this.audio.preload = "auto";
        this.audio.controls = "none";
        this.audio.style.display = "none";
    }; 
}