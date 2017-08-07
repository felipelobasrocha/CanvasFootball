ScoreBoardViewThread = function(){
    // Registering View
    var view = new View();
    scoreBoardView = view.getView("scoreBoard");

    // Registering Controller
    var scoreBoardController = new ScoreBoardController(scoreBoardView);

    // Registering Controller Actions
    var actionScoreBoard = function(){
        var scoreBoardRequest = { };
        scoreBoardController.scoreBoard(scoreBoardRequest);
    };
    var actionUpdateScoreKeeper = function(e){
        scoreBoardController.updateScore(e.detail.score);
    };
    var actionUpdateStopWatchKeeper = function(e){
        scoreBoardController.updateStopWatch(e.detail.timer);
    };    

    // Router
    // Default
    actionScoreBoard();
    // Score Change
    var element = document.documentElement;
    element.addEventListener(
        'scoreKeeperChange', function (e) { actionUpdateScoreKeeper(e); });
    element.addEventListener(
        'stopWatchKeeperChange', function (e) { actionUpdateStopWatchKeeper(e); });
}