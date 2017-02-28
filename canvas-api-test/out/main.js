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
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        textField1.x++;
        TextField2.x++;
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
    window.onmousedown = function (e) {
        var x = e.offsetX;
        var y = e.offsetY;
        var type = "mousedown";
        var target = stage.hitTest(x, y);
        var result = target;
        if (result) {
            while (result.parent) {
                var currentTarget = result.parent;
                var e_1 = { type: type, target: target, currentTarget: currentTarget };
                result = result.parent;
            }
        }
        alert(1);
    };
    window.onmouseup = function (e) {
        var x = e.offsetX - 3;
        var y = e.offsetY - 3;
        var result = stage.hitTest(x, y);
        var target = result;
        console.log(result);
        if (result) {
            do {
                result.dispatchTouchEvent(e);
            } while (result.parent);
            {
                var type = "onmouseup";
                var currentTarget = result.parent;
                var e_2 = { type: type, target: target, currentTarget: currentTarget };
                result.dispatchTouchEvent(e_2);
                result = result.parent;
            }
        }
    };
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.alpha = 1;
        this.globalAlpha = 1;
        this.globalMatrix = new math.Matrix;
        this.localMatrix = new math.Matrix;
        this.isMouseDown = false;
        this.touchListeners = [];
    }
    DisplayObject.prototype.draw = function (context2D) {
        this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
        }
        else {
            this.globalAlpha = this.alpha;
            this.globalMatrix = this.localMatrix;
        }
        //aaaa
        context2D.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        context2D.globalAlpha = this.globalAlpha;
        this.render(context2D);
    };
    DisplayObject.prototype.render = function (context2D) {
    };
    return DisplayObject;
}());
function addListener(type, touchListener, capture, priority) {
    var event = new TouchEventListener(type, touchListener, capture, priority);
    this.touchListeners.push(event);
}
function dispatchTouchEvent(e) {
    console.log(e.type);
    if (e.type == "mousedown") {
        this.isMouseDown = true;
    }
    else if (e.type == "mouseup" && this.isMouseDown == true) {
        for (var i = 0; i < this.touchListeners.length; i++) {
            if (this.touchListeners[i].type == TouchType.CLICK) {
                this.touchListeners[i].func();
            }
        }
        this.isMouseDown = false;
    }
    else if (e.type == "mousemove") {
    }
}
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
    DisplayObjectContainer.prototype.hitTest = function (x, y) {
        for (var i = this.array.length - 1; i >= 0; i--) {
            var child = this.array[i];
            var point = new math.Point(x, y);
            var invertChildLocalMatrix = math.invertMatrix(child.localMatrix);
            var pointBaseOnChild = math.pointAppendMatrix(point, invertChildLocalMatrix);
            var hitTestResult = child.hitTest(pointBaseOnChild.x, pointBaseOnChild.y);
            if (hitTestResult) {
                return hitTestResult;
            }
        }
        return null;
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
    TextField.prototype.hitTest = function (x, y) { };
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
    Rect.prototype.hitTest = function (x, y) { };
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
    Bitmap.prototype.hitTest = function (x, y) {
        console.log("bitmap");
        var rect = new math.Rectangle();
        rect.x = rect.y = 0;
        rect.width = this.image.width;
        rect.height = this.image.height;
        if (rect.isPointInReactangle(new math.Point(x, y))) {
            alert("touch");
            return this;
        }
    };
    return Bitmap;
}(DisplayObject));
var TouchType;
(function (TouchType) {
    TouchType[TouchType["MOUSEDOWN"] = 0] = "MOUSEDOWN";
    TouchType[TouchType["MOUSEUP"] = 1] = "MOUSEUP";
    TouchType[TouchType["CLICK"] = 2] = "CLICK";
    TouchType[TouchType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
})(TouchType || (TouchType = {}));
var TouchEventListener = (function () {
    function TouchEventListener(type, func, capture, priority) {
        this.capture = false;
        this.priority = 0;
        this.type = type;
        this.func = func;
        this.capture = capture || false;
        this.priority = priority || 0;
    }
    return TouchEventListener;
}());
var TouchEvents = (function () {
    function TouchEvents(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
    return TouchEvents;
}());
//# sourceMappingURL=main.js.map