var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    //   context.fillStyle = "#FF0000";
    // context.fillRect(0, 0, 150, 75);
    var stage = new DisplayObjectContainer();
    setInterval(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context);
    }, 10);
    context.fillStyle = "#FF0000";
    var rect = new Rect();
    rect.x = 10;
    rect.y = 15;
    rect.width = 50;
    rect.height = 40;
    stage.addChild(rect);
    var bitmap = new Bitmap();
    bitmap.image.src = "egret.jpg";
    bitmap.x = 10;
    bitmap.y = 100;
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
    stage.draw(context);
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
        this.globalAlpha = 1;
    }
    /*   context2D: CanvasRenderingContext2D;
   
       constructor() {
   
       }
       draw(context2D: CanvasRenderingContext2D) {
   
       }
       */
    DisplayObject.prototype.draw = function (context2D) {
        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
        }
        else {
            this.globalAlpha = this.alpha;
        }
        context2D.globalAlpha = this.globalAlpha;
        this.render(context2D);
    };
    DisplayObject.prototype.render = function (context2D) {
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.apply(this, arguments);
        this.array = [];
    }
    DisplayObjectContainer.prototype.render = function (context2D) {
        for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
            var drawable = _a[_i];
            drawable.draw(context2D);
        }
    };
    DisplayObjectContainer.prototype.addChild = function (child) {
        this.array.push(child);
        child.parent = this;
    };
    return DisplayObjectContainer;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.text = "";
    }
    TextField.prototype.render = function (context2D) {
        context2D.fillText(this.text, this.x, this.y);
    };
    return TextField;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
    }
    Rect.prototype.render = function (context2D) {
        context2D.fillRect(this.x, this.y, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
        this.image = document.createElement("img");
    }
    Bitmap.prototype.render = function (context2D) {
        context2D.drawImage(this.image, this.x, this.y);
    };
    return Bitmap;
}(DisplayObject));
//# sourceMappingURL=main.js.map