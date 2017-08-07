function View(){
    var views = 
        {
            canvas: document.getElementById('gameCanvas'),
            scoreBoard: 
            [
                    {
                        playerFlag: document.getElementById('playerOneFlag'),
                        scorePlayer: document.getElementById('scorePlayer1'),
                        playerCanvas: document.getElementById('player1Canvas'),
                        timerDescription: document.getElementById('timerDescription')
                    },
                    {
                        playerFlag: document.getElementById('playerTwoFlag'),
                        scorePlayer: document.getElementById('scorePlayer2'),
                        playerCanvas: document.getElementById('player2Canvas'),
                        timerDescription: document.getElementById('timer')
                    }            
            ]            
        };    
    this.getView = function(view){
        return views[view];
    };
};