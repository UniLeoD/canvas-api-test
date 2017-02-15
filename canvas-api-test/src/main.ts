
window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context = canvas.getContext("2d");
    //   context.fillStyle = "#FF0000";
    // context.fillRect(0, 0, 150, 75);

    var stage: DisplayObjectContainer = new DisplayObjectContainer();
    setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context);
    }, 30);
   
    context.fillStyle = "#FF0000";
  //  var rect: Rect = new Rect(10, 10, 50, 50);


    //stage.addChild(rect);


var textField1 = new TextField();
textField1.x=10;
textField1.y=10;
textField1.text="Hello";

stage.addChild(textField1);
}


interface Drawable {
    draw(context2D: CanvasRenderingContext2D);
}



class DisplayObject implements Drawable {
    x: number = 0; y: number = 0;
    context2D: CanvasRenderingContext2D;

    constructor() {
    
    }
    draw(context2D: CanvasRenderingContext2D) {

    }
}



class DisplayObjectContainer extends DisplayObject implements Drawable {
    array: Drawable[] = [];

    draw(context2D: CanvasRenderingContext2D) {
        for (let drawable of this.array) {
            drawable.draw(context2D);
        }
    }
    addChild(child: Drawable) {
        this.array.push(child);
    }
}


class TextField extends DisplayObjectContainer{
    text: string = "";
    draw(context:CanvasRenderingContext2D){
        
       
        context.fillText(this.text,this.x,this.y,100);
    }
}

/*
class Rect extends DisplayObject {
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y);
        this.width = width;
        this.height = height;
    }
    draw() {
        this.context2D.fillRect(this.x, this.y, this.width, this.height);
    }
}
*/


