let traffic = document.querySelector('.traffic');
let red = traffic.querySelector('.red');
let green = traffic.querySelector('.green');
let isRed = true;
let rotation = false;
let rotation1 = false;
let car = document.querySelector('.car');
let car1 = document.querySelector('.car1');
let stop = document.querySelector('.stop');

function changeColor () {

	if(red.classList.contains('active')){
		red.classList.remove('active');
		green.classList.add('active');
		isRed = false;
	}else{
		green.classList.remove('active');
		red.classList.add('active');
		isRed = true;
	}

}

setInterval(changeColor,5000);


function stopCar () {
	let stopRec = stop.getBoundingClientRect();
	let carRec = car.getBoundingClientRect();
	let car1Rec = car1.getBoundingClientRect();
	let carLeft = carRec.left;
	let car1Left = car1Rec.left
	let left = stopRec.left;
	let right = stopRec.right;

	if((isRed && (carLeft > left && carLeft < right)) && !rotation){
		car.style.animationPlayState = 'paused';
	}else{
		car.style.animationPlayState = 'running';
	}

	if((isRed && (car1Left > left && car1Left < right)) && !rotation1){
		car1.style.animationPlayState = 'paused';
	}else{
		car1.style.animationPlayState = 'running';
	}
}

setInterval(stopCar,200);

window.addEventListener('keyup',function (e) {

	if(e.which === 32){
		rotation = !rotation;
		car.classList.toggle('rotation');
	}

	if(e.which === 17){
		rotation1 = !rotation1;
		car1.classList.toggle('rotation1');
	}

})