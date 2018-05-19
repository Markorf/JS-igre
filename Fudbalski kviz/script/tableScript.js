"use strict";

$(document).ready(tableScriptModule);

function tableScriptModule() {

// konstante

const mainTableObject = {
	data: null
},
infoRow = $("table .add"),
sortBtn = $(".sort"),
filterBtn = $(".filter"),
vipBtn = $(".vip"),
specialBtns = $("tr.special").find("button"),
filterName = $(".filterInput"),
vipPw = "tastatura";

$.get("takmicari.json").then(data => {
	if (!data || data.length == 0) {
		alert("Trenutno nema takmicara");
		return false;
	}else {
		mainTableObject.data = data;
		renderHTML(mainTableObject.data);
		
	}
});

// funkcije

function renderHTML(data) {
	if ($("tr.add")) {
		$("tr.add").remove();
	}
	data.forEach(takmicar => {
	const newRow = $("<tr class='add'></tr>");
		newRow.append(`<td>${takmicar.id}</td> <td>${takmicar.ime}</td> <td>${takmicar.brojPoena}</td> `);
		$(".mainTable").append(newRow);
	});
}
class regularUser {
	constructor(name) {
		this.name = name;
		this.vip = false;
	}
	filterResults(e) {
		const value = $(this).val().toLowerCase();
		$("table tr.add").each((index, elem) => {
			$(elem).toggle($(elem).text().toLowerCase().indexOf(value) > -1);		
		});
	}
	becomeVip() {
		const userPw = prompt("Uneti lozinku za specijalnog korisnika: ", "");
		if (userPw == vipPw) {
			someUser = new vipUser("vip user");
			$.each(specialBtns, function(index, btn){
				$(btn).attr("disabled", false).removeClass("disabled").addClass("danger");
			});
			alert("Lozinka je tacna, sada ste postali vip korisnik!");
			$(this).attr("disabled", true).addClass("disabled");
			specialBtns.eq(0).on("click", function() {
				someUser.removeUser();
			});
			specialBtns.eq(1).on("click", function() {
				someUser.findUser();
			});
		}else {
			alert("Lozinka je ne tacna, pokusajte ponovo!");
		}
	}
	sortResults() {
		const sortedData = mainTableObject.data.sort((firstPlayer, secondPlayer) => {
			return firstPlayer.brojPoena > secondPlayer.brojPoena ? -1 : 1;
		});
		return renderHTML(sortedData);
	}
}
let selectedObject;
class vipUser extends regularUser {
	constructor(name) {
		super(name);
		this.vip = true;
	}
	removeUser() {
		if (this.vip == true) {
			const search = this.findUser(false);
			if (search.found == true) {
				alert("Korisnik je pronadjen i obrisan!");
				 selectedObject = mainTableObject.data.splice(Number(search.requested), 1);
				$.post("removeFromTable.php", ...selectedObject).then((returnedData) => {
					//console.log(returnedData);
					renderHTML(mainTableObject.data);
				}).catch(err => {
					alert("Doslo je do greske, pogledajte u konzolu za vise informacija!");
					console.log(err);
					return;
				});
			}else {
				alert("Korisnik nije pronadjen");
				return false;
			}

			return true;
		}
	}
	findUser(find = true) {
		const userId = prompt("Ukucati id korisnika kojeg zelite da obrisete: ", "");
		let currentUser;
		let currentIndex = Number(mainTableObject.data.findIndex(user => user.id == userId));
		//console.log(currentIndex);	
		if (currentIndex >= 0) {
			currentUser = mainTableObject.data[currentIndex];

			
		}
		if (currentIndex < 0 && find) {
			alert("Nije moguce naci korisnika koji ima id: " + userId);
			return false;
		}

		if (find == true && currentIndex >= 0) {
			alert(`Igrac ${mainTableObject.data[currentIndex].ime} ima ${currentUser.brojPoena} poena!`);
			//console.log(currentUser);
			
		}		
		return {
			found: currentIndex >= 0,
			requested: currentIndex
		};
	}
}
let someUser = new regularUser("user1");

// bind events
sortBtn.on("click", someUser.sortResults);
filterBtn.on("click", function() {
	filterName.toggleClass("hidden");
});
vipBtn.on("click", someUser.becomeVip);
filterName.on("keyup", someUser.filterResults);

$("#pocetna").on("click", function() {
	window.location.assign("index.php");
});

const publicApi = {
	someUser,
};

return {
	publicApi
};

}