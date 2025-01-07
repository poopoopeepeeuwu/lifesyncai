class ThoughtOrb {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.reset();
        this.maxRadius = Math.random() * 20 + 15;
        this.growthSpeed = Math.random() * 0.02 + 0.01;
        this.color = this.getRandomColor();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.radius = 0;
        this.growing = true;
        this.alpha = 0;
    }

    getRandomColor() {
        const colors = [
            { r: 42, g: 157, b: 143, a: 0.4 },    // Teal
            { r: 100, g: 204, b: 197, a: 0.35 },  // Light teal
            { r: 38, g: 70, b: 83, a: 0.4 },      // Deep blue
            { r: 233, g: 196, b: 106, a: 0.3 }    // Warm yellow
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        if (this.growing) {
            this.radius += this.growthSpeed;
            this.alpha = Math.min(this.alpha + 0.02, this.color.a);
            if (this.radius >= this.maxRadius) {
                this.growing = false;
            }
        } else {
            this.radius -= this.growthSpeed;
            this.alpha = Math.max(this.alpha - 0.02, 0);
            if (this.radius <= 0) {
                this.reset();
                this.growing = true;
            }
        }
    }

    draw() {
        const gradient = this.ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius
        );
        
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.8})`);
        gradient.addColorStop(0.4, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
}

class MindscapeAnimation {
    constructor() {
        this.canvas = document.getElementById('backgroundCanvas');
        if (!this.canvas) {
            console.error('Canvas not found');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        this.orbs = [];
        const numberOfOrbs = Math.floor((this.width * this.height) / 25000);
        for (let i = 0; i < numberOfOrbs; i++) {
            this.orbs.push(new ThoughtOrb(this.canvas, this.ctx));
        }
        
        this.addEventListeners();
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.resize());

        this.canvas.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            this.orbs.forEach(orb => {
                const dx = mouseX - orb.x;
                const dy = mouseY - orb.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    orb.alpha = Math.min(orb.alpha + 0.1, 0.8);
                    orb.radius = Math.min(orb.radius + 1, orb.maxRadius * 1.5);
                }
            });
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw base layer
        this.orbs.forEach(orb => {
            orb.update();
            orb.draw();
        });

        // Draw glow effect with reduced blur
        this.ctx.save();
        this.ctx.filter = 'blur(15px)';
        this.orbs.forEach(orb => orb.draw());
        this.ctx.restore();
        
        requestAnimationFrame(() => this.animate());
    }
}

window.addEventListener('load', () => {
    console.log('Starting mindscape animation');
    new MindscapeAnimation();
}); 