document.addEventListener("DOMContentLoaded", init, false);

function init() {
	'use strict';

	const mainForm = document.querySelector(".mainForm");
	const mainInput = mainForm.querySelector("input");
	let timeLeft = document.querySelector(".timer span");
	const firstPlayer = document.querySelector(".firstPlayer");
	const secondPlayer = document.querySelector(".secondPlayer");
	const players = document.querySelectorAll(".firstPlayer, .secondPlayer");
	const allSections = document.querySelectorAll("[class|=section]");
	const fields = document.querySelectorAll("[data-attr]");
	const allInputs = document.querySelectorAll("input");
	const sectionChilds = [];
	const allElements = [];
	const answerArr = [];
	const openedInputs = [];
	let interval;
	let openedFields;
	const sideInputs = document.querySelectorAll("input:not(.main-answer)");
	const button = document.querySelector(".btn");
	let currentPlayer;
	const sideForms = document.querySelectorAll("form:not(.mainForm)");
	let player = "blue";
	let playerObject = {
		blue : 0,
		red : 0,
		clickedTimes : 0
	};

	allSections.forEach(section => {
	    sectionChilds.push(section.children); 
	    allElements.push(...section.children); // destr
	});

	function changePlayer() {
		player = player == "blue" ? "red" : "blue";
		playerObject.clickedTimes = 0;
		openedFields = document.querySelectorAll('div[data-open="true"]');
		if (openedFields.length < 16) { // restart dole
			button.disabled = true;
			button.style.cursor = 'not-allowed';	
			sideInputs.forEach(input => input.setAttribute("disabled", "true"));
			mainInput.setAttribute("disabled", "true");
		}else {
			playerObject.clickedTimes+=1; // zbog buttona
		}
		
		players.forEach(igrac => {
			igrac.classList.remove("red", "blue");
		});
		currentPlayer = document.querySelector(`#${player}`);
		currentPlayer.classList.add(player);
	}

	changePlayer();

	fetch("asocijacije.json").then(blob => blob.json()).then(data => {
	    answerArr.push(...data);
	}).then(passValues);

	function passValues() {
		const randNum = Math.floor(Math.random() * answerArr.length);
		const currentArr = answerArr[randNum]; 
		mainInput.dataset.mainAnswer = currentArr.Final;

	    sectionChilds.forEach((elem, i, arr) => {
	        const parentData = elem[0].parentNode.dataset.letter; // A, B, C...
	        const currentKey = Object.keys(currentArr[parentData]); // "A1 A2 A3... | B1 B2 B3"
	        currentKey.forEach((key, j) => {
	            elem[j].dataset.content = currentArr[parentData][key];
	            elem[j].addEventListener("click", showField);
	        });
	    });
	}

	function showField(e) {
	 	
	 	if (this.tagName == "FORM" || playerObject.clickedTimes != 0 || this.dataset.open == "true") return;
		 	if (this.dataset.open !== "true") playerObject.clickedTimes+=1; 
		 	button.disabled = false;
			button.style.cursor = 'pointer';
		 	allInputs.forEach(input => {
			if (input.dataset.canOpen == "true" && input.dataset.open != "true") {
			 input.removeAttribute("disabled");
			}else if (input.dataset.open == "true") {
				mainInput.disabled = false
			};
				});

		    this.textContent = this.dataset.content;
		    this.dataset.open = "true";
		    const inputSibling = this.parentElement.querySelector("form input");
		     inputSibling.dataset.canOpen = "true";
		     inputSibling.removeAttribute("disabled");  
	}

	function checkAnswer(e) {
		e.preventDefault();
		const input = this.querySelector("input");
		if (input.value.toLowerCase() === this.dataset.content.toLowerCase()) {
			addPoints(input);
			correctAnswer(input, this);
		}else {
			this.reset();
			reset();
		}
	}

	function correctAnswer(input, elem) {
			mainInput.disabled = false;
			input.setAttribute("disabled", "true");
			const sectionElements = elem.parentElement.children;
			input.dataset.open = "true";
			Array.from(sectionElements).forEach((sectionElement, i) => {
				if (sectionElement.tagName == "FORM") return;
				sectionElement.textContent = sectionElement.dataset.content;
				sectionElement.dataset.open = "true";
				animate(sectionElement, i);
			});
			input.classList.add(player);
	}

	function addPoints(input) {
		let divs = input.parentElement.parentElement.querySelectorAll("div");
		playerObject[player] += 2;
		divs.forEach(div => {
			if (!div.dataset.open) {
				playerObject[player] += 2;
			}
		});	
			document.querySelector(`#${player} + div`).textContent = playerObject[player];
	}

	function checkMainAnswer(e) {
		e.preventDefault();
		if (mainInput.value.toLowerCase() === mainInput.dataset.mainAnswer.toLowerCase()) {
			mainInput.setAttribute("disabled", "true");
			let points = closedFields();
			playerObject[player] += points;
			document.querySelector(`#${player} + div`).textContent = playerObject[player];
			openAll();
			clearInterval(interval);
			timeLeft.parentElement.textContent = "KRAJ";
			button.disabled = true;
		}else {
			reset();
			this.reset();
		}
	}

	function openAll() {
		allElements.forEach((element, index) => {
			if (element.tagName != "FORM") {
				element.textContent = element.dataset.content;			
				animate(element, index, 50);
			}else {
				const formChild = element.querySelector("input");
				formChild.value = element.dataset.content;
				animate(formChild, index, 50);
				}
			mainInput.classList.add(player);
		});	
	}	

	function closedFields() {
		const closedFields = Array.from(fields).filter((field, index) => {
			return !field.dataset.open;
		}).length;

		const inputFields = Array.from(sideInputs).filter((inField, index) => {
			return !inField.dataset.open;
		}).length;
		return (2*closedFields) + (5*inputFields);
	}

	function animate(elements, time, interval = 70) {
		setTimeout((e) => {
			if (elements.classList.length < 2) {
				elements.classList.add(player);
			}
		}, time*interval);
	}

	function changeTime(seconds = 15) {
		let now = Date.now();
		let then = now + seconds * 1000;  /// 52000 
		let secs = seconds;
		timeLeft.textContent = secs;
		interval = setInterval((e) => {
			secs = Math.round((then - Date.now()) / 1000); 
			timeLeft.textContent = secs;
			if (secs == 0) {
				reset();
				return;
			}
		}, 1000);
	}
	changeTime();

	function reset() {
		clearInterval(interval);
		changePlayer();
		changeTime();
	}

	sideForms.forEach(form => form.addEventListener("submit", checkAnswer));

	button.addEventListener("click", (e) => {
		if (playerObject.clickedTimes == 0) return;
		reset();
	});

	mainForm.addEventListener("submit", checkMainAnswer);	
}

