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
    var stage = new DisplayObjectContainer(0, 0);
    setInterval(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context);
    }, 30);
    context.fillStyle = "#FF0000";
    var rect = new Rect(10, 10, 50, 50);
    stage.addChild(rect);
};
var DisplayObject = (function () {
    function DisplayObject(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    DisplayObject.prototype.draw = function (context2D) {
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.apply(this, arguments);
        this.array = [];
    }
    DisplayObjectContainer.prototype.draw = function (context2D) {
        for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
            var drawable = _a[_i];
            drawable.draw(this.context2D);
        }
    };
    DisplayObjectContainer.prototype.addChild = function (child) {
        this.array.push(child);
    };
    return DisplayObjectContainer;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect(x, y, width, height) {
        _super.call(this, x, y);
        this.width = width;
        this.height = height;
    }
    Rect.prototype.draw = function () {
        this.context2D.fillRect(this.x, this.y, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
//# sourceMappingURL=main.js.map