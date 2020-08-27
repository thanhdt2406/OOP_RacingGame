let Car = function (image, top, left, size) {
    this.image = image;
    this.top = top;
    this.left = left;
    this.size = size;
    this.speed = 1;
    this.direction = 'right';

    this.getCarElement = function () {
        return '<img width="' + this.size + '"' +
            ' height="' + this.size + '"' +
            ' src="' + this.image + '"' +
            ' style="top: ' + this.top + 'px; left:' + this.left + 'px;position:absolute;"  alt="img"/>';
    }

    this.canMoveLeft = function () {
        return (this.left > 0);
    }
    this.moveLeft = function () {
        if (this.canMoveLeft()) {
            this.left -= this.speed;
        }
    }

    this.canMoveRight = function () {
        return (this.left < window.innerWidth - this.size);
    }
    this.moveRight = function () {
        if (this.canMoveRight()) {
            this.left += this.speed;
        }
    }

    this.canMoveUp = function () {
        return (this.top > 0);
    }
    this.moveUp = function () {
        if (this.canMoveUp()) {
            this.top -= this.speed;
        }
    }

    this.canMoveDown = function () {
        return (this.top < window.innerHeight - this.size);
    }
    this.moveDown = function () {
        if (this.canMoveDown()) {
            this.top += this.speed;
        }
    }
}

let Item = function (image, size) {
    this.image = image;
    this.top = Math.round(Math.random() * window.innerHeight);
    this.left = Math.round(Math.random() * window.innerWidth);
    this.size = size;

    this.getItemElement = function () {
        return '<img width="' + this.size + '"' +
            ' height="' + this.size + '"' +
            ' src="' + this.image + '"' +
            ' style="top: ' + this.top + 'px; left:' + this.left + 'px;position:absolute;"  alt="img"/>';
    }
}

let car = new Car('car.jpg', 0, 0, 50);
let obstacles = new Item('danger.png', 50);
let coin = new Item('coin.png', 50);

function move(event) {
    switch (event.keyCode) {
        case 37:
            car.direction = 'left';
            break;
        case 38:
            car.direction = 'up';
            break;
        case 39:
            car.direction = 'right';
            break;
        case 40:
            car.direction = 'down';
            break;
        case 17:
            car.speed++;
            break;
    }
}

let score = 0;

function start() {
    if (car.top + 50 >= obstacles.top && car.top <= obstacles.top + 50 && car.left <= obstacles.left + 50 && car.left + 50 >= obstacles.left) {
        alert("Game Over");
        car.top = 0;
        car.left = 0;
        obstacles.top = Math.round(Math.random() * window.innerHeight);
        obstacles.left = Math.round(Math.random() * window.innerWidth);
        car.speed = 1;
        score = 0;
    }
    if (car.top + 50 >= coin.top && car.top <= coin.top + 50 && car.left <= coin.left + 50 && car.left + 50 >= coin.left) {
        score++;
        coin.top = Math.round(Math.random() * window.innerHeight);
        coin.left = Math.round(Math.random() * window.innerWidth);
        car.speed++;
    }
    switch (car.direction) {
        case 'right':
            car.moveRight();
            break;
        case 'left':
            car.moveLeft();
            break;
        case 'down':
            car.moveDown();
            break;
        case 'up':
            car.moveUp();
            break;
    }
    document.getElementById('game').innerHTML = car.getCarElement();
    document.getElementById('obstacles').innerHTML = obstacles.getItemElement();
    document.getElementById('coin').innerHTML = coin.getItemElement();
    document.getElementById('score').innerHTML = 'Score: ' + score;
    window.addEventListener('keydown', move);
    setTimeout(start, 1);
}


start();