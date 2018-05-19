"use strict";

$(document).ready(myModule);

function myModule() {

// konstante
const logInBtn = $(".logIn"),
mainForm = $("#mainForm"),
loadingSection = $(".toHide"),
headerImg = $("header img"),
jsonInfo = $("#jsonStatus"),
questionSection = $("section.sekcijaPitanja"),
questionTitle = questionSection.find(".nazivPitanja"),
questionIndex = questionSection.find("span.trenutno"),
questionSum = questionSection.find("span.ukupno"),
goodAnswers = questionSection.find("span.tacno"),
badAnswers = questionSection.find("span.netacno"),
tableBtn = $("#tableBtn"),

mainObject = {
	minQuestionNum: 1,
	maxQuestionNum: 10,
};

// promenljive

let person, quizInstance;

// funkcije

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function customizeSet() { // napraviti niz od 10 razlicitih brojeva
	const questionSet = new Set();
	while(questionSet.size < mainObject.maxQuestionNum) {
		questionSet.add(randomNum(0, mainObject.maxQuestionNum));
	}
	return Array.from(questionSet);
}

const randomArr = customizeSet();

class User {
	constructor(name, email, wantedQuestions) {
		this.name = name.toUpperCase();
		this.email = email;
		this.correctAnswers = 0;
		this.wrongAnswers = 0;
		this.points = 0;
		this.wantedQuestions = Number(wantedQuestions);
	}

	
	checkPointNum() {
		return `${this.name} ima ukupno ${this.points} poena`;
	}

	addPoints() {
		this.points = this.correctAnswers * 10;
	}
}


class Quiz {
	constructor(data) {
		this.qustionArr = ["A", "B", "C", "D"];
		this.minQuestionNum = mainObject.minQuestionNum;
		this.maxQuestionNum = mainObject.maxQuestionNum;
		this.data = data;
		this.questionNum = 1;
		this.correctAnswer = null;
	}
	changeMinQuestionNumTo(arg = 3) {
		this.minQuestionNum = arg;
	}
	changeMaxQuestionNumTo(arg = 8) {
		this.maxQuestionNum = arg;
	}
}

function showModal(e) {
	e.preventDefault();
	const formObject = {};
	formObject.userName = $(this).find("input[type='text']").val(),
	formObject.userMail = $(this).find("input[type='email']").val(),
	formObject.questionNum = $(this).find("input[type='number']").val();
	questionSum.text(formObject.questionNum);
	logInBtn.addClass("disabled");
	person = new User(formObject.userName, formObject.userMail, formObject.questionNum);
	// TODO - Poslati user-a na server
	$("#myModal, .modal-backdrop").remove();
	showWelcomeMsg();

}

function showWelcomeMsg() {
	loadingSection.find("span").text(person.name);
	loadingSection.fadeIn("fast").delay(500);
	if (jsonInfo.text() == "Error Message") {
		alert("Nije moguce napraviti json fajl, pokusajte ponovo da se ulogujete!");
		return;
	}
	return makeRequest();
}

function makeRequest() {
	$.get("pitanja.json").then(data => {
		//console.log(data);
		quizInstance = new Quiz(data);
		loadingSection.fadeOut("slow", function() {
			makeQuestions(data);
		});
	}).catch(err => {
		alert("Postoji problem sa konekcijom, pokusajte ponovo i pogledajte konzolu!");
		console.log(err);
		return false;
	});
}

function makeQuestions() {
	if (quizInstance.questionNum > person.wantedQuestions) {
		endAndSend();
		return; // ukoliko neko predje limit zaustavi f-ju
	}
	questionSection.show();
	const questionFields = document.querySelectorAll(".pitanja .pitanje");
	questionTitle.text(quizInstance.data[randomArr[quizInstance.questionNum - 1]].text); // - 1 zbog razlike u nizu (0 - 1)
	quizInstance.correctAnswer = quizInstance.data[randomArr[quizInstance.questionNum - 1]].tacno;
	quizInstance.qustionArr.forEach((question, index) => {
		questionFields[index].textContent = quizInstance.data[randomArr[quizInstance.questionNum - 1]][question];
	});
}

function checkAnswer() {
	if (quizInstance.questionNum > person.wantedQuestions) {
		return; // ukoliko neko predje limit zaustavi f-ju
	}

	if ($(this).text() === quizInstance.correctAnswer) {
		person.correctAnswers++;
		person.addPoints();
	}else {
		person.wrongAnswers++;
	}
	quizInstance.questionNum++;
	if (quizInstance.questionNum <= person.wantedQuestions) {
		questionIndex.text(quizInstance.questionNum);
	}
	goodAnswers.text(person.correctAnswers);
	badAnswers.text(person.wrongAnswers);
	return makeQuestions(quizInstance.data);
}

function endAndSend() {
	setTimeout(() => {
			alert(person.checkPointNum());
			questionSection.css({
				opacity: 0.7,
				cursor: "not-allowed",
				"pointer-events": "none"
			});
			if (confirm("Igra je gotova! \nIgrati opet? ")) {
				window.location.reload();
			}else {
				alert("Hvala na igri! Mozete pogledati tabelu sa rezultatima");
			}
	}, 700);
		$.post("sendRequest.php", person).then(data => {
			//console.log(data);
		}).catch(err => {
			alert("Postoji greska u povezezivanju (pogledati konzolu za vise informacija!");
			console.log(err);
		});
		return false;
}

// bind events

$(".pitanja .pitanje").on("click", checkAnswer);

headerImg.on("click", function() {
	window.location.reload();
});

tableBtn.one("click", function() { // reload na drugu stranicu
	window.location.assign("http://localhost/SI/tablePage.php");
});

mainForm.one("submit", showModal);

const myPublicApi = {
	quizInstance,
	person,
	randomNum
};

return {
	myPublicApi
};

}