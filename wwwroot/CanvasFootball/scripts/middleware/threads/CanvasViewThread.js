CanvasViewThread = function(){
    // Registering Model
    var canvas = new Canvas();

    // Registering View
    var view = new View();
    canvasView = view.getView("canvas");

    // Registering Controller
    var canvasController = new CanvasController(canvasView);

    // Registering Controller Actions
    var actionStart = function(){
        var canvasRequest = { };
        canvas = canvasController.loadCanvasFootball(canvasRequest);
        actionRun();
    };
    var actionRun = function(){
        var runFootball = setInterval(
            function(){
                var canvasRequest = { canvas: canvas, interval: runFootball };
                canvasController.runCanvasFootball(canvasRequest);
            }
            , 1000/config.framesPerSecond
        );
    };
    var actionMouseMove = function(e){
        canvasController.movePaddles(e,canvas);
    };
    var actionTouchMove = function(e){
        canvasController.movePaddles(e.touches[0],canvas);
    };
    var actionMouseClick = function(e){
        handleClick(e,canvas);
    };
    var actionTouchClick = function(e){
        handleClick(e,canvas);
    };
    var actionMouseWheel = function(e){
        canvasController.releaseBall(e,canvas);
    };    
    var actionCanvas = function(){
        var canvasRequest = { };
        canvasController.canvas(canvasRequest);
    };
    var handleClick = function(e){
        var restart = canvasController.startMatch(e,canvas);
        if (restart){
            actionRun();
        }
    }

    // Registering Routers
    // Default
    actionCanvas();
    // Load
    actionStart();
    // Click or Touch
    canvasView.addEventListener(
        'mousedown',actionMouseClick);
    canvasView.addEventListener(
        'touchend',actionTouchClick);
    // Move
    canvasView.addEventListener(
        'mousemove',actionMouseMove);
    canvasView.addEventListener(
        'touchmove',actionTouchMove);
    // Wheel
    canvasView.addEventListener(
        'wheel',actionMouseWheel);        
};
