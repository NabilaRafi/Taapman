var React = require('react');
var ReactDOM = require('react-dom');
//var classNames = require('classnames');
var moment=require('moment');


var WeatherHeader = require('./components/atoms/headers.jsx');
var SearchLocation = require('./components/atoms/searchLocation.jsx');

var LocationName = require('./components/atoms/locationName.jsx');
var WeeklyWeatherMolecule = require('./components/molecules/weeklyWeatherMolecule.jsx');
var CurrentWeather = require('./components/molecules/currentWeather.jsx');

var Api = require('./utils/api');


var query = ''; // Expects something like this ?city=London,Paris,Berlin,Madrid
var selectedCityWeather;
var currentCity = 0; // Index of current city displayed
var currentCityName = 'London';

var Weather = React.createClass({
    render: function() {
    // in componentdidmount ask for location      
    // Render the DOM elements

	var isLocationAvailable = this.state.isLocationAvailable;

	var currentWeatherDisplay = <CurrentWeather currentCityName = {this.state.name} temp = {this.state.temp} weather = {this.state.weather} wind = {this.state.wind} humidity = {this.state.humidity} />;
        
    var weeklyWeatherDisplay = <WeeklyWeatherMolecule desc={this.state.desc} condition={this.state.condition} wind={this.state.wind} forecast={this.state.forecast} />    
		
	var weatherNotFound = <div>Location not found</div>; 
    return (<div>
                          
              <SearchLocation onNewLocation={this.fetchData}></SearchLocation> 
			                    
                {(isLocationAvailable) ? currentWeatherDisplay : weatherNotFound}
                {(isLocationAvailable) ? weeklyWeatherDisplay : weatherNotFound}
            
            </div>);
},

// Init data for UI
getInitialState: function() {
	var forecast = [];
	
    return {
		isLocationAvailable: false,
        weather: '',
        temp: 0,
        humidity: 0,
        wind: 0,
        lat: 0,
        lng : 0,
		desc: 'Default description',
		condition: 'Default condition',
		forecast: []
    }  
},
    

    
fetchData: function(lat,lng) {
    var promises = [Api.get({lat:lat,lng:lng}), Api.getForecast({lat:lat,lng:lng})];
    var currentCityData = null; 
    
    Promise
        .all(promises)
        .then(function(data){
            var currentCityData = data[0];
            var currentCityForecast = data[1];
            var forecast = this.calcForecast(currentCityForecast);
            this.updateData(currentCityData, forecast);
        }.bind(this))
        .catch(function(err){
            // toast error message to user 
            console.log(err);
        });  
},
    
calcForecast: function (currentCityForecast) {
    var counter = 0;
    var forecast = [];
    var hourly = [];
    var dte = null;

    dayCounter = moment(currentCityForecast.list[0].dt_txt).startOf('day');
    dte = moment(currentCityForecast.list[0].dt_txt).startOf('day');
	
    currentCityForecast
        .list
        .forEach(function(listItem, index) {           
            var date = moment(listItem.dt_txt).startOf('day');
        console.log(date);
        console.log(listItem.weather[0].id)
            if (dayCounter.diff(date) === 0) {
                console.log("Weather Icon" +listItem.weather[0].id)
                hourly.push({
                    dte: listItem.dt_txt,
                    temp: listItem.main.temp,
					humidity: listItem.main.humidity,
                    wind: listItem.wind.speed,
					weatherIcon: listItem.weather[0].id
                });

                dte = date;
            }
            else {
                debugger;
                console.log("Weather Icon" +listItem.weather[0].id)
                console.log( hourly[0].weatherIcon)
                forecast.push({
                    hourly: hourly,
                    date: dte,
					weatherIcon: hourly[0].weatherIcon	
                });
                dayCounter = date;
                hourly = [];
            }
        });
	
    console.log('Forecast array');
    console.log(forecast);
    return forecast;
},

updateData: function(currentCityData, weeklyForecast) {
    console.log(weeklyForecast)
    this.setState({
        weather: currentCityData.weather[0].id,
        desc: currentCityData.weather[0].description,
        condition: currentCityData.weather[0].main,
        temp: Math.round(currentCityData.main.temp - 273.15), // Kelvin to Celcius
        humidity: Math.round(currentCityData.main.humidity),
        wind: Math.round(currentCityData.wind.speed),
        name: currentCityData.name,
		isLocationAvailable: true,
        forecast: weeklyForecast,
    });
}
 
});
ReactDOM.render(<WeatherHeader />,document.getElementById('app'));
ReactDOM.render(<Weather />, document.querySelector('.container'));
