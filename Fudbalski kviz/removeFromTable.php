<?php

	$id = $_POST["id"];
	$name = $_POST["ime"];
	$points = $_POST["brojPoena"]; 
	if (isset($name) && isset($points) && isset($id)) {
		$con = mysqli_connect("localhost", "root", "", "kviz");
		$sql = "DELETE FROM rank WHERE id = $id";

		$result = mysqli_query($con, $sql) or die("Greska u query-ju $sql");

		echo "Ok query";
	}else {
		echo "Greska pri brisanju rezultata";
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