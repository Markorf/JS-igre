    $(function() {

    $.fn.dataTable.ext.errMode = 'none'; // iskljucivanje alert-a

    const objekatZaPolja = {
        nazivTerena: "",
        datumUtakmice: "",
        cena: "",
        imeDomacina: "",
        bojaDresovaDomacina: "",
        imeGosta: "",
        bojaDresovaGostiju: ""
    };
    // funkcije
    function promeniSekciju() {
        const kliknutiElement = $(this);
        const nazivSekcije = kliknutiElement.data('target');
        const odgovarajucaSekcija = $(nazivSekcije);
        odgovarajucaSekcija.siblings().hide().end().fadeIn("slow");
        kliknutiElement.addClass("active").siblings().removeClass("active");
        if (nazivSekcije == "#zakazivanje") {
            return; // ako je kliknuto na prvu sekciju ne radi dalje nista
        }
        $("div.loader-overlay").css("display", "flex");
        fetch("./src/php/napraviJSON.php", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nazivSekcije,
            })
        }).then(res => res.json())
            .then(data => {
            $("div.loader-overlay").fadeOut(700);
            return popuniTabeluUSekciji(data, odgovarajucaSekcija);
        })
            .catch(err => console.log(err)); // uhvatice gresku ako stisnem na prvu kolonu
    } // kraj fje promeniSekciju
    function popuniTabeluUSekciji(data, odgovarajucaSekcija) {
        const trenutnaTabela = odgovarajucaSekcija.find("table");
        if (trenutnaTabela.hasClass("tabelaIgraca")) {
            trenutnaTabela.DataTable({
                data: data,
                columns: [
                    { "data": "strana" },
                    { "data": "naziv" },
                    { "data": "bojaDresova" },
                ]
            });
        }
        else if (trenutnaTabela.hasClass("tabelaTerena")) {
            trenutnaTabela.DataTable({
                data: data,
                columns: [
                    { "data": "naziv" },
                    { "data": "nazivDomacina" },
                    { "data": "nazivGostiju" },
                    { "data": "datumUtakmice" },
                ]
            });
        }
    } // kraj fje popuniTabeluUSekciji
    function izaberiTeren() {
        const sekcijaZaTakmicare = $("div#takmicari");
        const poljaZaEkipe = sekcijaZaTakmicare.find("input");
        objekatZaPolja.imeDomacina = String(poljaZaEkipe.eq(0).val());
        objekatZaPolja.bojaDresovaDomacina = String(poljaZaEkipe.eq(1).val());
        objekatZaPolja.imeGosta = String(poljaZaEkipe.eq(2).val());
        objekatZaPolja.bojaDresovaGostiju = String(poljaZaEkipe.eq(3).val());
        for (const polje of poljaZaEkipe) {
            if ($(polje).val() == "" || $(polje).val() == undefined || $(polje).val() == null) {
                alert("Nisu sva polja popunjena, molimo vas da popunite prazna polja.");
                return false;
            }
        } // moraju sva polja biti popunjena da bi dovde dosao program
        $(this).hide(); // sakriji dugme
        $("#dugmeZaSlanje").removeAttr("disabled");
        sekcijaZaTakmicare.fadeOut();
        $("#sekcijaZaTeren").find("#datumUtakmice").datepicker({
            minDate: new Date(2018, 2 - 2, 2)
        });
        $("#sekcijaZaTeren").fadeIn("fast", function () {
            $(this).css("display", "flex");
        });
    } // kraj fje izaberi teren
    function pripremiZaSlanje(e) {
        // mora sve da bude popunjeno da bi dovde dosao program
        e.preventDefault();
        const sekcijaZaTeren = $("#sekcijaZaTeren");
        const poljaZaTeren = sekcijaZaTeren.find("input");
        objekatZaPolja.nazivTerena = String(poljaZaTeren.eq(0).val());
        objekatZaPolja.datumUtakmice = String(poljaZaTeren.eq(1).val());
        objekatZaPolja.cena = String(poljaZaTeren.eq(2).val() + "e");
        // provera da li ima praznih mesta
        for (const polje of poljaZaTeren) {
            if ($(polje).val() == "" || $(polje).val() == "undefined" || $(polje).val() == null) {
                alert("Morate popuniti sva polja!");
                return false; // izadji iz fje ako nije neko polje popunjeno
            }                
        }
        // pravljenje klasa
        //redosled: za domacina: Naziv, Boja dresova, id terena, id domacina
        //redosled za gosta: Naziv, Boja dresova, id terena, id protivnika, id
        //redosled za teren: Id, naziv, naziv domacina, naziv gostiju, datum utakmice, cena
        $("#sekcijaZaTeren").hide("slow", function () {
            $("div#takmicari").show(500);
            $("#formaZaZakazivanje")[0].reset(); // obrisi vrednosti svih polja
            $("#dalje").show();
            $("#dugmeZaSlanje").attr("disabled", "true");
        }); // prikazi i sakri sekcije
        const domacaEkipa = new Domaci(objekatZaPolja.imeDomacina, objekatZaPolja.bojaDresovaDomacina);
        const gostujucaEkipa = new Gosti(objekatZaPolja.imeGosta, objekatZaPolja.bojaDresovaGostiju);
        const terenZaIgru = new Teren(objekatZaPolja.nazivTerena, objekatZaPolja.imeDomacina, objekatZaPolja.imeGosta, objekatZaPolja.datumUtakmice, objekatZaPolja.cena);
            
        const objekatZaSlanje = {
            domacaEkipa,
            gostujucaEkipa,
            terenZaIgru
        };
        return posaljiPodatkeNaServer(objekatZaSlanje);
    }
    function posaljiPodatkeNaServer(objekatZaSlanje) {
        fetch("./src/php/posaljiEvidenciju.php", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                objekatZaSlanje
            })
        }).then(res => res.text())
            .then(data => {
            alert(data.trim());
        })
            .catch(err => {
            alert("Doslo je do greske, pogledate u konzolu za vise informacija ili pokusajte ponovo");
            console.log(err);
        });
    }
    // eventi
    $("ul li").on("click", promeniSekciju);
    $("#formaZaZakazivanje").on("submit", pripremiZaSlanje);
    $("#dalje").on("click", izaberiTeren);
}); // kraj