"use strict";
const myModule = (function() {

// initialize
const rows = 3;
const colsPerRow = 3;
let globalImageNum;
const shuffledCols = []; // resenje!
const colsArr = [];
const mainWrapper = document.querySelector(".main-wrapper");
const wrapper = mainWrapper.querySelector(".box-wrapper");
const nextButton = document.querySelector(".nextStar");

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function makeRandomArr() {
	const randomSet = new Set();
	while (randomSet.size < rows * colsPerRow) { // zato jer ima ukupno 9 box-ova, order je ok ali nije poredjan po pes-u
		randomSet.add(randomNum(0, rows * colsPerRow));
	}
		return Array.from(randomSet);
}


 const makeDivs = (function() {
	const randomArr = makeRandomArr();
	const randomColNum = randomNum(0, colsPerRow * rows); // 0, 8
	for (let i = 0; i < rows * colsPerRow; i++) {
			const col = document.createElement("DIV");
			col.classList.add("myCol");
			col.dataset.index = i;
			colsArr.push(col);
			if (i === randomColNum) { // check for null column
				col.dataset.special = "true";
				col.classList.add("emptyCol");
			} 
		wrapper.appendChild(col);
		}
	// change position and bind click
	colsArr.forEach((elem, i) => {
		shuffledCols[randomArr[i]] = elem; // resenje za shuffle
		elem.style.order = randomArr[i];
		elem.dataset.newIndex = randomArr[i];
		elem.addEventListener("click", checkPosition, false);
	});
  }
)();


function checkPosition() {
	// check koji element moze da se menja sa null
	const currentIndex = Number(this.dataset.newIndex);
	const positionalArr = [ shuffledCols[currentIndex - 1], shuffledCols[currentIndex + 1], shuffledCols[currentIndex - colsPerRow], shuffledCols[currentIndex + colsPerRow] ].filter(elem => typeof elem !== "undefined"); // izbaciti undefined vrednosti
	 const elemToChange = positionalArr.find(elem => elem.dataset.special); // elemToChange = nullElement in positionalArr
	if (elemToChange) {
		changePosition(this, elemToChange);
	}else {
		console.warn("This element can't be changed!");
	}

}

function changePosition(clicked, nullElement) {
	const [clickedOrder, nullElOrder] = [clicked.style.order, nullElement.style.order];
	clicked.style.order = nullElOrder;
	nullElement.style.order = clickedOrder;
	nullElement.style.animation = "changeOrder 1s ease";
	updateArr(clicked, nullElement);
	
}

function updateArr(clicked, nullElement) {
	const clickedIndex = shuffledCols.findIndex(elem => elem === clicked);
	const nullIndex = shuffledCols.findIndex(elem => elem === nullElement);
	// moram i newIndex da zamenim da bi radilo
	clicked.dataset.newIndex = nullIndex;
	nullElement.dataset.newIndex = clickedIndex;
	shuffledCols[clickedIndex] = nullElement;
	shuffledCols[nullIndex] = clicked;
	setTimeout(() => {
		nullElement.style.animation = "";
	}, 500);
}

function fetching() {
	fetch("https://api.myjson.com/bins/o8y7n").then(data => data.json()).then(data => addPictures(data)).catch(err => console.error(err));
}
fetching();

function addPictures(data) {
	if (typeof globalImageNum !== 'undefined' && mainWrapper.firstElementChild) {
		globalImageNum++; // moram tako jer 0 se gleda kao false
		mainWrapper.removeChild(mainWrapper.firstElementChild);
		// posto znam da postoji slika onda jednostavno obrisem firstChild koji predstavlja stari heading (ostalo vazi i za audio)
		mainWrapper.removeChild(mainWrapper.lastElementChild);
	} else {
		globalImageNum = randomNum(0, data.length);
	}
	if (globalImageNum >= data.length) {
		globalImageNum = 0;
	}
	addAudio(data, globalImageNum);
	const imageHeading = document.createElement("h1");
	imageHeading.textContent = data[globalImageNum].name;
	imageHeading.classList.add('imgHeading');
	mainWrapper.insertBefore(imageHeading, wrapper);
	for (let i = 0; i < data[globalImageNum].pictures.length; i++) {
		
		const picture = data[globalImageNum].pictures[i];
		if (colsArr[i].dataset.special) {
				colsArr.splice(i, 1); // obrisi taj element i nastavi dalje!
				// ne smem da radim splice na shuflledArr
			}
			colsArr[i].style.backgroundImage = `url(${data[globalImageNum].path}/${picture}.gif)`;
	}
}

function addAudio(data, globalImageNum) {
	const sound = document.createElement("audio");
	sound.src = `${data[globalImageNum].sound}`;
	sound.classList.add("myAudio");
	mainWrapper.appendChild(sound);
	sound.loop = true;
	sound.play();
}


nextButton.addEventListener("click", fetching, false);

const publicApi = {};

return {
	publicApi
};

})();