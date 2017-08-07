function CanvasController(view){
    if (!view){
        view = new View().getView("canvas");
    }

    var canvasService = new CanvasMatchService();
    var mediaService = new MediaService();

    this.canvas = function(request){
    };
    this.loadCanvasFootball = function(request){
        var canvas = new Canvas(view);
        mediaService.loadCanvasMedia(canvas);
        return canvasService.loadCanvasMatch(canvas);
    };
    this.runCanvasFootball = function(request){
        canvasService.runCanvasFootball(request);
    };
    this.releaseBall = function(event,canvas){
        canvasService.releaseBall(canvas);
    };
    this.startMatch = function(event,canvas){
        return canvasService.startMatchPeriod(canvas);
    };
    this.movePaddles = function(event,canvas){
        var cursorPosition = 
            {x: event.clientX,
            y: event.clientY};
        canvasService.movePaddles(cursorPosition,canvas);
    };
}