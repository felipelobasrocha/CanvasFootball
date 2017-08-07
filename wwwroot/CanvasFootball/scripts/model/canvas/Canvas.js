function Canvas(canvas){
    this.htmlCanvas = null;
    this.context = null;
    this.data = new Dictionary();
    this.sounds = new Dictionary();

    if (canvas){
        this.htmlCanvas = canvas;
        this.context = canvas.getContext('2d');
    }

    this.setAudio = function(mediaAudio){
        this.sounds.add(mediaAudio);
    };
    this.setData = function(items){
        this.data.addRange(items);
    }    
    this.drawText = function(text,posX,posY){
        this.context.font=CANVAS_FONT_FAMILY;
        this.context.fillStyle = CANVAS_FONT_COLOR;
        this.context.fillText(text,posX,posY);
    };
    this.drawStrokeCircle = function(centerX,centerY,radius,sAngle,eAngle,firstHalfSide,drawColor){
        var field = this.data.hash('field').item;
        this.context.lineWidth = field.lineFieldThickness;
        this.context.strokeStyle=drawColor;
        this.context.beginPath();
        this.context.arc(centerX,centerY,radius,sAngle,eAngle,true);
        this.context.stroke();
    };
    this.drawFilledCircle = function(centerX,centerY,radius,drawColor){
        this.context.fillStyle = drawColor;
        this.context.beginPath();
        this.context.arc(centerX,centerY,radius,0,Math.PI*2,true);
        this.context.fill();
    };
    this.drawStrokeRect = function(color){    
        this.context.strokeStyle = color;
        this.context.strokeRect(10, 10, 280, 130);    
    };
    this.drawFilledRect = function(leftX,topY,width,height,drawColor){
        this.context.fillStyle = drawColor;
        this.context.fillRect(leftX,topY,width,height);
    };
}