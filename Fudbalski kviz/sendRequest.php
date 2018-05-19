<?php
	$name = $_POST["name"];
	$points = $_POST["points"]; 
	if (isset($name) && isset($points)) {
		$con = mysqli_connect("localhost", "root", "", "kviz");
		$sql = "INSERT INTO rank (ime, brojPoena) VALUES ('$name', '$points')";

		$result = mysqli_query($con, $sql) or die("Los query $sql");

		echo "Ok query";
	}else {
		echo "Greska, nisu unete neke od vrednosti: ime, poeni ili checkbox";
	}

	function get_data() {
		$connect = mysqli_connect("localhost", "root", "", "kviz");
		$query = "SELECT * FROM rank";
		$result = mysqli_query($connect, $query);
		$questions_data = array();
		while($row = mysqli_fetch_array($result)) {
			$questions_data[] = array(
				"id" => $row["id"],
				"ime" => $row["ime"],
				"brojPoena" => $row["brojPoena"]
			);	
		}
	return json_encode($questions_data);
	}

	// echo "<pre>";
	// print_r(get_data());
	// echo "</pre>";

	$file_name = 'takmicari.json';
	if (file_put_contents($file_name, get_data())) {
		echo $file_name . ' fajl je napravljen';
	}else {
		echo 'Greska, nije moguce napraviti json fajl, pokusajte ponovo kasnije';
	}

	?>
