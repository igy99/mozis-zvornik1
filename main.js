// stanica 1 
var glavni_proizvodi = [  // niz sa objektima koji u sebi sadrze informcije o proizvodu 
	// literalna notacija objekata
	{
		ime: "Namestaj",
		slika: "namjestaj.jpg"
	},
	{
		ime: "Euro palete",
		slika: "p4.jpg"
	},
	{
		ime: "Blok palete",
		slika: "blok_palete.jpg"
	},
	{
		ime: "Ciglarske palete",
		slika: "p1.jpg"
	}
];


var proizvodi = document.getElementById("proizvodi");
// funkcija koja trazi elemente iz html-a koji je sa ovim id-om
// unutar promenjive proizvodi cuvamo referencu na HTML element sa id-jem proizvodi



if (proizvodi) // provjera da li je ovaj element u html-u
{

	// pomocu forEeach petlje prolazimo kroz niz objekata glavni_proizvodi
	// za svaki od tih objekata koristeci naziv item za pojedinacni objekat iz niza
	// za svaki od njih unutar gore selektovanog praznog html elementa proizvodi
	// ispisujemo dole predstavljeni html sablon (kartice proizvoda)
	// pri tome se dinamicki unutar sablona ugradjuju slika i ime
	// pri cemu je slika vrednost atributa slika pojedinacnog objekta i tako isto i za ime

	glavni_proizvodi.forEach(item => {
		proizvodi.innerHTML +=
			`<div class="proizvod">
				<div class="proizvod_sadrzilac">
					<img class="proizvod_slika" 
						onmouseover="prikaziElementZaPunuSliku(event)" 
						width="100%" height="200px" src="${item.slika}" />
					<div class="prikazi_veliku_sliku" onmouseout="sakrijElement(event)"></div>
				</div>
				<div class="proizvod_opis">${item.ime}</div>
			</div>`;
	});
}





function prikaziElementZaPunuSliku(e) // funkicija za prikazivanje elementa posle njega time sto mu se dodeljuje aktivna klasa
{
	// ova funkcija se poziva prevlacenjem kursora misa preko slike na kartici
	// (pogledaj html gore)
	// pri tome salje se kao ulazni parametar event - dogadjaj koji se desio
	// taj dogadjaj se dobija kao objekat koji ima razne atribute
	// unutar atributa target sadrze se informacije o nosiocu dogadjaja
	// tj html elementu nad kojim se desio dogadjaj
	// pomocu atributa nextElementSibling selekujemo sledeci element koji dodje nakon slike
	// to je element "<div class="prikazi_veliku_sliku" onmouseout="sakrijElement(event)"></div>",
	// njemu se dodaje klasa active na osnovu cega se aktivira css kod koji prikazuje taj element
	// (lupa)
	e.target.nextElementSibling.classList.add('active');
}

function sakrijElement(e)  // sakriva sebe time sto sebi sklanja aktivnu klasu  
{
	// kad se sa prikazane slike lupe ukloni kursor misa 
	// uklanja se klasa "active" i vise nije prikazan element sa lupom
	e.target.classList.remove('active');
}

var prikazi_veliku_sliku = document.querySelectorAll('.prikazi_veliku_sliku');
// funkcija za trazi sve elemente u html-u koji imaju ovu klasu
// unutar promenljive selektujemo sve elemente sa klasom prikazi_veliku_sliku
// rezultat dobijamo kao niz html elemenata

var puna_slika = document.querySelector('.puna_slika');
// funkcija trazi prvi element sa ovom klasom
// daje crni prozor unutar koga se nalazi glavna slika

var glavna_slika_za_prikaz = document.getElementById('puna_slika');
// funkcija koja trazi element iz html-a koji je sa ovim id-om
// ovo selektuje html element koji daje uvecanu sliku preko celog ekrana
// on u startu nije vidljiv bice kada se klikne na lupu,
// ovaj element daje samu sliku

