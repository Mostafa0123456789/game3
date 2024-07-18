const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// تعريف الصور
const sheepImg = new Image();
sheepImg.src = 'sheep.jpg';  // sheep.jpg

const carImg = new Image();
carImg.src = 'car.jpg';  // car.jpg

// تعريف الخروف
const sheep = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5
};

const cars = [];
const carWidth = 50;
const carHeight = 50;
let carSpeed = 3;
let score = 0;

function drawSheep() {
    ctx.drawImage(sheepImg, sheep.x, sheep.y, sheep.width, sheep.height);
}

function drawCars() {
    cars.forEach(car => {
        ctx.drawImage(carImg, car.x, car.y, carWidth, carHeight);
        car.y += carSpeed;

        if (car.y > canvas.height) {
            car.y = -carHeight;
            car.x = Math.random() * (canvas.width - carWidth);
            score++;
            increaseDifficulty();
        }
    });
}

function moveSheep() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && sheep.x > 0) {
            sheep.x -= sheep.speed;
        } else if (e.key === 'ArrowRight' && sheep.x < canvas.width - sheep.width) {
            sheep.x += sheep.speed;
        } else if (e.key === 'ArrowUp' && sheep.y > 0) {
            sheep.y -= sheep.speed;
        } else if (e.key === 'ArrowDown' && sheep.y < canvas.height - sheep.height) {
            sheep.y += sheep.speed;
        }
    });
}

function generateCars() {
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * (canvas.width - carWidth);
        const y = Math.random() * (canvas.height - carHeight) - canvas.height;
        cars.push({ x, y });
    }
}

function checkCollision() {
    cars.forEach(car => {
        if (sheep.x < car.x + carWidth &&
            sheep.x + sheep.width > car.x &&
            sheep.y < car.y + carHeight &&
            sheep.y + sheep.height > car.y) {
            alert('انتهت اللعبة! نقاطك: ' + score);
            document.location.reload();
        }
    });
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('النقاط: ' + score, 10, 20);
}

function increaseDifficulty() {
    if (score % 10 === 0) {
        carSpeed += 1;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSheep();
    drawCars();
    checkCollision();
    drawScore();
    requestAnimationFrame(gameLoop);
}

// انتظار تحميل الصور قبل بدء اللعبة
let imagesLoaded = 0;
const totalImages = 2;

sheepImg.onload = carImg.onload = function() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        generateCars();
        moveSheep();
        gameLoop();
    }
};

sheepImg.onerror = function() {
    console.error('فشل تحميل صورة الخروف');
};

carImg.onerror = function() {
    console.error('فشل تحميل صورة السيارة');
};
