function Paddle(posX,posY,paddleName,range,color,level){
    this.name = paddleName;
    this.positionX = posX;
    this.positionY = posY;
    this.initialPositionX = posX;
    this.initialPositionY = posY;
    this.rangeMovement = range;
    this.score = 0;
    this.color = color;
    this.depth = level;
    this.paddles = [];

    this.addItem = function(paddle){
        this.paddles[this.paddles.length] = paddle;
    };
    this.addCPUMovement = function(canvas){ //move to team
        var ball = canvas.data.hash('ball').item;
        // CPU Artificial Intelligence
        var paddleYCenter = this.positionY;
        if (ball.positionX > (canvas.htmlCanvas.width/2) && this.name == 'paddle1'){
            this.positionY = (canvas.htmlCanvas.height-PADDLE_HEIGHT)/2;
        } else if (ball.positionX < (canvas.htmlCanvas.width/2)  && this.name == 'paddle2'){
            this.positionY = (canvas.htmlCanvas.height-PADDLE_HEIGHT)/2;
        }else{
            if(paddleYCenter < ball.positionY-PADDLE_CPU_RESPONSE_TIME &&
            paddleYCenter < this.initialPositionY+this.rangeMovement){
                this.positionY += PADDLE_CPU_AGILITY; // Moving down
            } else if (paddleYCenter > ball.positionY+PADDLE_CPU_RESPONSE_TIME &&
            paddleYCenter > this.initialPositionY-this.rangeMovement){
                this.positionY -= PADDLE_CPU_AGILITY; // Moving up
            }
        }

        if (this.paddles && this.name.indexOf(CPU_PLAYER) !== -1){
            this.paddles.forEach(function(item){
                item = item.addCPUMovement(canvas);
            });      
        }
    };

    this.addPaddleMovement = function(cursorPosition){ //move to team
        if (this.name.indexOf(CPU_PLAYER) === -1){
            if (this.paddles){
                this.paddles.forEach(function(item) {
                    item.addPaddleMovement(cursorPosition);
                    if (cursorPosition.y > item.initialPositionY+item.rangeMovement){
                        item.positionY = item.initialPositionY+item.rangeMovement;
                    } else if (cursorPosition.y < item.initialPositionY-item.rangeMovement){
                        item.positionY = item.initialPositionY-item.rangeMovement;
                    } else{
                        item.positionY = cursorPosition.y;
                    }
                });
            }
        }
}    
}