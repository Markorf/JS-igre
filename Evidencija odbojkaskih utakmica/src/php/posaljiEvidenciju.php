<?php

$_POST = json_decode(file_get_contents('php://input'), true); // mora da se stavi da bi radilo sa fetch
$primljeniObjekat = $_POST["objekatZaSlanje"];

$nazivServera = "localhost";
$username = "root";
$lozinka = "";
$nazivBaze = "evidencijautakmica";

$domacaEkipa = $primljeniObjekat['domacaEkipa'];
$gostujucaEkipa = $primljeniObjekat['gostujucaEkipa'];
$teren = $primljeniObjekat['terenZaIgru'];

// Pravljanje konekcije
$conn = new mysqli($nazivServera, $username, $lozinka, $nazivBaze);
// Provera konekcije
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO domaceekipe (strana, naziv, bojaDresova)
VALUES ('{$domacaEkipa["strana"]}', '{$domacaEkipa["naziv"]}', '{$domacaEkipa["bojaDresova"]}');";
$sql.= "INSERT INTO gostujuceekipe (strana, naziv, bojaDresova)
VALUES ('{$gostujucaEkipa["strana"]}', '{$gostujucaEkipa["naziv"]}', '{$gostujucaEkipa["bojaDresova"]}');";
$sql.= "INSERT INTO teren (naziv, nazivDomacina, nazivGostiju, datumUtakmice, cena)
VALUES ('{$teren["naziv"]}', '{$teren["nazivDomacina"]}', '{$teren["nazivGostiju"]}', '{$teren["datumUtakmice"]}', '{$teren["cena"]}')";

if ($conn->multi_query($sql) === TRUE) {
    echo "Evidencija je uspesno poslata u bazu podataka!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>


