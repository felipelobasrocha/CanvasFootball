function ScoreBoardController(view){
    if (!view){
        view = new View().getView("scoreBoard");
    }

    var mediaService = new MediaService();

    var scoreBoard = [];
    view.forEach(function(item) {
        scoreBoard.push(item);
    });

    this.scoreBoard = function(){
        mediaService.loadImages(); 
    };
    this.updateScore = function(score){
        scoreBoard.forEach(function(item,i) {
            item.scorePlayer.innerHTML = eval("score.score"+(i+1).toString());
        });
    };
    this.updateStopWatch = function(timer){
        var leftScoreBoard = scoreBoard[0];
        var rightScoreBoard = scoreBoard[1];

        if (timer.stopWatch == "-1m-1s"){
            leftScoreBoard.timerDescription.innerHTML = "Time Up";
        }else{
            leftScoreBoard.timerDescription.innerHTML = timer.stopWatch;
            rightScoreBoard.timerDescription.innerHTML = timer.description;
        }
    };    
}

// Build Animation
// function drawScoreBoard(canvasCtx,cv,color) {  // Score Board Canvas  
//     canvasCtx.clearRect(50, 50, cv.width, cv.height);
//     canvasCtx.setLineDash([15, 10]);
//     canvasCtx.lineDashOffset = -offset;
//     canvasCtx.lineWidth = SCORE_BOARD_THICKNESS;
//     cv.drawStrokeRect(color);
// }

// function loadScoreBoard() {
//     offset++;
//     if (offset > 16) {
//         offset = 0;
//     }

//     scoreCanvas1 = document.getElementById('player1Canvas');
//     scoreCanvas1Context = scoreCanvas1.getContext('2d');

//     scoreCanvas2 = document.getElementById('player2Canvas');
//     scoreCanvas2Context = scoreCanvas2.getContext('2d');

//     drawScoreBoard(scoreCanvas1Context,scoreCanvas1,PLAYER1_COLOR);
//     drawScoreBoard(scoreCanvas2Context,scoreCanvas2,PLAYER2_COLOR);
//     setTimeout(loadScoreBoard, 20);
// }