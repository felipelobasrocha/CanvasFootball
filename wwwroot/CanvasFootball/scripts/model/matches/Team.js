function Team(){
    this.addTeam = function (name,color,mirror,canvas){
        var field = canvas.data.hash('field').item;

        var posY = FIRSTLINE_PADDLE_POSITION_Y;
        var lastPaddle = 0;
        var startPositionX = mirror ? canvas.htmlCanvas.width-field.lineFieldThickness : 0;
        var rangeMovementPerSquadLine = PADDLE_CPU_RANGE;
        var squadLinesX = SQUAD_PLAYERS_QTY > 4 ? 3 : 2;
        var squadLinesY = 0;
        var depth = 0; 

        if (SQUAD_PLAYERS_QTY % squadLinesX == 0){
            squadLinesY = SQUAD_PLAYERS_QTY / squadLinesX;
        } else{
            squadLinesY = Math.round(SQUAD_PLAYERS_QTY / squadLinesX);
        }// move to another method   

        var paddle = new Paddle(
            startPositionX + (mirror ? -GOALLINE_PADDLE_POSITION_X: GOALLINE_PADDLE_POSITION_X), 
            (canvas.htmlCanvas.height/2), 
            name,
            rangeMovementPerSquadLine,
            color,
            depth
        );

        for(var i=0;i<squadLinesY;i++){
            var firstLineX = mirror ? 
            startPositionX-(GOALLINE_PADDLE_POSITION_X+FIRSTLINE_PADDLE_POSITIONLINE_X) :
            GOALLINE_PADDLE_POSITION_X+FIRSTLINE_PADDLE_POSITIONLINE_X;
            lastPaddle = addTeamElements(
                            paddle,
                            firstLineX,
                            (canvas.htmlCanvas.height/2)+posY,
                            squadLinesX,
                            squadLinesY,
                            name,
                            lastPaddle,
                            i+1,
                            rangeMovementPerSquadLine-25,
                            color,
                            mirror,
                            depth+1,
                            canvas);
            posY += SECONDLINE_PADDLE_POSITION_Y;
        }

        return paddle;
    };
    var addTeamElements = function(
            paddleParent,
            posX,
            posY,
            squadLinesX,
            squadLinesY,
            rootName,
            name,
            currentLineY,
            rangeMovementPerSquadLine,
            color,
            mirror,
            depth,
            canvas){
        var field = canvas.data.hash('field').item;
        var lastPaddle=name+1;
        var paddle = new Paddle(posX,
                        posY,
                        (rootName+(lastPaddle).toString()),
                        rangeMovementPerSquadLine,
                        color,
                        depth);

        var startPositionX = mirror ? canvas.htmlCanvas.width-field.lineFieldThickness : posX;

        squadLinesX--;
        paddleParent.addItem(paddle);
        if (squadLinesX > 0){
            posY = posY + 
            (squadLinesY == currentLineY ? -LINES_PADDLE_POSITIONLINE_Y : LINES_PADDLE_POSITIONLINE_Y);

            var lineX = mirror ?
            posX-LINES_PADDLE_POSITIONLINE_X :
            posX+LINES_PADDLE_POSITIONLINE_X;
            lastPaddle = addTeamElements(
                            paddle,
                            lineX,
                            posY,
                            squadLinesX,
                            squadLinesY,
                            rootName,
                            lastPaddle,
                            currentLineY,
                            rangeMovementPerSquadLine-25,
                            color,
                            mirror,
                            depth+1,
                            canvas);
        }
        return lastPaddle;
    };    
}

    // this.addCPUMovement = function(paddle,ball,canvas){
    //     var paddleYCenter = paddle.positionY + (PADDLE_HEIGHT/2);
    //     if (ball.positionX > canvas.htmlCanvas.width/2 && paddle.name == 'paddle1'){
    //         paddle.positionY = (canvas.htmlCanvas.height-PADDLE_HEIGHT)/2;
    //     } else if (ball.positionX < canvas.htmlCanvas.width/2  && paddle.name == 'paddle2'){
    //         paddle.positionY = (canvas.htmlCanvas.height-PADDLE_HEIGHT)/2;
    //     }else{
    //         if(paddleYCenter < ball.positionY-PADDLE_CPU_RESPONSE_TIME &&
    //         paddleYCenter < paddle.initialPositionY+paddle.rangeMovement){
    //             paddle.positionY += PADDLE_CPU_AGILITY; // Moving down
    //         } else if (paddleYCenter > ball.positionY+PADDLE_CPU_RESPONSE_TIME &&
    //         paddleYCenter > paddle.initialPositionY-paddle.rangeMovement){
    //             paddle.positionY -= PADDLE_CPU_AGILITY; // Moving up
    //         }
    //     }

    //     if (paddle.paddles && paddle.name.indexOf(CPU_PLAYER) !== -1){
    //         paddle.paddles.forEach(function(item){
    //             item = item.addCPUMovement(paddle,ball,canvas);
    //         });      
    //     }
    // };