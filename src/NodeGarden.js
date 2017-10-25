import Circle from './Circle';

/**
 * 验证px或数字宽高
 * 
 * @param {any} str 待验证字符串
 * @returns 失败返回false  成功返回对应的设置方法
 */
function validPx(str) {
    const pxReg = /^\d+(.\d+)?(?:px)?$/;

    return pxReg.test(str) && resizePx;
}

/**
 * 验证百分比宽高
 * 
 * @param {any} str 待验证字符串
 * @returns 失败返回false  成功返回对应的设置方法
 */
function validPercent(str) {
    const percentReg = /^\d+(.\d+)?%$/;

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
    const parentNode = canvas.parentNode;
    const style = parseFloat(getComputedStyle(parentNode)[key]);
    const percent = parseFloat(value);

    return style * percent / 100;
}

function validSize(options) {
    return (
        validPercent(options.height) ||
        validPx(options.height)
    ) &&
        (
            validPercent(options.width) ||
            validPx(options.width)
        );
}

function getPrimaryColor(color) {
    let rgbColor;
    const rgbColorRex = /^rgb\((\d{1,3})\s?,\s?(\d{1,3})\s?,\s?(\d{1,3})\)$/;

    if (color[0] === '#') {
        // #fff形式
        color = color.substr(1);

        if (color.length === 3) {
            color = parseInt(`${color[0].repeat(2)}${color[1].repeat(2)}${color[2].repeat(2)}`, 16);
        }

        rgbColor = {
            r: color >> 16 & 0xff,
            g: color >> 8 & 0xff,
            b: color & 0xff,
        };

    } else if (rgbColorRex.test(color)) {
        // rgb形式
        let match = color.match(rgbColorRex);

        rgbColor = {
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3])
        }
    }

    return rgbColor;
}

function getBgColor(r, g, b) {
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

/**
 * 设置canvas背景
 * 
 * @param {any} ele canvas
 * @param {any} color 色值|色值数组
 * @param {any} speed 两色值变化的速度
 */
function addBgColorStyle(ele, color, speed = 2) {
    const bgClass = 'canvas-bgColor';
    const style = document.createElement('style');
    let css;

    ele.className += bgClass;
    if (Array.isArray(color)) {
        // 变化背景
        let animation = '@keyframes bgAnimate{';
        const l = color.length;
        const unit = 100 / l;

        color.push(color[0]);
        for (let i = 0; i <= l; i++) {
            animation += `${i * unit}%{background:${color[i]}}`;
        }

        animation += '}';
        css = animation + `.${bgClass}{animation: bgAnimate ${(l - 1) * speed}s infinite forwards}`;
    } else {
        // 单一背景
        css = `.${bgClass}{background:${color}}`;
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
    return enable &&
        count === actualCount - 1
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
    const defaultPosition = -10;
    const mousePosition = {
        x: 'offsetX',
        y: 'offsetY'
    }[type];
    const border = {
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

class NodeGarden {
    constructor() {
        this.defaultOptions = {
            width: '100%',
            height: '100%',
            nodeCount: 60,
            nodeColor: '#fff',
            opacity: 0.6,
            bgColor: '#9bb3ec',
            bgSpeed: 2,
            nodeRadius: () => (Math.random() * 5 + 5),
            lineLength: 220,
            speedX: () => (Math.random() * 1 - 0.5),
            speedY: () => (Math.random() * 1 - 0.5),
            mouseNode: true
        };

        this.data = {
            canvas: null,
            ctx: null,
            options: null,
            mousePosition: {}
        };
    }

    init(dom, options) {
        if (!dom || dom.nodeType !== 1 || dom.tagName !== 'CANVAS') {
            throw new Error('初始化元素必须为canvas');
        }

        this.data.canvas = dom;
        this.data.ctx = dom.getContext('2d');
        this.data.options = Object.assign({}, this.defaultOptions, options);

        const { speedX, speedY, nodeRadius } = this.data.options;
        if (typeof speedX === 'number') {
            this.data.options.speedX = () => (speedX);
        }

        if (typeof speedY === 'number') {
            this.data.options.speedY = () => (speedY);
        }

        if (typeof nodeRadius === 'number') {
            this.data.options.nodeRadius = () => (nodeRadius);
        }

        this
            .resizeCanvas()
            .setBgGround()
            .start();
    }

    resizeCanvas() {
        const { options, canvas } = this.data;
        const { width, height } = options;

        if (!validSize(options)) {
            throw new Error('无效的宽高');
        }

        const resizeWidthHandler = validPx(width) || validPercent(width);
        const resizeHeightHandler = validPx(height) || validPercent(height);

        canvas.width = resizeWidthHandler(canvas, width, 'width');
        canvas.height = resizeWidthHandler(canvas, height, 'height');

        return this;
    }

    start() {
        const { options, ctx, canvas, mousePosition } = this.data;
        const { nodeCount, nodeColor, nodeRadius, lineLength, speedX, speedY, opacity, mouseNode } = options;
        const easing = 0.05;
        const nodeList = [];

        for (let i = 0; i < nodeCount; i++) {
            nodeList.push(new Circle(ctx, {
                radius: nodeRadius(),
                color: nodeColor,
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                opacity,
                speedX: speedX(),
                speedY: speedY()
            }))
        }

        if (mouseNode) {
            this.addMouseNode(nodeList);
        }

        (function drawFrame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            nodeList.forEach((node, i, list) => {
                const otherList = list.slice(i + 1);

                if (hasMouseNode(mouseNode, nodeCount, nodeList.length)) {
                    const mouseNode = nodeList[nodeCount];
                    const dx = mousePosition.x - mouseNode.x;
                    const dy = mousePosition.y - mouseNode.y;                    

                    mouseNode.speedX = dx * easing;
                    mouseNode.speedY = dy * easing;
                }

                node.move().draw(ctx);
                otherList.forEach(otherNode => {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const dis = Math.sqrt(dx * dx + dy * dy);

                    if (dis < lineLength) {
                        node.linkTo(otherNode);
                    }
                });
            });

            requestAnimationFrame(drawFrame);
        })()
    }

    addMouseNode(nodeList) {
        const { ctx, options, canvas, mousePosition } = this.data;
        const { nodeColor, opacity, nodeCount } = options;
        let removeTimer = null;

        const mouseNode = new Circle(ctx, {
            radius: 10,
            color: nodeColor,
            x: -10,
            y: -10,
            opacity
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

        canvas.addEventListener('mouseleave', () => {
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

    setBgGround() {
        const { canvas, options } = this.data;
        const { bgColor, bgSpeed } = options;

        addBgColorStyle(canvas, bgColor, bgSpeed);

        return this;
    }
}

window.NodeGarden = NodeGarden;

export default NodeGarden;