prikazi_veliku_sliku.forEach(item => {  // vrti sve pronadjene elemente 
	item.addEventListener("click", function () { //dodaje ivent klik 
		// klikom na lupu, uzima se src atribut (adresa slike) (prethodni html element)
		// i dodeljuje se kao adresa glavnoj slici
		glavna_slika_za_prikaz.src = this.previousElementSibling.src;
		// glavna slika se prikazuje
		puna_slika.style.display = "block";
		pokreniAnimacijuZaVelikuSliku(); // funkcija pokrece animaciju 
	});
});

function pokreniAnimacijuZaVelikuSliku() {

	// definisemo brojac i 
	// pokrece se interval, interval uvek dobija dva ulazna parametra
	// prvi je funkcija koju treba izvrsiti
	// drugi je vremenski period nakon koga treba ponoviti izvrsenje funkcije
	// unutar funkcije je definisano da se menja stil glavne slike
	// tako da se redovno menja njena udaljenost na levo u procentima
	// tako sto se ta udaljenost smanjuje
	// kada i prestigne vrednost 101, pokrece se clearInterval
	// koji zaustavlja animaciju jer je ona u tom trenutku zavrsena
	var i = 0;
	var animacija = setInterval(function () {
		glavna_slika_za_prikaz.style.left = i - 50 + "%";
		i = i + 10;

		if (i > 101) { clearInterval(animacija); }
	}, 50);
}


var zatvori = document.querySelector('.zatvori');
// funkcija trazi prvi element sa ovom klasom
// to je element X koga vidimo na uvecanom prikazu slike
// on se selektuje i cuva u promenljivoj


if (zatvori) // provjerava da li je ovaj element u html-u
{
	zatvori.addEventListener('click', function () { // dodeljuje mu ivent klik 
		// uklanja se prikaz crnog prozora
		puna_slika.style.display = "none";
		// pomera se slika pocetnu poziciju
		// kako bi se animacija i za sledeci put pravilno izvrsila
		glavna_slika_za_prikaz.style.left = "-50%";
	});
}



function pokaziInfo(e) // dve funckije animacije  
{
	// klikom na element na stranici koji ima klasu info_click (pogledaj stranicu pocetnu)
	// pokrece se ova funkcija 
	var i = -135;
	// pokrece interval koji se ponavlja svake 3 stotinke
	// povecava vrednost bottom atributa roditeljskog divajdera
	// to proizvodi animaciju pomeranja divajdera na gore
	// kada vrednost bottom dostigne 0 divajder je na dnu stranice
	// podignut tako da se ceo vidi
	var animacija = setInterval(function () {
		e.target.parentNode.style.bottom = i + "px";
		i += 10;

		if (i > 0) { clearInterval(animacija); }
	}, 30); // funckije koja pomocu intervala pokrece animaciju 

}


// stranica 2

var prebaci_na_crno = document.querySelector('.prebaci_na_crno'); // funkcija trazi prvi element u klasi 
// selektuje element na stranici onama u kome pise dark mod, i vezuje za njega klik event
// kada je kliknuto pokrece se funkcija
// funkcija selektuje element .tekstonama i njemu menja pozadinsku boju na crnu
if (prebaci_na_crno) {
	prebaci_na_crno.addEventListener('click', function () { // ukoliko pronadje dati element u if petlji mu dodeljuje invent click koji pronalazi element sa tom klasom i dodeljuje mu crvu boju
		document.querySelector('.tekstonama').style.backgroundColor = "#000000";
	});
}

// Stranica poruci.html

// potvrdom forme na ovoj stranici pokrece se ova funkcija
// pogledaj html fajl form on submit

