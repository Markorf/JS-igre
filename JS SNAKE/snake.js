const game = {
    canvas: document.querySelector("#snakeCanvas"),
    get ctx() {
        return this.canvas.getContext('2d');
    },
    scoreElem: document.querySelector("#score span"),
    horizFields: 17,
    verticalFields: 15,
    score: 0,
    fieldSize: 26, // velicina canvasa kroz broj polja
    gameOver() {
        clearInterval(snake.interval);        
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
         this.soundObject.playSound("dead");
        setTimeout(() => {
            console.log("Game over!");
            window.location.reload();
        }, 700);
    },
    soundObject: {
        audio: null,
        playSound(soundName) {
           this.audio = new Audio();
           this.audio.src = `audio/${soundName}.mp3`;
           this.audio.play();
        }
    }
};

const snake = {
    snakeHeadClr: 'orange',
    snakeTailClr: 'green',
    snakeBorderClr: 'red',
    snakeSize: game.fieldSize,
    snakeArr: [
        {
            snakeXPos: game.fieldSize * 2,
            snakeYPos: game.fieldSize * 5,
        }
    ],
    interval: null,
    currentKey: null,
    drawSnake() {
       for (let i = 0; i < this.snakeArr.length; i++) {
           const currTail = this.snakeArr[i];
           i == 0 ? game.ctx.fillStyle = this.snakeHeadClr : game.ctx.fillStyle = this.snakeTailClr;
           game.ctx.fillRect(currTail.snakeXPos, currTail.snakeYPos, this.snakeSize, this.snakeSize);
           game.ctx.strokeStyle = this.snakeBorderClr;
           game.ctx.strokeRect(currTail.snakeXPos, currTail.snakeYPos, this.snakeSize, this.snakeSize);
       }
      
        if (this.borderCollision()) {
            game.gameOver();
        }
        if (this.selfCollision()) {
            game.gameOver();
        }
    },
    moveSnake(newXPos = 0, newYPos = 0) {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            let oldX = this.snakeArr[0].snakeXPos;
            let oldY = this.snakeArr[0].snakeYPos;

            const newHead = {
               snakeXPos: oldX+=newXPos,
               snakeYPos: oldY+=newYPos 
            };

            this.snakeArr.unshift(newHead);
            this.checkForEat();
            this.repaint();        
            this.drawSnake();
        }, 50);
    },
    changeDirection(e) {
        switch (e.key) {
            case "ArrowUp":
                if (this.currentKey != "ArrowDown") {
                    this.moveSnake(0, -game.fieldSize);
                    this.currentKey = e.key;
                    game.soundObject.playSound("up");
                }
                break;
            case "ArrowDown":
                if (this.currentKey != "ArrowUp") {
                    this.moveSnake(0, game.fieldSize);
                    this.currentKey = e.key;
                    game.soundObject.playSound("down");
                }
                break;
            case "ArrowLeft":
                if (this.currentKey != "ArrowRight") {
                    this.moveSnake(-game.fieldSize, 0);
                    this.currentKey = e.key;
                    game.soundObject.playSound("left");
                }
                break;
            case "ArrowRight":
                if (this.currentKey != "ArrowLeft") {
                    this.moveSnake(game.fieldSize, 0);
                    this.currentKey = e.key; 
                    game.soundObject.playSound("right");
                }
                //
                break;
            // ukoliko nije stisnuto odg dugme zavrsi fju
            default:
                return false;
        }
    },
    repaint() {        
        game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        food.generateFood();
    },
    borderCollision() {
        return this.snakeArr[0].snakeYPos < 0 || this.snakeArr[0].snakeYPos > (game.canvas.height - game.fieldSize) || this.snakeArr[0].snakeXPos < 0 || this.snakeArr[0].snakeXPos > (game.canvas.width - game.fieldSize);
    },
    checkForEat() {
        if (this.snakeArr[0].snakeXPos == food.xPos && this.snakeArr[0].snakeYPos == food.yPos) {
            // ako su iste pozicije onda jedi
            game.score+=10;
            food.changeFoodPosition();
            food.generateFood();
            game.scoreElem.textContent = game.score;
            game.soundObject.playSound("eat");
        } else {
            this.snakeArr.pop();
        }
    },
    selfCollision() {
        for (let i = 1; i < this.snakeArr.length; i++) {
            if (this.snakeArr[0].snakeXPos == this.snakeArr[i].snakeXPos && this.snakeArr[0].snakeYPos == this.snakeArr[i].snakeYPos) {
                return true;
            }
        }
        return false;
    }

};


const food = {
    foodColor: 'blue',
    foodWidth: snake.snakeSize,
    foodHeight: snake.snakeSize,
    xPos: null,
    yPos: null,
    changeFoodPosition() {
        this.xPos = Math.floor(Math.random() * game.horizFields) * game.fieldSize;
        this.yPos = Math.floor(Math.random() * game.verticalFields) * game.fieldSize;     
    },
    generateFood() {
        const foodImg = new Image();
        foodImg.src = 'img/food.png';
        game.ctx.drawImage(foodImg, this.xPos, this.yPos, this.foodWidth, this.foodHeight);
    },
    
};

snake.drawSnake();
food.changeFoodPosition();
// Event
window.addEventListener("keydown", snake.changeDirection.bind(snake), false);

