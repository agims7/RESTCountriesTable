var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('#countries');
var inputElement = document.getElementById('country-name');

$('#country-name').keypress(function (event) {
	if (event.keyCode == 13) {
		event.preventDefault();
		searchCountries();
		clearText();
	}
});

$('#search').click(function () {
	searchCountries();
	clearText();
});

function clearText() {
	inputElement.value = "";
}

function mlnFormatter(num) {
	if (num > 999999) {
		return (num/1000000).toFixed(1) + ' mln';
	}
	if (num > 999) {
		return (num/1000).toFixed(1) + ' k';
	}
}

function searchCountries() {
	var countryName = $('#country-name').val();
	if (!countryName) countryName = 'Poland';
	$.ajax({
		url: url + countryName,
		method: 'GET',
		success: showCountriesList
	});
}

function showCountriesList(resp) {
	countriesList.empty();
	resp.forEach(function (item) {
		var box = $('<div>').addClass('box');
		var country = $('<p>').addClass('country').text(item.name);
		var capital = $('<p>').addClass('capital').text(item.capital);
		var currencies = $('<p>').addClass('currencies').text(item.currencies);
		var population = $('<p>').addClass('population').text(mlnFormatter(item.population));
		var subregion = $('<p>').addClass('subregion').text(item.subregion);
		var nativeName = $('<p>').addClass('nativeName').text(item.nativeName);

		var countryBox = $('<p>').addClass('countryBox').text('Country:');
		var capitalBox = $('<p>').addClass('capitalBox').text('Capital:');
		var currenciesBox = $('<p>').addClass('currenciesBox').text('Currencies:');
		var populationBox = $('<p>').addClass('populationBox').text('Population:');
		var subregionBox = $('<p>').addClass('subregionBox').text('Subregion:');
		var nativeNameBox = $('<p>').addClass('nativeNameBox').text('Native name:');

		box.append(countryBox)
			.append(country)
			.append(capitalBox)
			.append(capital)
			.append(currenciesBox)
			.append(currencies)
			.append(populationBox)
			.append(population)
			.append(subregionBox)
			.append(subregion)
			.append(nativeNameBox)
			.append(nativeName);

		box.appendTo(countriesList);
	});
}