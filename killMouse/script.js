let mouseEscape = 0;
let killedMice = 0;
let mice = document.querySelectorAll("li img");
let miceArray = Array.from(mice);
const sumMice = miceArray.length;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

window.addEventListener('click', removeMouse, false)

miceArray.forEach(mouse => mouse.addEventListener('transitionend', (e) => {
	if (e.propertyName != 'transform') return;
	$(mouse).css("transform", "translateY(95px)"); // current mouse
	mouseEscape++;  // +2 ce biti ipak
	//console.log(mouseEscape);
}));

function removeMouse (e) {
	if (e.target.className !== 'mouse') {
	mouseEscape++;
	if (mouseEscape == 30) {
			clearInterval(int);
			alert("You loose");
			if (confirm("Play again?")) location.reload();
			else return;
		}
	}else {
		let index = miceArray.findIndex(i => i==e.target);
		$(e.target).fadeOut(300, ()=> $(e.target).remove());
		//mice = document.querySelectorAll("li img");
		miceArray.splice(index, 1);
		killedMice++;

		if (killedMice === sumMice) {
			clearInterval(int);
			alert("You win");
			if (confirm("Play again?")) location.reload();
			else return;
	}
 }
}

function displayMouse() {
	if (mouseEscape == 30) {
		alert("You loose");
		clearInterval(int);
		if (confirm("Play again?")) location.reload();
		else return;
	}
	miceArray[getRandom(0, miceArray.length)].style.transform = `translateY(0px)`;				
}

const int = setInterval(displayMouse, 2000);