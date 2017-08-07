function Ball(){
    this.positionX = 0;
    this.positionY = 0;
    this.speedX = 0;
    this.speedY = 0;
    var initialPositionX = this.positionX;
    var initialPositionY = this.positionY;
    this.initialSpeedX = 5;
    this.initialSpeedY = 10;

    this.startBall = function(canvas){
        this.positionX = (canvas.htmlCanvas.width/2);
        this.positionY = (canvas.htmlCanvas.height/2);
        initialPositionX = this.positionX;
        initialPositionY = this.positionY;        

        var randomDirection = (Math.floor(Math.random() * (10 - 0) + 0));
        randomDirection = randomDirection % 2 != 0 ? -this.initialSpeedX : this.initialSpeedX;
        this.speedX = randomDirection;
        this.speedY = randomDirection;
    };
    this.restartBall = function(){
        this.positionX = initialPositionX;
        this.positionY = initialPositionY;
        this.speedX = -this.initialSpeedX;
        this.speedY = -this.initialSpeedY;
    };
    this.releaseBall = function(canvas){
        // It releases the ball when it stucked
        if (this.positionX < canvas.htmlCanvas.width/2){
            this.positionX += BALL_PIXEL_MOVE;
            this.positionY += BALL_PIXEL_MOVE;
        } else{
            this.positionX -= BALL_PIXEL_MOVE;
            this.positionY -= BALL_PIXEL_MOVE;
        }
    };
    this.increaseBallSpeed = function(){
        var speedAdjustment=0;
        var doubleSpeed = (this.initialSpeedX*2);
        if (this.speedX > 0 && this.speedX < (doubleSpeed)){
            speedAdjustment += this.initialSpeedX;
        }else if (-this.speedX < 0 && -this.speedX > -(doubleSpeed)){
            speedAdjustment -= this.initialSpeedX;
        }else{
            speedAdjustment = 0;
        }

        return speedAdjustment;
    };       
}

Ball.prototype.moveBall = function(){
    // Moving the ball - Both Axis (X,Y)
    this.positionX += this.speedX;
    this.positionY += this.speedY;
}