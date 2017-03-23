class Circle {
    constructor(ctx, { x = 0, y = 0, color = '#ff0000', speedX = 0, speedY = 0, radius = 5, opacity = 1 }) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.opacity = opacity;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
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
        const { canvas } = this.ctx;
        const radius = this.radius;
        let boundX, boundY;

        if (
            this.x <= this.radius && (boundX = radius) ||
            this.x + this.radius >= canvas.width && (boundX = canvas.width - this.radius)
        ) {
            this.x = boundX;
            this.speedX = -this.speedX;
        }

        if (
            this.y <= this.radius && (boundY = radius) ||
            this.y + this.radius >= canvas.height && (boundY = canvas.height - this.radius)
        ) {
            this.y = boundY;
            this.speedY = -this.speedY;
        }
    }

    linkTo(circle) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.translate(0.5, 0.5);
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = 0.2; // this.opacity;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(circle.x, circle.y);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}

export default Circle;