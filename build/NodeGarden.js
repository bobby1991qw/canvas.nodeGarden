/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
    function Circle(ctx, _ref) {
        var _ref$x = _ref.x,
            x = _ref$x === undefined ? 0 : _ref$x,
            _ref$y = _ref.y,
            y = _ref$y === undefined ? 0 : _ref$y,
            _ref$color = _ref.color,
            color = _ref$color === undefined ? '#ff0000' : _ref$color,
            _ref$speedX = _ref.speedX,
            speedX = _ref$speedX === undefined ? 0 : _ref$speedX,
            _ref$speedY = _ref.speedY,
            speedY = _ref$speedY === undefined ? 0 : _ref$speedY,
            _ref$radius = _ref.radius,
            radius = _ref$radius === undefined ? 5 : _ref$radius,
            _ref$opacity = _ref.opacity,
            opacity = _ref$opacity === undefined ? 1 : _ref$opacity;

        _classCallCheck(this, Circle);

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.opacity = opacity;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    _createClass(Circle, [{
        key: 'draw',
        value: function draw() {
            var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.ctx;

            ctx.save();
            ctx.fillStyle = this.color;
            ctx.lineWidth = 0;
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }, {
        key: 'move',
        value: function move() {
            this.boundaryCheck();
            this.x += this.speedX;
            this.y += this.speedY;

            return this;
        }
    }, {
        key: 'boundaryCheck',
        value: function boundaryCheck() {
            this._checkBoundary('boundX');
            this._checkBoundary('boundY');
        }
    }, {
        key: '_checkBoundary',
        value: function _checkBoundary(type) {
            var boundary = void 0;
            var canvas = this.ctx.canvas;

            var radius = this.radius;
            var cfg = {
                boundX: {
                    ballCoordsKey: 'x',
                    canvasKey: 'width',
                    ballSpeedKey: 'speedX'
                },
                boundY: {
                    ballCoordsKey: 'y',
                    canvasKey: 'height',
                    ballSpeedKey: 'speedY'
                }
            }[type];

            if (this[cfg.ballCoordsKey] <= this.radius && (boundary = radius) || this[cfg.ballCoordsKey] + this.radius >= canvas[cfg.canvasKey] && (boundary = canvas[cfg.canvasKey] - this.radius)) {
                this[cfg.ballCoordsKey] = boundary;
                this[cfg.ballSpeedKey] = -this[cfg.ballSpeedKey];
            }
        }
    }, {
        key: 'linkTo',
        value: function linkTo(circle) {
            var ctx = this.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.translate(0.5, 0.5);
            ctx.strokeStyle = this.color;
            ctx.globalAlpha = this.opacity / 3;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(circle.x, circle.y);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }
    }]);

    return Circle;
}();

exports.default = Circle;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Circle = __webpack_require__(0);

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 验证px或数字宽高
 * 
 * @param {any} str 待验证字符串
 * @returns 失败返回false  成功返回对应的设置方法
 */
function validPx(str) {
    var pxReg = /^\d+(.\d+)?(?:px)?$/;

    return pxReg.test(str) && resizePx;
}

/**
 * 验证百分比宽高
 * 
 * @param {any} str 待验证字符串
 * @returns 失败返回false  成功返回对应的设置方法
 */
function validPercent(str) {
    var percentReg = /^\d+(.\d+)?%$/;

    return percentReg.test(str) && resizePercent;
}

function resizePx(canvas, value) {
    return value;
}

/**
 * 设置百分比宽高
 * 
 * @param {any} canvas 需要设置宽高的canvas
 * @param {any} value 宽高的百分比
 * @param {any} key 宽度/高度
 * @returns 数字宽高
 */
function resizePercent(canvas, value, key) {
    var parentNode = canvas.parentNode;
    var style = parseFloat(getComputedStyle(parentNode)[key]);
    var percent = parseFloat(value);

    return style * percent / 100;
}

function validSize(options) {
    return (validPercent(options.height) || validPx(options.height)) && (validPercent(options.width) || validPx(options.width));
}

function getPrimaryColor(color) {
    var rgbColor = void 0;
    var rgbColorRex = /^rgb\((\d{1,3})\s?,\s?(\d{1,3})\s?,\s?(\d{1,3})\)$/;

    if (color[0] === '#') {
        // #fff形式
        color = color.substr(1);

        if (color.length === 3) {
            color = parseInt('' + color[0].repeat(2) + color[1].repeat(2) + color[2].repeat(2), 16);
        }

        rgbColor = {
            r: color >> 16 & 0xff,
            g: color >> 8 & 0xff,
            b: color & 0xff
        };
    } else if (rgbColorRex.test(color)) {
        // rgb形式
        var match = color.match(rgbColorRex);

        rgbColor = {
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3])
        };
    }

    return rgbColor;
}

