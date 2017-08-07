function CanvasDrawing(){

    this.drawFieldLines = function (canvas){
        var field = canvas.data.hash('field').item;        
        field.drawFieldGrass(canvas);
        field.drawGoalFieldLine(canvas);
        field.drawGoalBox(canvas);
        field.drawPenaltyBox(canvas);
        field.drawGoalArc(canvas);
        field.drawPenaltyCircle(canvas);    
        field.drawEndFieldLine(canvas);
        field.drawSideFieldLine(canvas);
        field.drawHalfWayFieldLine(canvas);
        field.drawCenterCircle(canvas);
        field.drawInitialCircle(canvas);

        return field;
    };    
    this.drawMatchResultInfo = function(canvas){ //move to matchservice
        var timer = canvas.data.hash('timer').item;
        var field = canvas.data.hash('field').item;
        field.drawFieldGrass(canvas);
        timer.checkGamePeriod(canvas,drawWinnerBoard,draw2ndHalfMessage);
    };
    this.drawTimer = function(canvas){
        var timer = canvas.data.hash('timer').item;
        var field = canvas.data.hash('field').item;
        canvas.drawText(
            timer.stopWatch,
            (canvas.htmlCanvas.width-field.lineFieldThickness-TIMER_POSITION_X)/2,
            SCORE_AND_TIME_POSITION_Y);
    };
    this.drawPaddles = function(paddle,canvas){
        var self = this;
        canvas.drawFilledRect(
            paddle.positionX,
            paddle.positionY,
            PADDLE_THICKNESS,
            PADDLE_HEIGHT,
            paddle.color);
        
        if (paddle.paddles){
            paddle.paddles.forEach(function(item) {
                self.drawPaddles(item,canvas);
            });
        }
    };
    this.drawBall = function(canvas){
        var ball = canvas.data.hash('ball').item;
        canvas.drawFilledCircle(ball.positionX,ball.positionY,BALL_RADIUS_SIZE,BALL_COLOR);
        // canvas.context.strokeStyle = BALL_SECOND_COLOR;
        // canvas.context.stroke();    
    };
    this.drawPlayersScore = function(canvas){
        var paddlesTeams = canvas.data.hash('teams').item;
        var field = canvas.data.hash('field').item;

        canvas.drawText(paddlesTeams[0].score,SCORE_AND_TIME_POSITION_X,SCORE_AND_TIME_POSITION_Y);        
        canvas.drawText(
            paddlesTeams[1].score,
            canvas.htmlCanvas.width-field.lineFieldThickness-SCORE_AND_TIME_POSITION_X,
            SCORE_AND_TIME_POSITION_Y);    
    };
    this.drawGamePeriod = function(canvas){
        var timer = canvas.data.hash('timer').item;        
        canvas.drawText(timer.gamePeriodInfo(),330,590);
    };
    var draw2ndHalfMessage = function(canvas){
        canvas.drawText(MESSAGE_TO_START_2NDHALF,FINAL_MESSAGE_POSITION_X,FINAL_MESSAGE_POSITION_Y);
    };
    var drawWinnerBoard = function(canvas){ //SRP
        var paddlesTeams = canvas.data.hash('teams').item;

        var player1Score = paddlesTeams[0].score;
        var player2Score = paddlesTeams[1].score;

        if (player1Score > player2Score){
            canvas.drawText(LEFT_PLAYER_WON,FINAL_MESSAGE_POSITION_X,SCORE_AND_TIME_POSITION_Y);
        } else if (player2Score > player1Score){
            canvas.drawText(RIGHT_PLAYER_WON,FINAL_MESSAGE_POSITION_X,SCORE_AND_TIME_POSITION_Y);
        } else {
            canvas.drawText(TIED_GAME,FINAL_MESSAGE_POSITION_X,SCORE_AND_TIME_POSITION_Y);
        }
        canvas.drawText(MESSAGE_TO_RESTART,FINAL_MESSAGE_POSITION_X,FINAL_MESSAGE_POSITION_Y);        
    };    
}

