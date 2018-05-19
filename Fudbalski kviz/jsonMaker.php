<?php 
	// Create dynamic JSON file in PHP MySql

function get_data() {
	$connect = mysqli_connect("localhost", "root", "", "kviz");
	$query = "SELECT * FROM pitanja";
	$result = mysqli_query($connect, $query);
	$questions_data = array();
	while($row = mysqli_fetch_array($result)) {
		$questions_data[] = array(
			"id" => $row["id"],
			"text" => $row["text"],
			"A" => $row["A"],
			"B" => $row["B"],
			"C" => $row["C"],
			"D" => $row["D"],
			"tacno" => $row["tacno"]
		);	
	}
return json_encode($questions_data);
}

// echo "<pre>";
// print_r(get_data());
// echo "</pre>";

$file_name = 'pitanja.json';
if (file_put_contents($file_name, get_data())) {
	echo $file_name . ' file created';
}else {
	echo 'Greska, trenutno nije moguce napraviti .json fajl, molimo vas da pokusate kasnije';
}


?>