function ScoreBoardController(view){
    if (!view){
        view = new View().getView("scoreBoard");
    }

    var leftScoreBoard = view[0]; // remake
    var rightScoreBoard = view[1];
    var mediaService = new MediaService()

    this.scoreBoard = function(){
        mediaService.loadImages(); 
    };
    this.updateScore = function(score){
        leftScoreBoard.scorePlayer.innerHTML = score.score1;
        rightScoreBoard.scorePlayer.innerHTML = score.score2;
    };
    this.updateStopWatch = function(timer){
        leftScoreBoard.timerDescription.innerHTML = timer.stopWatch;
        rightScoreBoard.timerDescription.innerHTML = timer.description;
    };    
}

function drawScoreBoard(canvasCtx,cv,color) {  // Score Board Canvas  
    canvasCtx.clearRect(50, 50, cv.width, cv.height);
    canvasCtx.setLineDash([15, 10]);
    canvasCtx.lineDashOffset = -offset;
    canvasCtx.lineWidth = SCORE_BOARD_THICKNESS;
    cv.drawStrokeRect(color);
}

function drawTimer(timer){
    // Display the result in the element with id="timer"
    document.getElementById("timer").innerHTML = time;
    document.getElementById('timerDescription').innerHTML = textShowGameHalf;

    if (timer.timeToFinish < 0) {        
        gamePeriod--;
        if (gamePeriod < 0){
            showingWinScreen = true;
            document.getElementById("timer").innerHTML = "Time Up";
            crowdScreamsGoal(GOAL_SOUND_TIME_VICTORY);
        }else{
            document.getElementById("timer").innerHTML = "Half Time";
            refereeWhistles(REFEREE_WHISTLE_SOUND_TIME);
        }
    }     
}

function loadScoreBoard() {
    offset++;
    if (offset > 16) {
        offset = 0;
    }

    scoreCanvas1 = document.getElementById('player1Canvas');
    scoreCanvas1Context = scoreCanvas1.getContext('2d');

    scoreCanvas2 = document.getElementById('player2Canvas');
    scoreCanvas2Context = scoreCanvas2.getContext('2d');

    drawScoreBoard(scoreCanvas1Context,scoreCanvas1,PLAYER1_COLOR);
    drawScoreBoard(scoreCanvas2Context,scoreCanvas2,PLAYER2_COLOR);
    setTimeout(loadScoreBoard, 20);
}