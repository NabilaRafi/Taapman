var Fetch = require('whatwg-fetch');
var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=';
var apiUrl = '&appid=f8e8abf11f2158703727c5ec3aa18578';

module.exports = {
    get: function(position) {
        console.log("reached api call");
        console.log("Latitude : " + position.lat +'lng'+position.lng);
        console.log(rootUrl + position.lat + "&lon="+position.lng+apiUrl);
        return fetch(rootUrl + position.lat + "&lon="+position.lng+apiUrl, {
            
            headers: {
                // No need for special headers
            }
        })
        .then(function(response) {
            return response.json();
        });
    }
};