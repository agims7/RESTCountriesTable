var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('#countries');

$('#search').click(searchCountries);

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
		var country = $('<h2>').addClass('country').text(item.name);
		var capital = $('<p>').addClass('capital').text(item.capital);
		var currencies = $('<p>').addClass('currencies').text(item.currencies);
		var population = $('<p>').addClass('population').text(item.population);
		var subregion = $('<p>').addClass('subregion').text(item.subregion);

		box.append(country)
			.append(capital)
			.append(currencies)
			.append(population)
			.append(subregion);

		box.appendTo(countriesList);
	});
}