<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Test znanja</title>
    <link rel="icon" type="image/png" href="images/favicon-32x32.png" sizes="32x32" />

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <link rel="stylesheet" href="style/style.css">

</head>
<body>
	<p id="jsonStatus" class="hidden">
		<?php include 'jsonMaker.php'; ?>
	</p> <!-- Napravi json fajl sa pitanjima -->
	<div class="container-fluid">
    <header>
    	<img src="images/logo.png" alt="logo">
    	<h2>Kviz fudbalskog znanja</h2>
    	<div class="btn-container">
    	<button class="btn btn-primary logIn" data-toggle="modal" data-target="#myModal">Ulogujte se za igru</button>
    	<button id="tableBtn" class="btn btn-danger">Prikazi tabelu</button>
    		
    	</div>
    </header>

	<main> <!-- box-pitanja + pozadina -->
		<section class="sekcijaPitanja">
					<div class="naslov">
					<p class="redniBr"><span class="trenutno">1</span> / <span class="ukupno">5</span></p>
					<p class="nazivPitanja">Sacekajte da se ucitaju pitanja</p>
					<p class="rezultat">Tacno:<span class="tacno">0</span> / Netacno:<span class="netacno">0</span></p>
				</div>
					<hr>
				<div class="pitanja">
					<p class="pitanje">Prvo pitanje</p>
					<p class="pitanje">Drugo pitanje</p>
					<p class="pitanje">Trece pitanje</p>
					<p class="pitanje">Cetvrto pitanje</p>
				</div>
			</section>

	</main>



	<!-- Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h4 class="modal-title" id="exampleModalLabel">Unesite vase podatke</h4>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <form id="mainForm">
	          <div class="form-group">
	            <label for="ime">Vase ime</label>
	            <input required oninvalid="this.setCustomValidity('Unesite vase ime')" oninput="setCustomValidity('')" type="text" class="form-control" id="ime" placeholder="John Doe">
	          </div>
	          <div class="form-group">
	            <label for="exampleInputEmail1">Email adresa</label>
	            <input required oninvalid="this.setCustomValidity('Unesite vasu email adresu')" oninput="setCustomValidity('')" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="john.doe@gmail.com">
	            <small id="emailHelp" class="form-text text-muted">Ovaj email se nece deliti ni sa kim!</small>
	          </div>
	          <div class="form-group">
	            <label for="brPitanja">Unesite broj pitanja (1-10)</label>
	            <input required oninvalid="this.setCustomValidity('Unesite broj pitanja (1-10)')" oninput="setCustomValidity('')" type="number" class="form-control" min="1" max="10" id="brPitanja" placeholder="5">
	          </div>
			  <div class="form-check">
			      <label class="form-check-label">
			        <input type="checkbox" class="form-check-input" id="myCheck">
			        	Volite kvizove?
			      </label>
			    </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Izadji</button>
		        <button type="submit" class="btn btn-primary" id="submitForm">Potvrdi</button>
		      </div>
	        </form> <!-- Kraj forme -->
	      </div>
	    </div>
	  </div>
	</div> <!-- Kraj za modal -->

	<section class="toHide"> <!-- sekcija za dobrodoslicu -->
		<h2 class="text-center">Cestitamo <span></span>! uspesno ste se prijavili!</h2>
		<p>Molimo vas sacekajte da se sadrzaj ucita</p>
		<img src="images/load.gif" alt="loadingImage">

		
	</section>
	<footer>
		<p>Sajt napravio Marko Medic IT 55/15 &copy</p>
	</footer>
 </div> <!-- Kraj za container-fluid -->

	<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
	crossorigin="anonymous"></script>

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="script/script.js"></script>
</body>
</html>