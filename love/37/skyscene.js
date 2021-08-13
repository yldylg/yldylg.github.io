function SkyScene(el) {
    function Star(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random() * 2) + 1;
        var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
        this.color = "rgba(255,255,255," + alpha + ")";
    }

    Star.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }

    Star.prototype.move = function() {
        this.y -= .15;
        if (this.y <= -10) this.y = el.height + 10;
        this.draw();
    }

    Star.prototype.die = function() {
        stars[this.id] = null;
        delete stars[this.id];
    }

    function Dot(id, x, y, r) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random() * 5) + 1;
        this.maxLinks = 2;
        this.speed = .5;
        this.a = .5;
        this.aReduction = .005;
        this.color = "rgba(255,255,255," + this.a + ")";
        this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";

        this.dir = Math.floor(Math.random() * 140) + 200;
    }

    Dot.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }

    Dot.prototype.link = function() {
        if (this.id == 0) return;
        var d1 = preDot(this.id, 1);
        var d2 = preDot(this.id, 2);
        var d3 = preDot(this.id, 3);
        if (!d1) return;
        ctx.strokeStyle = this.linkColor;
        ctx.moveTo(d1.x, d1.y);
        ctx.beginPath();
        ctx.lineTo(this.x, this.y);
        if (d2 != false) ctx.lineTo(d2.x, d2.y);
        if (d3 != false) ctx.lineTo(d3.x, d3.y);
        ctx.stroke();
        ctx.closePath();
    }

    function preDot(id, stepback) {
        if (id == 0 || id - stepback < 0) return false;
        if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
        else return false;
    }

    Dot.prototype.move = function() {
        this.a -= this.aReduction;
        if (this.a <= 0) {
            this.die();
            return
        }
        this.color = "rgba(255,255,255," + this.a + ")";
        this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
        this.x = this.x + Math.cos(deg2rad(this.dir)) * this.speed,
            this.y = this.y + Math.sin(deg2rad(this.dir)) * this.speed;

        this.draw();
        this.link();
    }

    Dot.prototype.die = function() {
        dots[this.id] = null;
        delete dots[this.id];
    }

    let ctx = el.getContext('2d'),
        needDraw = false,
        currentX,
        currentY,
        stars = [],
        initStarsPopulation = 80,
        dots = [],
        dotsMinDist = 2,
        maxDistFromCursor = 50,
        ts = 0,
        inited = false;

    function init() {
        ctx.strokeStyle = "white";
        ctx.shadowColor = "white";
        for (var i = 0; i < initStarsPopulation; i++) {
            stars[i] = new Star(i, Math.floor(Math.random() * el.width), Math.floor(Math.random() * el.height));
        }
        ctx.shadowBlur = 0;
        if (!inited) {
            animate();
        }
        inited = true;
    }

    function drawBackground() {
        var lg = ctx.createLinearGradient(0, 0, 0, el.height);
        lg.addColorStop(0, "#000");
        var rangeR = 170 - 87; // rgb(87, 183, 254)
        var rangeG = 87 - 180; // rgb(164, 87, 254)
        var rate = 300.0;
        var R = 87 + rangeR * (Math.sin(ts / rate - 1.571) + 1) / 2;
        var G = 180 + rangeG * (Math.sin(ts / rate - 1.571) + 1) / 2;
        lg.addColorStop(1, 'rgb(' + R + ', ' + G + ', 254)');
        ctx.fillStyle = lg;
        ctx.fillRect(0, 0, el.width, el.height);
        ts++;
    }

    function animate() {
        ctx.clearRect(0, 0, el.width, el.height);
        drawBackground();

        for (var i in stars) {
            stars[i].move();
        }
        for (var i in dots) {
            dots[i].move();
        }
        drawScene();
        requestAnimationFrame(animate);
    }

    function drawScene() {
        if (!needDraw) return;

        if (dots.length == 0) {
            dots[0] = new Dot(0, currentX, currentY);
            dots[0].draw();
            return;
        }

        var d = preDot(dots.length, 1);
        var prevX = d.x;
        var prevY = d.y;

        var diffX = Math.abs(prevX - currentX);
        var diffY = Math.abs(prevY - currentY);

        if (diffX < dotsMinDist || diffY < dotsMinDist) return;

        var xVariation = Math.random() > .5 ? -1 : 1;
        xVariation = xVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
        var yVariation = Math.random() > .5 ? -1 : 1;
        yVariation = yVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
        dots[dots.length] = new Dot(dots.length, currentX + xVariation, currentY + yVariation);
        dots[dots.length - 1].draw();
        dots[dots.length - 1].link();
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    addEventListener('resize', init)
    init();

    setInterval(function() {
        needDraw = true;
        currentX = (Math.random() + 0.25) * el.width / 2;
        currentY = (Math.random() + 0.25) * el.height / 2;
        setTimeout(function() {
            currentX = currentX + (Math.random() - 0.5) * el.width / 10;
            currentY = currentY + (Math.random() - 0.5) * el.height / 10;
        }, 100);
        setTimeout(function() {
            needDraw = false;
        }, 400);
    }, (Math.random() + 1) * 1900);

}