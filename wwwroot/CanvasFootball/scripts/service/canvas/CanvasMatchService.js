function CanvasMatchService(){
    var canvasDrawing = new CanvasDrawing();
    var canvasAction = new CanvasAction();

    this.loadCanvasMatch = function(canvas){
        var canvasData = [];
        var field = startField(canvas);
        canvasData.push({key: 'field', item: field});        
        canvas.setData(canvasData);        
        var ball = startBall(canvas);
        canvasData.push({key: 'ball', item: ball});
        canvasData.push({key: 'ballTouch', item: new BallTouch()});
        var timer = startTimer();
        canvasData.push({key: 'timer', item: timer});
        var paddlesTeams = startTeams(canvas);
        canvasData.push({key: 'teams', item: paddlesTeams});

        canvasData.splice(field,1); //remake
        canvas.setData(canvasData);

        return canvas;
    };    
    this.runCanvasFootball = function(request){
        var canvas = request.canvas;
        
        var run = runTimer(request.interval,canvas);
        if (run){
            drawFootballGame(canvas);
            moveFootballGame(canvas);
        } else{
            showMatchResultInfo(canvas);
        }        
    };
    this.releaseBall = function(canvas){
        canvas.data.hash('ball').item.releaseBall(canvas);
    }
    this.startMatchPeriod = function(canvas){
        var timer = canvas.data.hash('timer').item;
        return timer.checkGamePeriod(
                    canvas,
                    restartMatch,
                    restartSecondHalf
                    );
    };    
    this.movePaddles = function(cursorPosition,canvas){
        canvasAction.movePaddlesPosition(null,cursorPosition,canvas);
    };    
    var drawFootballGame = function(canvas){
        var paddlesTeams = canvas.data.hash('teams').item;
        canvasDrawing.drawFieldLines(canvas);
        canvasDrawing.drawTimer(canvas);
        canvasDrawing.drawBall(canvas);
        canvasDrawing.drawPlayersScore(canvas);
        canvasDrawing.drawGamePeriod(canvas);
        paddlesTeams.forEach(function(paddle){
            canvasDrawing.drawPaddles(paddle,canvas);
        });
    };
    var moveFootballGame = function(canvas){
        var paddlesTeams = canvas.data.hash('teams').item;
        var ball = canvas.data.hash('ball').item;

        canvasAction.moveBallPosition(ball);
        canvasAction.movePaddlesPosition(ball,null,canvas);

        canvasAction.hitTheBall(canvas,triggerScoreChanges);
    };
    var showMatchResultInfo = function(canvas){
        var canvasDrawing = new CanvasDrawing();
        canvasDrawing.drawMatchResultInfo(canvas);
    };
    var runTimer = function(interval,canvas){
        var timer = canvas.data.hash('timer').item;
        timer.runTimer(interval,triggerTimeChanges);
        var run = timer.timerIsRunning();
        if (!run){
            return timer.checkGamePeriod(
                        canvas,
                        getVictorySound,
                        getRefereeSound
                    );
        }
        
        return true;
    };
    var restartMatch = function(canvas){
        canvas.data.hash('ball').item = startBall(canvas);
        var timer = startTimer();
        canvas.data.hash('timer').item = timer;

        var paddlesTeams = canvas.data.hash('teams').item;
        paddlesTeams.forEach(function(paddle) {
            paddle.score = 0;
        });
        triggerScoreChanges(0,0,1);

        return true;        
    };
    var restartSecondHalf = function(canvas){
        canvas.data.hash('ball').item = startBall(canvas);

        var timer = startTimer();
        canvas.data.hash('timer').item = timer;
        return timer.startSecondHalf();
    };
    var startField = function(canvas){
        var field = new Field();
        return field;
    };        
    var startBall = function(canvas){
        var ball = new Ball();
        ball.startBall(canvas);
        return ball;
    };
    var startTimer = function(){
        var timer = new Timer(new Date().getTime() + config.gamePeriodTime);
        return timer;
    };
    var startTeams = function(canvas){
        var team = new Team();
        var paddlesTeams = [];
        for(var i=0;i < PLAYERS_QTY;i++){
            var mirror = (i+1) % 2 == 0;
            paddlesTeams.push(
                team.addTeam('paddle'+(i+1),
                    eval('PLAYER'+(i+1).toString()+'_COLOR'),
                    mirror,canvas) // TODO - change the name for PaddleTeam or something like that and create property paddle inside team
                );
        }
        return paddlesTeams;
    };
    var triggerTimeChanges = function(timer){
        var stopWatch = 
        {timer: { stopWatch:timer.stopWatch, description:timer.gamePeriodInfo() }};
        var event = new CustomEvent('stopWatchKeeperChange', {detail:stopWatch});
        var element = document.documentElement;
        element.dispatchEvent(event);
    };
    var triggerScoreChanges = function(score1,score2,prevScorer){
        var scorer = score1+score2;
        if (prevScorer != scorer){
            var score = {score: { score1:score1, score2:score2 }};
            var event = new CustomEvent('scoreKeeperChange', {detail:score});
            var element = document.documentElement;
            element.dispatchEvent(event);
        }
    };
    var getVictorySound = function(canvas){
        canvas.sounds.hash('goal').playSound(GOAL_SOUND_TIME_VICTORY); //use constant
        return false;
    };
    var getRefereeSound = function(canvas){
        canvas.sounds.hash('referee').playSound(REFEREE_WHISTLE_SOUND_TIME); //use constant
        return false;
    };   
}