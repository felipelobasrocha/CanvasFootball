function BallTouch(){

    var setBallSpeedX = function(paddle,canvas){
        var ball = canvas.data.hash('ball').item;
        var speedAdjustment = ball.increaseBallSpeed();
        ball.speedX = -(ball.speedX + speedAdjustment);

        moveTheBallForward(paddle,canvas);
    };

    var moveTheBallForward = function(paddle,canvas){
        var ball = canvas.data.hash('ball').item;
        if (ball.positionX < (canvas.htmlCanvas.width/2)){
            if (ball.speedX < 0){
                if (paddle.depth < 2){
                    ball.speedX = -(ball.speedX);
                }
            }
        }else{
            if (ball.speedX > 0){
                if (paddle.depth < 2){
                    ball.speedX = -(ball.speedX);
                }
            }
        }
    };
    var setBallSpeedY = function(paddle,canvas){
        var ball = canvas.data.hash('ball').item;

        // Moving Up or Down
        var randomBallDirection = 
            (Math.floor(Math.random() * (10 - 0) + 0) % 2 != 0 
            ? -config.ballHitAngle : config.ballHitAngle);

        // Controlling the ball depending the paddle hit angle - Y axis
        var deltaY = ball.positionY - (paddle.positionY+PADDLE_HEIGHT);
        ball.speedY = deltaY * randomBallDirection;
    }   
    var ballTouchesPaddle = function(paddle,canvas){
        setBallSpeedX(paddle,canvas);
        setBallSpeedY(paddle,canvas);

        return true;
    };
    var isGoalArea = function(paddle,canvas){
        var ball = canvas.data.hash('ball').item;
        var field = canvas.data.hash('field').item;
         
        if (ball.positionY > (canvas.htmlCanvas.height/2)-GOAL_SIZE &&
            ball.positionY < (canvas.htmlCanvas.height/2)+GOAL_SIZE){
            canvas.sounds.hash('goal').playSound(GOAL_SOUND_TIME); //use constant
            paddle.score++; // GOAL GOAL GOAL
            ball.restartBall();
        } else{
            ball.speedX = -ball.speedX;
        }

        return paddle.score;
    };
    var ballTouchesFieldLimit = function(paddlesTeams,mirror,canvas){
        var ball = canvas.data.hash('ball').item;
        var field = canvas.data.hash('field').item;

        if (mirror){
            if (ball.positionX > canvas.htmlCanvas.width-(field.lineFieldThickness)){
                // Field - Right Goal/End Line Interaction
                paddlesTeams[0].score = 
                    isGoalArea(paddlesTeams[0],canvas);
            }                
        }else{
            if (ball.positionX < (field.lineFieldThickness)){
                // Field - Left Goal/End Line Interaction
                paddlesTeams[1].score = 
                    isGoalArea(paddlesTeams[1],canvas);
            }
        }
    };
    this.hitTheBall = function(canvas){
        var ball = canvas.data.hash('ball').item;
        var paddlesTeams = canvas.data.hash('teams').item;
        var field = canvas.data.hash('field').item;
        var self = this;

        // Paddles or Field interaction
        if (ball.positionY < (field.lineFieldThickness*3) || 
                ball.positionY > canvas.htmlCanvas.height-(field.lineFieldThickness*3)){
            // Field - Side Line Interaction
            ball.speedY = -ball.speedY;
        }else{
            paddlesTeams.forEach(function(paddle,i){
                var mirror = (i+1) % 2 == 0;
                self.ballBouncesPaddle(paddle,mirror,canvas);
                ballTouchesFieldLimit(paddlesTeams,mirror,canvas);
            });
        }        
    };     
    this.ballBouncesPaddle = function(paddle,mirror,canvas){
        var ball = canvas.data.hash('ball').item;

        var positionX1 = mirror ? paddle.positionX-PADDLE_THICKNESS : paddle.positionX;
        var positionX2 = mirror ? paddle.positionX : paddle.positionX+PADDLE_THICKNESS;
        var positionY1 = paddle.positionY;
        var positionY2 = paddle.positionY+PADDLE_HEIGHT;

        var self = this;
        if (ball.positionX > positionX1 && ball.positionX < positionX2){
            if (ball.positionY > positionY1 && ball.positionY < positionY2){
                return ballTouchesPaddle(paddle,canvas);
            }
        } else if (paddle.paddles){
            paddle.paddles.forEach(function(item){
                positionX1 = mirror ? item.positionX-PADDLE_THICKNESS : item.positionX;
                positionX2 = mirror ? item.positionX : item.positionX+PADDLE_THICKNESS;
                positionY1 = item.positionY;
                positionY2 = item.positionY+PADDLE_HEIGHT;                            
                if (ball.positionX > positionX1 && ball.positionX < positionX2){
                    if (ball.positionY > positionY1 && ball.positionY < positionY2){
                        return ballTouchesPaddle(item,canvas);
                    }
                } else {
                    return self.ballBouncesPaddle(item,mirror,canvas);
                }
            });
        } else{
            return false;
        }
    };      
}