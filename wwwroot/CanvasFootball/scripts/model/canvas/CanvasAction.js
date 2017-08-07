function CanvasAction(){
    this.moveBallPosition = function(ball){
        ball.moveBall();
    };
    this.movePaddlesPosition = function(ball,cursorPosition,canvas){
        var paddlesTeams = canvas.data.hash('teams').item;        
        paddlesTeams.forEach(function(paddle,i){
            if (cursorPosition){
                paddle.addPaddleMovement(cursorPosition); // TODO - use wrapper team
            } else if (ball){
                paddle.addCPUMovement(canvas); // TODO - use wrapper team
            }
        });
    };    
    this.hitTheBall = function(canvas,callback){
        var paddlesTeams = canvas.data.hash('teams').item;
        var ball = canvas.data.hash('ball').item;
        var ballTouch = canvas.data.hash('ballTouch').item;
        var prevScorer = paddlesTeams.reduce((sum,item) => sum + item.score, 0);

        ballTouch.hitTheBall(canvas);
        callback(paddlesTeams[0].score,paddlesTeams[1].score,prevScorer);
    };
;
}