function proveriFormu() {
	// prvo pretpostavimo da je sve u redu, da je sve popunjeno kako treba
	var moze_ici_dalje = true;
	// zatim proveravamo da li je to istina

	// za svako polje za unos, selektujemo to polje, i proveravamo
	// vrednost koja je uneta u polju (value),
	// ako je prazno, bojimo okvir elementa u crvenu boju i kazemo
	// da je moze_ici_dalje = false
	// sto znaci da nije uspesna validacija
	if (document.getElementById('fname').value == "") {
		document.getElementById('fname').style.border = "1px solid #ff0000";
		moze_ici_dalje = false;
	}

	if (document.getElementById('lname').value == "") {
		document.getElementById('lname').style.border = "1px solid #ff0000";
		moze_ici_dalje = false;
	}

	if (document.getElementById('e-mail').value == "") {
		document.getElementById('e-mail').style.border = "1px solid #ff0000";
		moze_ici_dalje = false;
	}

	// ako moze ici dalje ima vrednost true
	// to znaci da nismo otkrili bilo kakvu gresku u ranijim proverama
	// i prikazujemo pop-up prozor
	if (moze_ici_dalje) {
		document.querySelector('.potvrdan_popup').style.display = "block";
		return false;
	}
	return moze_ici_dalje;
}

function zatvoriPotvrdu() {
	// kada dobijemo popup prozor potvrde da je uspesna validacija
	// imamo dugme ok klikom na njega pokrece se ova funkcija
	// ona najpre za svako input polje uklanja unutrasnji sadrzaj
	// prazni polje
	document.getElementById('fname').value = "";
	document.getElementById('lname').value = "";
	document.getElementById('e-mail').value = "";
	// zatim zatvara sam popup prozor
	document.querySelector('.potvrdan_popup').style.display = "none";
}

// kada je tokom validacije otkrivena greska na nekom input polju
// ono dobija crveni okvir
// za svako input polje prilikom kucanja pokrece se ova funkcija
// ona dobija event, preko target atributa dobija html element
// i njemu vraca okvir na sivu boju
function skloniGresku(e) {
	e.target.style.border = "1px solid silver";
}


// Stranica vrsta.html

// ovaj niz objekata zapisan je u JSON sintaksi
// JSON je nacin da se JS objekti cuvaju u bazi podataka
// kada preuzimamo podatke iz baze i koristimo ih u JS
// obavezno to bude u JSON obliku, ovo je simulacija toga
// nismo uzeli iz baze vec smo direktno ovde napisali
// ali tako bi smo i iz baze dobili
// razlika prema obicnoj notaciji objekata jeste to 
// sto se atributi pisu pod navodnicima
var vrste_paleta = [
	{
		"ime": "Ciglarske palete",
		"slika": "p1.jpg"
	},
	{
		"ime": "Euro palete",
		"slika": "p4.jpg"
	},
	{
		"ime": "Namjestaj od paleta",
		"slika": "p1.jpg"
	},
	{
		"ime": "Ciglarske palete",
		"slika": "p1.jpg"
	},
	{
		"ime": "Blok palete",
		"slika": "blok_palete.jpg"
	}
];


var sve_paleta = document.querySelector('.sadrzilac_paleta');
// selektujemo prazan divajder na stranici

// pomocu petlje izlistavamo niz JSON objekata unutar divajdera
// svaka slika koja je dinamicki izlistana na klik poziva funkciju 
// koja prikazuje sliku u punoj velicini
if (sve_paleta) {
	vrste_paleta.forEach(item => {
		sve_paleta.innerHTML +=
			`<div class="div-slike">
				<img onclick="prikaziVelikuSliku(event)" src="${item['slika']}" width="600" height="400">
				<div class="div-tekst">${item['ime']}</div>
			</div>`;
	});
}

// ova funkcija prikazuje sliku u punoj velicini
// selektuje element (img element) na straici sa id-jem puna slika
// njegovom src atributu dodeljuje vrednost src atributa na koji je kliknuto
// prikazuje se mracni prozor
// i pokrece animacija za sliku (vidi gore)
function prikaziVelikuSliku(e) {
	var velika_slika = document.getElementById('puna_slika');
	velika_slika.src = e.target.src;
	puna_slika.style.display = "block";
	pokreniAnimacijuZaVelikuSliku();
}




// gde god stoji function - to je definicija funkcije
// kada stoji => to je takozvani arrow funkcion ili strela funkcija (nova sintaksa)
// sta god boji plavom bojom a nema funcion pored sebe to je poziv funkcije
// gde god imamo nesto pa tacka nesto to je objekat
// sta god je crvene boje to je atribut objekta
// sta god da je tirkizne boje to je sistemska ugradjena funkcija

