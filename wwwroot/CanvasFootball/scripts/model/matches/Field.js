function Field(){
    this.lineFieldThickness = 7;


    var drawEndFieldLine = function(field,mirror,canvas){
        var goalLocation = (canvas.htmlCanvas.height/2)-GOAL_SIZE;
        var posX = mirror ? canvas.htmlCanvas.width-field.lineFieldThickness : 0;
        var posY = mirror ? canvas.htmlCanvas.height-field.lineFieldThickness : 0;

        canvas.drawFilledRect(
            posX,
            0,
            field.lineFieldThickness,
            goalLocation,
            LINEFIELD_COLOR);
        canvas.drawFilledRect(
            posX,
            canvas.htmlCanvas.height,
            field.lineFieldThickness,
            -(goalLocation),
            LINEFIELD_COLOR);
    };
    var drawSideFieldLine = function(field,mirror,canvas){
        var posY = mirror ? canvas.htmlCanvas.height-field.lineFieldThickness : 0;

        canvas.drawFilledRect(
            0,
            posY,
            canvas.htmlCanvas.width,
            field.lineFieldThickness,
            LINEFIELD_COLOR);
    };
    var drawPenaltyCircle = function(field,mirror,canvas){
        var centerX = mirror ? 
                        (canvas.htmlCanvas.width - canvas.htmlCanvas.width/11) : 
                        canvas.htmlCanvas.width/11;

        canvas.drawFilledCircle(
            centerX,
            canvas.htmlCanvas.height/2,
            INITIALCIRCLE_RADIUS_SIZE,
            LINEFIELD_COLOR);
    };
    var drawGoalArc = function(field,mirror,canvas){
        var centerX = mirror ? 
                        (canvas.htmlCanvas.width - canvas.htmlCanvas.width/8) : 
                        canvas.htmlCanvas.width/8;
        var sAngle = mirror ? Math.PI*1.5 : Math.PI*0.5;
        var eAngle = mirror ? Math.PI*0.5 : Math.PI*1.5;

        canvas.drawStrokeCircle(
            centerX,
            canvas.htmlCanvas.height/2,
            CENTERCIRCLE_RADIUS_SIZE,
            sAngle,
            eAngle,
            false,
            LINEFIELD_COLOR);
    };
    var drawGoalBox = function(field,goalLocation,multiple,mirror,canvas){
        var golBoxSideLine = GOALBOX_SIZE_SIDE*multiple;
        goalLocation *= multiple;

        var sideX = mirror ? canvas.htmlCanvas.width : 0;
        var frontX = mirror ? canvas.htmlCanvas.width-golBoxSideLine : golBoxSideLine-field.lineFieldThickness;
        var width = mirror ? -golBoxSideLine : golBoxSideLine;

        canvas.drawFilledRect(
                    sideX,
                    goalLocation,
                    width,
                    field.lineFieldThickness,
                    LINEFIELD_COLOR); // Top Line
        canvas.drawFilledRect(
                    sideX,
                    canvas.htmlCanvas.height-goalLocation,
                    width,
                    field.lineFieldThickness,
                    LINEFIELD_COLOR); // Bottom Line
        canvas.drawFilledRect(
                    frontX,
                    goalLocation,
                    field.lineFieldThickness,
                    (canvas.htmlCanvas.height-goalLocation)-goalLocation+field.lineFieldThickness,
                    LINEFIELD_COLOR); // Front Line
    };
    var drawGoalFieldLine = function(field,mirror,canvas){
        var sideX = mirror ? canvas.htmlCanvas.width-GOALFIELD_LINE_THICKNESS : 0;
        for(var i=0;i<canvas.htmlCanvas.height;i+=GOALFIELD_LINE_DISTANCEBETWEEN){
            canvas.drawFilledRect(
                sideX,
                i,
                GOALFIELD_LINE_THICKNESS,
                GOALFIELD_LINE_SIZE,
                LINEFIELD_COLOR);
        }
    };    

    this.drawFieldGrass = function(canvas){
        canvas.drawFilledRect(0,0,canvas.htmlCanvas.width,canvas.htmlCanvas.height,FIELD_COLOR);
    };
    this.drawGoalFieldLine = function(canvas){
        this.drawMirrorField(drawGoalFieldLine,canvas);
    };
    this.drawPenaltyBox = function(canvas){
        for(var i=0;i<PLAYERS_QTY;i++) {
            var mirror = (i+1) % 2 == 0;
            drawGoalBox(this,(canvas.htmlCanvas.height/2)-GOAL_SIZE,2,mirror,canvas);
        }
    };
    this.drawGoalBox = function(canvas){
        for(var i=0;i<PLAYERS_QTY;i++) {
            var mirror = (i+1) % 2 == 0;
            drawGoalBox(this,(canvas.htmlCanvas.height/2)-GOAL_SIZE,1,mirror,canvas);
        }
    };
    this.drawGoalArc = function(canvas){
        this.drawMirrorField(drawGoalArc,canvas);
    };
    this.drawPenaltyCircle = function(canvas){
        this.drawMirrorField(drawPenaltyCircle,canvas);
    };
    this.drawSideFieldLine = function(canvas){
        this.drawMirrorField(drawSideFieldLine,canvas);
    };
    this.drawEndFieldLine = function(canvas){
        this.drawMirrorField(drawEndFieldLine,canvas);
    };
    this.drawHalfWayFieldLine = function(canvas){
        canvas.drawFilledRect(
            (canvas.htmlCanvas.width-this.lineFieldThickness)/2,
            this.lineFieldThickness,
            this.lineFieldThickness,
            canvas.htmlCanvas.height,
            LINEFIELD_COLOR);
    };
    this.drawCenterCircle = function(canvas){
        canvas.drawStrokeCircle(
            canvas.htmlCanvas.width/2,
            canvas.htmlCanvas.height/2,
            CENTERCIRCLE_RADIUS_SIZE,
            0,
            Math.PI*2, // two for the entire circle
            true, // if just one half => true is for first half
            LINEFIELD_COLOR);
    };
    this.drawInitialCircle = function(canvas){
        canvas.drawFilledCircle(
            canvas.htmlCanvas.width/2,
            canvas.htmlCanvas.height/2,
            INITIALCIRCLE_RADIUS_SIZE,
            LINEFIELD_COLOR);
    };
    this.drawMirrorField = function(callback,canvas){
        for(var i=0;i<PLAYERS_QTY;i++) {
            var mirror = (i+1) % 2 == 0;
            callback(this,mirror,canvas);
        }
    };
}