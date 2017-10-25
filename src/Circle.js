class Circle {
    constructor(ctx, { x = 0, y = 0, color = '#ff0000', speedX = 0, speedY = 0, radius = 5, opacity = 1 }) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.color = color
        this.opacity = opacity
        this.radius = radius
        this.speedX = speedX
        this.speedY = speedY
    }

    draw(ctx = this.ctx) {
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

    move() {
        this.boundaryCheck();
        this.x += this.speedX;
        this.y += this.speedY;

        return this;
    }

    boundaryCheck() {
        this._checkBoundary('boundX')
        this._checkBoundary('boundY')
    }

    _checkBoundary(type) {
        let boundary
        const { canvas } = this.ctx
        const radius = this.radius
        const cfg = {
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
        }[type]

        if (
            this[cfg.ballCoordsKey] <= this.radius && (boundary = radius) ||
            this[cfg.ballCoordsKey] + this.radius >= canvas[cfg.canvasKey] && (boundary = canvas[cfg.canvasKey] - this.radius)
        ) {
            this[cfg.ballCoordsKey] = boundary
            this[cfg.ballSpeedKey] = -this[cfg.ballSpeedKey]
        }
    }

    linkTo(circle) {
        const ctx = this.ctx;
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
}

export default Circle;