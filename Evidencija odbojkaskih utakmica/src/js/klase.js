
const nizTimova = [];
// const napraviRandomBr = (min, max) => {
//         return Math.floor(Math.random() * (max - min) + min);
//     };
    class Ekipa {
        constructor(naziv, bojaDresova) {
            this.naziv = naziv;
            this.bojaDresova = bojaDresova;
            if (new.target == Ekipa) {
                throw new Error("Nije moguce napraviti instancu ove klase jer je ona abstraktna!");
            }
            else {
                nizTimova.push(this);
            }
        }
        infoProtivnika() {
            let protivnik;
            if (this.strana == "Domaci") {
                protivnik = nizTimova[1];
            }
            else {
                protivnik = nizTimova[0];
            }
            return `Vas protivnik je klub ${protivnik.naziv} i njegov id je ${protivnik.id}`;
        }
    }
    class Domaci extends Ekipa {
        constructor(naziv, bojaDresova) {
            super(...arguments);
            this.strana = "Domaci";
        }
    }
    class Gosti extends Ekipa {
        constructor(naziv, bojaDresova) {
            super(...arguments);
            this.strana = "Gosti";
        }
    }
    class Teren {
        constructor(naziv, nazivDomacina, nazivGostiju, datumUtakmice, cena) {
            this.naziv = naziv;
            this.nazivDomacina = nazivDomacina;
            this.nazivGostiju = nazivGostiju;
            this.datumUtakmice = datumUtakmice;
            this.cena = cena;
        }
        prikaziInfo() {
            return `Utakmica se igra na terenu ${this.naziv}. Domacini su ${this.nazivDomacina} a gosti su ${this.nazivGostiju}`;
        }
        promeniCenu(znak, zaKoliko) {
            let novaCena;
            if (znak == "+" || znak == "plus") {
                novaCena = Number.parseInt(this.cena) + zaKoliko;
            }
            else if (znak == "-" || znak == "minus") {
                novaCena = Number.parseInt(this.cena) - zaKoliko;
            }
            else {
                console.log("Unet je pogresan text");
                return "Greska";
            }
            this.cena = String(novaCena) + "e";
            return `Cena je promenjena za ${znak} ${zaKoliko}e`;
        }
    }
