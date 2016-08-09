var Fetch = require('whatwg-fetch');
var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=';
var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=';
var apiUrl = '&appid=f8e8abf11f2158703727c5ec3aa18578';

module.exports = {
    get: function(position) {
        return fetch(rootUrl + position.lat + "&lon="+position.lng+apiUrl, {
            
            headers: {
                // No need for special headers
            }
        })
        .then(function(response) {
            return response.json();
        });
    },
	getForecast: function(position){
		console.log(forecastUrl + position.lat + "&lon="+position.lng+apiUrl);
		return fetch(forecastUrl + position.lat + "&lon="+position.lng+apiUrl, {
            
            headers: {
                // No need for special headers
            }
        })
        .then(function(response) {
            return response.json();
        });
	}
};