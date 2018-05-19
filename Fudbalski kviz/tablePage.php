<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Table page</title>
    <link rel="icon" type="image/png" href="images/favicon-32x32.png" sizes="32x32" />

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

	<link rel="stylesheet" href="style/tableStyle.css">
</head>
<body>
<div class="container-fluid">
	<header>
		<img src="images/logo.png" alt="logo">
		<h3>Tabelarni prikaz igraca sa brojem osvojenih poena</h3>
		<button id="pocetna" class="btn btn-secondary">Idi na kviz</button>
	</header>
	<main>
		<table class="table-responsive mainTable">
			<thead>
				<tr><td><h3>Tabela sa igracima</h3></td></tr>
			</thead>
			<tbody>	
				<tr>
					<th>ID</th>
					<th>IME</th>
					<th>Broj poena</th>
				</tr>
			</tbody>
			<tfoot>
				<tr class="classic">
				  <td><button class="sort btn btn-primary">Sortiraj</button></td>
				<td><button class="filter btn btn-primary">Filtriraj</button></td>
				<td><button class="vip btn btn-primary">Otkljucaj opcije</button></td>
				</tr>
				<tr class="filtering">
					<td colspan="3"><input type="text" class="hidden filterInput" placeholder="ime koje zelite da filtrirate"></td>
				</tr>
				<tr class="special">
					<td><button disabled="true" class="removeUser btn disabled">Obrisi korisnika</button></td>
					<td><button disabled="true" class="findUser btn disabled">Pronadji korisnika</button></td>
				</tr>
			</tfoot>
		</table>
	</main>
		

</div>
<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
crossorigin="anonymous"></script>
<script src="script/tableScript.js"></script>
</body>
</html>