
  const timeLeft = document.querySelector('.timer span');
  const players = document.querySelectorAll('.firstPlayer, .secondPlayer');
  let currentPlayer;
  let interval;
  let player = 'blue';

  const firstSection = document.querySelector('.section-one');
  const secondSection = document.querySelector('.section-two');
  const spojnice = [];
  const divsLeft = [];
  const divsRight = [];
  let firstSectionDivs;
  let numberSpojnica;
  let changeCount = -0.5;
  let currentData;
  let currentRect = 0;
  let canCheck = true;
  const randSpojnica = Math.floor((Math.random() * 9) % 2);

  const playerObject = {
    blue: 0,
    red: 0,
  };

  function changeTime(seconds = 10) {
    const now = Date.now();
    const then = now + seconds * 1000; // / 52000
    let secs = seconds;
    timeLeft.textContent = secs;
    if (currentRect < 8 && canCheck) {
      interval = setInterval(() => {
        secs = Math.round((then - Date.now()) / 1000);
        timeLeft.textContent = secs;
        if (secs <= 0) {
          reset();
        }
      }, 1000);
    } else {
      timeLeft.textContent = 0;
      changePlayer();
    }
  }
  changeTime();

  function reset() {
    clearInterval(interval);
    changePlayer();
    changeTime();
  }

  // ///// separation

  fetch('json.json')
    .then(blob => blob.json())
    .then(data => spojnice.push(...data))
    .then(destruct);

  function destruct() {
    const spojniceArr = spojnice[randSpojnica].Spojnica;
    numberSpojnica = spojnice[0].Spojnica.length;
    spojniceArr.forEach((item, i) => {
      createElements(item[0], item[1], i);
    });
    putElements();
  }
  function getRand() {
    return Math.floor(Math.random() * numberSpojnica);
  }

  function pushRandom() {
    let randArr = []; // zbog restarta
    while (randArr.length !== numberSpojnica) {
      const randNum = getRand();
      randArr.push(randNum);
      randArr = randArr.filter((v, i, a) => a.indexOf(v) == i);
    }
    return randArr;
  }

  function createElements(el1, el2, index) {
    const leftDiv = document.createElement('DIV');
    leftDiv.textContent = el1;
    leftDiv.dataset.index = index;
    const rightDiv = document.createElement('DIV');
    rightDiv.textContent = el2;
    rightDiv.dataset.index = index;
    divsLeft.push(leftDiv);
    divsRight.push(rightDiv);
  }

  function putElements() {
    const randLeftNumbers = pushRandom();
    Array.from(divsLeft).forEach((element, index, arr) => firstSection.appendChild(arr[randLeftNumbers[index]]));
    const randRightNumbers = pushRandom();
    Array.from(divsRight).forEach((element, index, arr) => {
    	secondSection.appendChild(arr[randRightNumbers[index]]);
    	element.addEventListener('click', checkAnswer);
    });
    getAllDivs();
  }
  function getAllDivs() {
    firstSectionDivs = firstSection.children;
    currentData = firstSectionDivs[0];
    currentData.classList.add('active');
    return firstSectionDivs;
  }

  function changePlayer() {
    player = player == 'blue' ? 'red' : 'blue';
    changeCount += 0.5;
    if ((changeCount === 1 && currentRect <= numberSpojnica - 1)) {
    	console.log(currentRect);
        changeCount = 0;
        moveDown();
    }
    players.forEach((igrac) => {
      igrac.classList.remove('red', 'blue');
    });
    currentPlayer = document.querySelector(`#${player}`);
    currentPlayer.classList.add(player);
  }

  changePlayer();

  function moveDown() {
    currentRect += 1;
    if (currentRect > numberSpojnica - 1) {
    	console.log("Moved");
    	return end();
    }
    [...firstSectionDivs].forEach(div => div.classList.remove('active'));
    firstSectionDivs[currentRect].classList.add('active');
    currentData = firstSectionDivs[currentRect];
  }

  function checkAnswer(e) {
    if (this.dataset.index === currentData.dataset.index && !this.dataset.clicked) {
      this.classList.add(player);
      currentData.classList.add(player);
      this.classList.remove('active');
      this.dataset.clicked = true;
      changeCount = 0;
      playerObject[player] += 2;
      document.querySelector(`#${player} + div`).textContent = playerObject[player];
      moveDown();
      clearInterval(interval);
      changeTime();
    } else if (!this.dataset.clicked) {
      reset();
    }
  }

  function end() {
  	setTimeout(() => {
	    clearInterval(interval);
	    timeLeft.textContent = 0;
	    canCheck = false;
	    if (confirm('Gotovo! Igraj opet?')) location.reload();
	    else return 'Kraj';
  	}, 1500);
  }
