document.addEventListener('DOMContentLoaded', init, false);
function init() {
  const myNumber = (function () {
    // init values
    const currentMove = document.querySelector('.playerNum');
    const leftSideNums = document.querySelectorAll('.left-side-nums p');
    const middleNum = document.querySelector('.middleNum');
    const bigNum = document.querySelector('.bigNum');
    const mainNum = document.querySelector('.mainNum span');
    const stopBtn = document.querySelector('.stop');
    const mainAnswer = document.querySelector('#mainAnswer');
    const valBtns = document.querySelectorAll('.btn-groups button');
    const timeLeft = document.querySelector('p.time span');
    const deleteBtn = document.querySelector('.delete');
    const finalBtn = document.querySelector('.final');
    let activePlayer = document.querySelector('p.active');
    let currentPlayer = activePlayer.classList.value.split(' ')[0];
    const toAdd = document.querySelectorAll('.add');
    const pointsText = document.querySelectorAll('.points');
    let int,
      canGo = true;
    let numInt;
    const addingNums = document.querySelectorAll('.number');
    const numsToGenerate = Array.from(addingNums).filter(num => !num.classList.contains('special'));
    let mainPlayer;
    let result;
    let operationsArr = [],
      separatedElements; // *
    // get values
    const specialNums = document.querySelectorAll('.special');
    // glavni objekat
    const mainObj = {
      red: {
        points: 0,
        playerNum: 1,
        guessed: false,
        active: true,
        color: 'red',
        diff: null,
        answer: 0,
        writeResult() {
          document.querySelector('#firstPlayer + p').textContent = 10;
        },
      },
      blue: {
        points: 0,
        playerNum: 2,
        guessed: false,
        active: false,
        color: 'blue',
        diff: null,
        answer: 0,
        writeResult() {
          document.querySelector('#secondPlayer + p').textContent = 10;
        },
      },
    };

    mainPlayer = mainObj[currentPlayer];

    function getNum(min, max) {
      return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    function changeTime(secs = 5) {
      const second = secs;
      const now = Date.now();
      const then = now + second * 1000;
      timeLeft.textContent = second;
      int = setInterval(() => {
        const secsLeft = (then - Date.now()) / 1000;
        timeLeft.textContent = Math.round(secsLeft);
        if (secsLeft <= 0) {
          if (canGo) {
            canGo = false;
            clearInterval(int);
            stopNumbers();
          } else {
            clearInterval(int);
            setTimeout(changePlayer, 1000);
            return 'Done timeout';
          }
        }
      }, 1000);
    }

    function changePlayer() {
      setToDef();
      mainPlayer.active = false;
      activePlayer.classList.remove('active');
      if (currentPlayer === 'red') {
        displayRandNums();
        currentPlayer = 'blue';
        mainPlayer = mainObj[currentPlayer];
        currentMove.textContent = '2';
      } else if (currentPlayer == 'blue') {
        addPoints();
        return endGame();
      }
      mainPlayer.active = true;
      activePlayer = document.querySelector(`p.${currentPlayer}`);
      activePlayer.classList.add('active');
      changeTime(5);
    }

    changeTime();

    function setToDef() {
      operationsArr = [];
      separatedElements = ''; // prva 2 *
      mainAnswer.textContent = '';
      canGo = true;
      resetValues(false);
      if (!mainPlayer.guessed) setZero(); // ako nisam kliknuo na konacan odg
    }

    function displayRandNums() {
      numInt = setInterval(() => {
        displayRandSpecial();
        displayMainRand();
   		displayRegularNums();
      }, 70);
    }

    function displayRegularNums() {
    	numsToGenerate.forEach((num, i, arr) => {
    	  if (canGo) {
    	    const maxValue = parseInt(num.dataset.max);
    	    const minValue = 1;
    	    let currentValue = getNum(1, 10);
    	    currentValue += 1;
    	    currentValue > maxValue ? currentValue -= 1 : currentValue += 1;
    	    num.textContent = currentValue;
    	  } else { // end of if can go
    	    clearInterval(numInt);
    	  }
    	});
    }

    function displayRandSpecial() {
      const middleArr = [15, 20, 25, 30];
      const bigArr = [50, 100, 125, 150];
      const gen1 = getNum(0, middleArr.length - 1);
      const gen2 = getNum(0, bigArr.length - 1);
      specialNums[0].textContent = middleArr[gen1];
      specialNums[1].textContent = bigArr[gen2];
    }

    function displayMainRand() {
      const randNum = getNum(1, 1000);
      mainNum.textContent = randNum;
      result = randNum;
    }

    setTimeout(displayRandNums, 700);

    function writeToMain(fromBtn = true) {
      if (fromBtn) { // moram jer se poziva preko chekResult pa da ne bi se zeznuo this
        const lastPushed = operationsArr[operationsArr.length - 1];
        if ((lastPushed && lastPushed.tagName === this.tagName && !lastPushed.dataset.prs && !this.dataset.prs)) return;
        // dozvoli () a zabrani ostalo (pattern)
        if (this.tagName !== 'BUTTON') { // staviti disabled
          if (this.dataset.clicked) return;
          this.classList.add('disabled');
          this.dataset.clicked = true;
        }
        operationsArr.push(this);
        if (operationsArr[0].tagName === 'BUTTON' && !operationsArr[0].dataset.prs) {
          operationsArr.shift();
          return; // spreci da prvi unos bude dugme (osim za otvorene zagrade)
        }
      }
      separatedElements = operationsArr.map(element => element.textContent).join(' ');
      mainAnswer.textContent = separatedElements;
      return separatedElements.trim();
    }

    function checkResult() {
      const playerPoints = document.querySelector(`.points.${mainPlayer.color}`);
      const returned = writeToMain(false);
      const lastElem = operationsArr[operationsArr.length - 1];
      if (lastElem && lastElem.tagName === 'BUTTON' && !lastElem.dataset.prs) return; // ako mi je zadnji elem btn, prevent action
      //    const playerAnswer = new Function("return " + returned)(); works
      const playerAnswer = eval(returned);
      if (typeof playerAnswer === 'number') {
        mainPlayer.answer = playerAnswer;
        mainPlayer.guessed = true;
        const currentNum = mainPlayer.playerNum;
        const res = document.querySelector(`.rez-${currentNum}`);
        const differenceText = document.querySelector(`.udaljenost-${currentNum}`);
        const diff = Math.abs(Number(result) - playerAnswer);
        mainPlayer.diff = diff;
        differenceText.textContent = diff;
        if (diff === 0) mainPlayer.writeResult();
        res.textContent = playerAnswer;
        clearInterval(int);
        setTimeout(changePlayer, 1000);
      } else {
        setZero();
      }
    }

    function setZero() {
      mainPlayer.diff = result;
      mainPlayer.answer = 0;
      mainAnswer.textContent = 0;
    }

    function stopNumbers() {
      resetValues(true);
      canGo = false;
      clearInterval(int);
      changeTime(60);
      this.disabled = true;
      return true;
    }

    function resetValues(canRemove = false) {
      stopBtn.disabled = false;
      Array.from(toAdd).forEach((element) => {
        if (canRemove) { 
        	element.removeAttribute('data-clicked');
        	element.classList.remove('disabled');
        }
        else {
        	element.dataset.clicked = 'true';
 		}
      });
    }

    function removeLastSymbol() {
      const lastRemoved = operationsArr.pop();
      if (lastRemoved) { // da ne bi izbacivao gresku
        const toEnable = Array.from(toAdd).find(removed => removed.dataset.index === lastRemoved.dataset.index);
        toEnable.removeAttribute('data-clicked');
        toEnable.classList.remove('disabled');
      }
      writeToMain(false);
    }

    function addPoints() {
      if (!mainObj.blue.guessed && !mainObj.red.guessed) {
        Array.from(pointsText).forEach(pointText => pointText.textContent = 'Nije unet broj');
      } else if (mainObj.red.diff < mainObj.blue.diff) {
        pointsText[0].textContent = 15;
        mainObj.red.points = 15;
      } else if (mainObj.red.diff > mainObj.blue.diff) {
        pointsText[1].textContent = 15;
        mainObj.blue.points = 15;
      } else { // equal or null
        Array.from(pointsText).forEach(pointText => pointText.textContent = 5);
        mainObj.red.points = 5;
        mainObj.blue.points = 5;
      }
    }

    function endGame() {
      Array.from(toAdd).forEach(elem => elem.dataset.clicked = 'true');
      finalBtn.disabled = 'true';
	  stopBtn.disabled = 'true';
      mainAnswer.textContent = 'Kraj igre';
      clearInterval(int);
      setTimeout(() => {
        if (confirm('Game is over! Play Again?')) location.reload();
        else alert('See you next time!');
      }, 1000);
    }

    // listeners

    Array.from(toAdd).forEach((elem, i) => {
      elem.addEventListener('click', writeToMain, false);
      elem.dataset.clicked = false;
      elem.dataset.index = i;
    });

    finalBtn.addEventListener('click', checkResult, false);
    stopBtn.addEventListener('click', stopNumbers, false);
    deleteBtn.addEventListener('click', removeLastSymbol, false);
    // set dataIndex
  }()); // end of myNumber func
  return myNumber;
} // end of init wrapper
