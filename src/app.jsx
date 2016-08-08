var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');


var WeatherHeader = require('./components/atoms/headers.jsx');
var SearchLocation = require('./components/atoms/searchLocation.jsx');

var CurrentWeather = require('./components/molecules/currentWeather.jsx');


var Api = require('./utils/api');


var query = ''; // Expects something like this ?city=London,Paris,Berlin,Madrid
var selectedCityWeather;
var currentCity = 0; // Index of current city displayed
var currentCityName='London';

var Weather = React.createClass({
    render: function() {
         
    // Render the DOM elements
    return (<div>
                          

              <SearchLocation onNewLocation={this.fetchData}></SearchLocation> 
                  
                    <CurrentWeather currentCityName = {this.state.currentCityName} temp={this.state.temp} weather={this.state.weather} wind={this.state.wind} humidity={this.state.humidity}></CurrentWeather>
             
            </div>);
},

// Init data for UI
getInitialState: function() {
    return {
        weather: '',
        temp: 0,
        humidity: 0,
        wind: 0,
        lat: 53.558572,
        lng : 9.9278215
    }  
},
    

    
fetchData: function(lat,lng) {

        // Request new data to the API
        Api.get({lat:lat,lng:lng})
            .then(function(data) {
                selectedCityWeather = data;
                currentCityName=data.name;
            
                this.setState({
                    currentCityName :currentCityName 
                });
            
                this.updateData();
        }.bind(this));
//    
},
    
updateData: function() {
    // Update the data for the UI
    this.setState({
        weather: selectedCityWeather.weather[0].id,
        temp: Math.round(selectedCityWeather.main.temp - 273.15), // Kelvin to Celcius
        humidity: Math.round(selectedCityWeather.main.humidity),
        wind: Math.round(selectedCityWeather.wind.speed),
        name:selectedCityWeather.name
    
    });
},

// Called before the render method is executed
componentWillMount: function() {

    // Create a timer to clear the cache after 5 minutes, so we can get updated data from the API
    setInterval(function() {
        selectedCityWeather = []; // Empty the cache
    }, (1000*60*5));

    this.fetchData();
},
 
});
ReactDOM.render(<WeatherHeader />,document.getElementById('app'));
ReactDOM.render(<Weather />, document.querySelector('.container'));