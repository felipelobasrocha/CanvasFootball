function Timer(countDown){
    this.countDownTime = countDown;
    this.stopWatch = '';
    var timeToFinish = 0;
    var gamePeriod = 1; // 1 = First Half; 0 = Half Time; 2 = Second Half; 3 = End Match
    
    var running = 0;
    this.gamePeriodInfo = function(){
        return (gamePeriod === 1 ? "1st half" : "2nd half");
    };
    this.startSecondHalf = function(){
        gamePeriod=2;
        return true;
    };    
    this.calculateTime = function(){
        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        timeToFinish = this.countDownTime - now;

        // Time calculations for minutes and seconds
        var minutes = Math.floor((timeToFinish % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeToFinish % (1000 * 60)) / 1000);

        // It formats the timer
        var padTimeDigits = "00";
        var time = 
            padTimeDigits.substring(0, 
                padTimeDigits.length - minutes.toString().length) + minutes.toString() + "m" +
                    padTimeDigits.substring(0,
                        padTimeDigits.length - seconds.toString().length) + seconds.toString() + "s";

        this.stopWatch = time;  
    };    
    this.runTimer = function(interval,callback){
        running = interval;
        this.calculateTime();
        callback(this);
    };
    this.checkGamePeriod = function(canvas,condition1,condition2){
        if (gamePeriod === 3){
            return condition1(canvas);
        } else if(gamePeriod === 0){
            return condition2(canvas);
        } else {
            return false;
        }
    };
    this.timerIsRunning = function(){
        if (timeToFinish < 0){
            if(gamePeriod === 1){
                gamePeriod = 0;
            }else if (gamePeriod === 2){
                gamePeriod = 3;
            }
            clearInterval(running);
            return false;
        } else{
            return true;
        }        
    };        
}