function getBgColor(r, g, b) {
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}

/**
 * 设置canvas背景
 * 
 * @param {any} ele canvas
 * @param {any} color 色值|色值数组
 * @param {any} speed 两色值变化的速度
 */
function addBgColorStyle(ele, color) {
    var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

    var bgClass = 'canvas-bgColor';
    var style = document.createElement('style');
    var css = void 0;

    ele.className += bgClass;
    if (Array.isArray(color)) {
        // 变化背景
        var animation = '@keyframes bgAnimate{';
        var l = color.length;
        var unit = 100 / l;

        color.push(color[0]);
        for (var i = 0; i <= l; i++) {
            animation += i * unit + '%{background:' + color[i] + '}';
        }

        animation += '}';
        css = animation + ('.' + bgClass + '{animation: bgAnimate ' + (l - 1) * speed + 's infinite forwards}');
    } else {
        // 单一背景
        css = '.' + bgClass + '{background:' + color + '}';
    }

    style.innerText = css;
    document.head.appendChild(style);
}

/**
 * 判断是否存在鼠标节点
 * 
 * @param {any} enable 是否允许鼠标节点
 * @param {any} count 初始化时的数量
 * @param {any} exceptCount 实际数量
 * @returns 
 */
function hasMouseNode(enable, count, actualCount) {
    return enable && count === actualCount - 1;
}

/**
 * 设置初始化时鼠标节点位置
 * 
 * @param {any} node 
 * @param {any} canvas 
 * @param {any} e 
 * @param {any} type 
 */
function setMouseNodePosition(node, canvas, e, type) {
    var defaultPosition = -10;
    var mousePosition = {
        x: 'offsetX',
        y: 'offsetY'
    }[type];
    var border = {
        x: 'width',
        y: 'height'
    }[type];

    // 初始位置为-10
    // 在非初始位置时保持位置
    // 否者设置位置到距离边界一个radius的位置
    if (node[type] === defaultPosition) {
        if (e[mousePosition] < node.radius) {
            // 偏移2像素，消除临界位置的bug
            node[type] = node.radius + 2;
        } else if (e[mousePosition] > canvas[border] - node.radius) {
            // 同上
            node[type] = canvas[border] - node.radius - 2;
        } else {
            node[type] = e[mousePosition];
        }
    }
}

