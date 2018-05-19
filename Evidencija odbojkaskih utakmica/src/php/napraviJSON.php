<?php
$_POST = json_decode(file_get_contents('php://input'), true); // mora da se stavi da bi radilo sa fetch

$nazivServera = "localhost";
$username = "root";
$lozinka = "";
$nazivBaze = "evidencijautakmica";

if (isset($_POST['name']))    
{  
    $imeTabele = $_POST['name'];
}  else {
    echo "Greska u serveru, nije moguce dobiti imeSekcije!";
} 

 if ($imeTabele == "#prikazGostiju") {
     $GLOBALS['trenutnaTabela'] = "gostujuceekipe";
 }  else if ($imeTabele == "#prikazDomacina") {
     $GLOBALS['trenutnaTabela'] = "domaceekipe";
    } else if ($imeTabele == "#pregled") {
        $GLOBALS['trenutnaTabela'] = "teren";
 }else {
    $GLOBALS['trenutnaTabela'] = "zakazivanje termina"; // ova tabela ne treba da se fetchuje
 }


function getData() {
    $connect = mysqli_connect("localhost", "root", "", "evidencijautakmica") or die("Greska pri povezivanju sa serverom");
    $query = "SELECT * FROM {$GLOBALS['trenutnaTabela']}";
   // echo " Unutar get data --> { $GLOBALS['trenutnaTabela']}";
    $result = mysqli_query($connect, $query);
    $resultData = array();
    if ( $GLOBALS['trenutnaTabela'] == "gostujuceekipe" || $GLOBALS['trenutnaTabela'] == "domaceekipe") {
        while($row = mysqli_fetch_array($result)) {
            $resultData[] = array(
                "strana" => $row["strana"],
                "naziv" => $row["naziv"],
                "bojaDresova" => $row["bojaDresova"]
            );
        }
        return json_encode($resultData);
    } else if ( $GLOBALS['trenutnaTabela'] == "teren") {
        while($row = mysqli_fetch_array($result)) {
            $resultData[] = array(
                "naziv" => $row["naziv"],
                "nazivDomacina" => $row["nazivDomacina"],
                "nazivGostiju" => $row["nazivGostiju"],
                "datumUtakmice" => $row["datumUtakmice"],
                "cena" => $row["cena"]
            );
        }
        return json_encode($resultData);
    } else {
        // ukoliko je kliknuto na prvu kolonu (zakazivanje utakmice ne radi nista!)
        return false;
    }
}

$nazivFajla = $trenutnaTabela . ".json";

if (file_put_contents($nazivFajla, getData())) {
   echo getData();
  // echo $trenutnaTabela;
} else {
    echo " Nije moguce napraviti json fajl";
}

?>