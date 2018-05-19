<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Evidencija odbojkaskih utakmica</title>
    <link rel="stylesheet" href="src/css/style.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/dataTables.jqueryui.min.css">
    
</head>
<body>
<div id="wrapper">
    <header>
        <img src="slike/logo.png" alt="logo">
        <h1>Evidencija i zakazivanje odbojkaskih utakmica</h1>
    </header>
    <nav>
        <ul id="glavniNav">
            <li data-target="#zakazivanje" class="active">Zakazivanje termina</li>
            <li data-target="#prikazDomacina">Prikaz domacih timova</li>
            <li data-target="#prikazGostiju">Prikaz gostujucih timova</li>
            <li data-target="#pregled">Pregled zakazanih utakmica</li>
        </ul>
    </nav>
    
    <main id="glavnaSekcija">
        <div class="loader-overlay">
            <h3>Sacekajte da se sadrzaj ucita</h3>
            <img id="loading" src="slike/loader.gif" alt="loader">
        </div>
        <section class="activeSection" id="zakazivanje">
            <h3>Zakazi utakmicu</h3>
            <form id="formaZaZakazivanje">
                <div id="takmicari">
                    <div id="sekcijaZaDomace">
                        <label for="imeDomacina">Uneti naziv ekipe domacina</label>
                        <input required="true" tabindex="-1" type="text" id="imeDomacina">            
                        <br>
                        <label for="bojaDresovaDomacina">Uneti boju dresova ekipe domacina</label>
                        <input required="true" tabindex="-1" type="text" id="bojaDresovaDomacina">
                    </div>
                    
                    <div id="sekcijaZaGoste">
                        <label for="imeGostiju">Uneti naziv ekipe gostiju</label>
                        <input required="true" tabindex="-1" type="text" id="imeGostiju">
                        <br>
                        <label for="bojaDresovaGostiju">Uneti boju dresova ekipe gostiju</label>
                        <input required="true" tabindex="-1" type="text" id="bojaDresovaGostiju">
                    </div>
                </div> <!-- kraj div-a za takmicare -->
                    <button type="button" id="dalje">Izabrati teren</button>
                    <div id="sekcijaZaTeren">
                        <label for="nazivTerena">Uneti naziv terena</label>
                        <input required="true" tabindex="-1" type="text" id="nazivTerena">
                        <label for="datumUtakmice">Uneti datum utakmice</label>
                        <input required="true" tabindex="-1" type="text" id="datumUtakmice">
                        <label for="cenaUtakmice">Uneti cenu utakmice (u evrima)</label>
                        <input required="true" tabindex="-1" type="number" min="0" max="1000" id="cenaUtakmice">
                    </div> <!-- kraj sekcije za teren -->

                <div class="btn-grupa">
                    <button type="reset">Obrisi</button>
                    <button id="dugmeZaSlanje" disabled="true" type="submit">Potvrdi</button>
                </div>
            </form>
        </section>
        
    <!-- razmak -->

        <section id="prikazDomacina">
            <h3>Tabelarni prikaz ekipa domacina</h3>
            <table class="tabelaIgraca">
                <thead>
                    <tr>
                        <td>strana</td>
                        <td>naziv</td>
                        <td>boja dresova</td>
                    </tr>
                </thead>
            </table>
        </section>
        <section id="prikazGostiju">
            <h3>Tabelarni prikaz gostujucih ekipa</h3>
            <table class="tabelaIgraca">
            <thead>
                    <tr>
                        <td>strana</td>
                        <td>naziv</td>
                        <td>boja dresova</td>
                    </tr>
            </table>
        </section>
        <section id="pregled">
            <h3>Pregled zakazanih utakmica</h3>
            <table class="tabelaTerena">
                <thead>
                <tr>
                    <td>Naziv</td>
                    <td>Naziv domacina</td>
                    <td>Naziv gostiju</td>
                    <td>Datum utakmice</td>
                </tr>
                </thead>
            </table>
        </section>
    </main>

    <footer>
        <h4>Sajt napravio: Predrag Nestl IT 34/15</h4>
    </footer>
</div>


    <script src="http://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script src="http://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.16/js/dataTables.jqueryui.min.js"></script>
    <script src="src/js/klase.js"></script>
    <script src="src/js/app.js"></script>
    
</body>
</html>