var NodeGarden = function () {
    function NodeGarden() {
        _classCallCheck(this, NodeGarden);

        this.defaultOptions = {
            width: '100%',
            height: '100%',
            nodeCount: 60,
            nodeColor: '#fff',
            opacity: 0.6,
            bgColor: '#9bb3ec',
            bgSpeed: 2,
            nodeRadius: function nodeRadius() {
                return Math.random() * 5 + 5;
            },
            lineLength: 220,
            speedX: function speedX() {
                return Math.random() * 1 - 0.5;
            },
            speedY: function speedY() {
                return Math.random() * 1 - 0.5;
            },
            mouseNode: true
        };

        this.data = {
            canvas: null,
            ctx: null,
            options: null,
            mousePosition: {}
        };
    }

    _createClass(NodeGarden, [{
        key: 'init',
        value: function init(dom, options) {
            if (!dom || dom.nodeType !== 1 || dom.tagName !== 'CANVAS') {
                throw new Error('初始化元素必须为canvas');
            }

            this.data.canvas = dom;
            this.data.ctx = dom.getContext('2d');
            this.data.options = Object.assign({}, this.defaultOptions, options);

            var _data$options = this.data.options,
                speedX = _data$options.speedX,
                speedY = _data$options.speedY,
                nodeRadius = _data$options.nodeRadius;

            if (typeof speedX === 'number') {
                this.data.options.speedX = function () {
                    return speedX;
                };
            }

            if (typeof speedY === 'number') {
                this.data.options.speedY = function () {
                    return speedY;
                };
            }

            if (typeof nodeRadius === 'number') {
                this.data.options.nodeRadius = function () {
                    return nodeRadius;
                };
            }

            this.resizeCanvas().setBgGround().start();
        }
    }, {
        key: 'resizeCanvas',
        value: function resizeCanvas() {
            var _data = this.data,
                options = _data.options,
                canvas = _data.canvas;
            var width = options.width,
                height = options.height;


            if (!validSize(options)) {
                throw new Error('无效的宽高');
            }

            var resizeWidthHandler = validPx(width) || validPercent(width);
            var resizeHeightHandler = validPx(height) || validPercent(height);

            canvas.width = resizeWidthHandler(canvas, width, 'width');
            canvas.height = resizeWidthHandler(canvas, height, 'height');

            return this;
        }
    }, {
        key: 'start',
        value: function start() {
            var _data2 = this.data,
                options = _data2.options,
                ctx = _data2.ctx,
                canvas = _data2.canvas,
                mousePosition = _data2.mousePosition;
            var nodeCount = options.nodeCount,
                nodeColor = options.nodeColor,
                nodeRadius = options.nodeRadius,
                lineLength = options.lineLength,
                speedX = options.speedX,
                speedY = options.speedY,
                opacity = options.opacity,
                mouseNode = options.mouseNode;

            var easing = 0.05;
            var nodeList = [];

            for (var i = 0; i < nodeCount; i++) {
                nodeList.push(new _Circle2.default(ctx, {
                    radius: nodeRadius(),
                    color: nodeColor,
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    opacity: opacity,
                    speedX: speedX(),
                    speedY: speedY()
                }));
            }

            if (mouseNode) {
                this.addMouseNode(nodeList);
            }

            (function drawFrame() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                nodeList.forEach(function (node, i, list) {
                    var otherList = list.slice(i + 1);

                    if (hasMouseNode(mouseNode, nodeCount, nodeList.length)) {
                        var _mouseNode = nodeList[nodeCount];
                        var dx = mousePosition.x - _mouseNode.x;
                        var dy = mousePosition.y - _mouseNode.y;

                        _mouseNode.speedX = dx * easing;
                        _mouseNode.speedY = dy * easing;
                    }

                    node.move().draw(ctx);
                    otherList.forEach(function (otherNode) {
                        var dx = node.x - otherNode.x;
                        var dy = node.y - otherNode.y;
                        var dis = Math.sqrt(dx * dx + dy * dy);

                        if (dis < lineLength) {
                            node.linkTo(otherNode);
                        }
                    });
                });

                requestAnimationFrame(drawFrame);
            })();
        }
    }, {
        key: 'addMouseNode',
        value: function addMouseNode(nodeList) {
            var _data3 = this.data,
                ctx = _data3.ctx,
                options = _data3.options,
                canvas = _data3.canvas,
                mousePosition = _data3.mousePosition;
            var nodeColor = options.nodeColor,
                opacity = options.opacity,
                nodeCount = options.nodeCount;

            var removeTimer = null;

            var mouseNode = new _Circle2.default(ctx, {
                radius: 10,
                color: nodeColor,
                x: -10,
                y: -10,
                opacity: opacity
            });

            canvas.addEventListener('mouseenter', function (e) {
                setMouseNodePosition(mouseNode, canvas, e, 'x');
                setMouseNodePosition(mouseNode, canvas, e, 'y');
                clearTimeout(removeTimer);
                mouseNode.speedX = mouseNode.speedY = 0;
                mouseNode.opacity = opacity;

                // 不存在鼠标节点才添加
                nodeCount === nodeList.length && nodeList.push(mouseNode);
            });

            canvas.addEventListener('mousemove', function (e) {
                mousePosition.x = e.offsetX;
                mousePosition.y = e.offsetY;
            });

            canvas.addEventListener('mouseleave', function () {
                (function removeNode() {
                    removeTimer = setTimeout(function () {
                        mouseNode.opacity -= 0.05;
                        if (mouseNode.opacity <= 0) {
                            nodeList.length -= 1;
                            mouseNode.x = -10;
                            mouseNode.y = -10;
                        } else {
                            removeNode();
                        }
                    }, 100);
                })();
            });
        }
    }, {
        key: 'setBgGround',
        value: function setBgGround() {
            var _data4 = this.data,
                canvas = _data4.canvas,
                options = _data4.options;
            var bgColor = options.bgColor,
                bgSpeed = options.bgSpeed;


            addBgColorStyle(canvas, bgColor, bgSpeed);

            return this;
        }
    }]);

    return NodeGarden;
}();

window.NodeGarden = NodeGarden;

exports.default = NodeGarden;

/***/ })
/******/ ]);