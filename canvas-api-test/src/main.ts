
window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context = canvas.getContext("2d");
    //   context.fillStyle = "#FF0000";
    // context.fillRect(0, 0, 150, 75);

    var stage: DisplayObjectContainer = new DisplayObjectContainer(0, 0);
    setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context);
    }, 30);
   
    context.fillStyle = "#FF0000";
    var rect: Rect = new Rect(10, 10, 50, 50);


    stage.addChild(rect);

}


interface Drawable {
    draw(context2D: CanvasRenderingContext2D);
}



class DisplayObject implements Drawable {
    x: number = 0; y: number = 0;
    context2D: CanvasRenderingContext2D;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    draw(context2D: CanvasRenderingContext2D) {

    }
}



class DisplayObjectContainer extends DisplayObject implements Drawable {
    array: Drawable[] = [];

    draw(context2D: CanvasRenderingContext2D) {
        for (let drawable of this.array) {
            drawable.draw(this.context2D);
        }
    }
    addChild(child: Drawable) {
        this.array.push(child);
    }
}


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


