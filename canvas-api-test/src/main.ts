
window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context = canvas.getContext("2d");
    //   context.fillStyle = "#FF0000";
    // context.fillRect(0, 0, 150, 75);
    var stage: DisplayObjectContainer = new DisplayObjectContainer();

    setInterval(() => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        textField1.x++;
        TextField2.x++;
        stage.draw(context);
    }, 10);

    context.fillStyle = "#FF0000";

    var rect: Rect = new Rect();
    rect.x = 10;
    rect.y = 15;
    rect.width = 50;
    rect.height = 40;
    stage.addChild(rect);

    var bitmap = new Bitmap();
    bitmap.image.src = "egret.jpg";
    bitmap.x = 10;
    bitmap.y = 100;
    bitmap.rotation = -45;
    stage.addChild(bitmap);




    var textField1 = new TextField();
    textField1.x = 10;
    textField1.y = 10;
    textField1.text = "Hello";
    stage.addChild(textField1);

    var TextField2 = new TextField();
    TextField2.x = 10;
    TextField2.y = 10;
    TextField2.text = "                  World";
    stage.addChild(TextField2);

    //stage.alpha = 0.5;
    stage.draw(context);


    window.onmousedown = (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        let type = "mousedown";
        let target = stage.hitTest(x, y);
        let result = target;
        if (result) {
            while (result.parent) {
                let currentTarget = result.parent;
                let e = { type, target, currentTarget };
                result = result.parent;
            }
        }
        alert()
    }
}



interface Drawable {
    draw(context2D: CanvasRenderingContext2D);
}



class DisplayObject implements Drawable {
    x: number = 0;
    y: number = 0;
    scaleX: number = 1;
    scaleY: number = 1;
    rotation: number = 0;

    alpha: number = 1;
    globalAlpha: number = 1;

    globalMatrix: math.Matrix = new math.Matrix;
    localMatrix: math.Matrix = new math.Matrix;

    parent: DisplayObjectContainer;

    isMouseDown = false;
    touchListeners: TouchEventListener[] = [];

    draw(context2D: CanvasRenderingContext2D) {
        this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
        } else {
            this.globalAlpha = this.alpha;
            this.globalMatrix = this.localMatrix;
        }
        //aaaa
        context2D.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        context2D.globalAlpha = this.globalAlpha;
        this.render(context2D);
    }

    render(context2D: CanvasRenderingContext2D) {

    }
}

function addEventListener(type: TouchType, touchListener: Function, capture?: boolean, priority?: number) {
    var event = new TouchEventListener(type, touchListener, capture, priority);
    this.touchListeners.push(event);
}

function dispatchEvent(e: any) {
    console.log(e.type);
    if (e.type == "mousedown") {
        this.isMouseDown = true;
    } else if (e.type == "mouseup" && this.isMouseDown == true) {//other types unfinish
        for (let i = 0; i < this.touchListeners.length; i++) {
            if (this.touchListeners[i].type == TouchType.CLICK) {
                this.touchListeners[i].func();
            }
        }
        this.isMouseDown = false;
    } else if (e.type == "mousemove") {

    }
}



class DisplayObjectContainer extends DisplayObject implements Drawable {
    array: Drawable[] = [];

    render(context2D: CanvasRenderingContext2D) {
        for (let drawable of this.array) {
            drawable.draw(context2D);
        }
    }
    addChild(child: DisplayObject) {
        this.array.push(child);
        child.parent = this;
    }


    hitTest(x, y) {
        for (let i = this.array.length - 1; i >= 0; i--) {
            let child = this.array[i];
            let point = new math.Point(x, y);
            let invertChildLocalMatrix = math.invertMatrix(child.localMatrix);
            let pointBaseOnChild = math.pointAppendMatrix(point, invertChildLocalMatrix);
            let hitTestResult = child.hitTest(pointBaseOnChild.x, pointBaseOnChild.y);
            if (hitTestResult) {
                return hitTestResult;
            }
        }
        return null;
    }

}


class TextField extends DisplayObject {
    text: string = "";
    render(context2D: CanvasRenderingContext2D) {
        context2D.fillText(this.text, this.x, this.y);
    }
}


class Rect extends DisplayObject {
    width: number;
    height: number;


    render(context2D: CanvasRenderingContext2D) {
        context2D.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Bitmap extends DisplayObject {
    image = document.createElement("img");
    render(context2D: CanvasRenderingContext2D) {
        context2D.drawImage(this.image, this.x, this.y);
    }
}





enum TouchType {
    MOUSEDOWN,
    MOUSEUP,
    CLICK,
    MOUSEMOVE
}

class TouchEventListener {
    type: TouchType;
    func: Function;
    capture = false;
    priority = 0;

    constructor(type: TouchType, func: Function, capture?: boolean, priority?: number) {
        this.type = type;
        this.func = func;
        this.capture = capture || false;
        this.priority = priority || 0;
    }
}

class TouchEvents {
    x: number;
    y: number;
    type: TouchType;

    constructor(x: number, y: number, type: TouchType) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}