var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
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
var currentCityName='London';

var Weather = React.createClass({
    render: function() {
         
	   
		
         
    // Render the DOM elements
    return (<div>
                          

              <SearchLocation onNewLocation={this.fetchData}></SearchLocation> 
			   <WeeklyWeatherMolecule desc={this.state.desc} condition={this.state.condition} wind={this.state.wind}/>
                  
              <CurrentWeather currentCityName = {currentCityName} temp={this.state.temp} weather={this.state.weather} wind={this.state.wind} humidity={this.state.humidity}></CurrentWeather>
             
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
        lng : 9.9278215,
		desc: 'Default description',
		condition: 'Default condition',
		forecast:[]
    }  
},
    

    
fetchData: function(lat,lng) {
	
		console.log(Api);

        // Request new data to the API
        Api.get({lat:lat,lng:lng})
            .then(function(data) {
                selectedCityWeather = data;
                currentCityName=data.name;
				console.log('API Data is ');
				console.log(data);
				this.setState({ weather: '',
								desc: data.weather[0].description,
								condition: data.weather[0].main,
								wind: data.wind.speed,
							  	currentCityName:data.name});
				this.updateData();
        }.bind(this));
	
	   // Request new data to the API
        Api.getForecast({lat:lat,lng:lng})
            .then(function(data) {
                console.log('Forecast API Data is ');
				console.log(data);
			console.log(moment().format());
			console.log(moment().unix());
			var day = moment().unix(1470659430);
			console.log(day);
			for(i=0;i<data.list.length;i++){
					console.log(data.list[i]);
					console.log(moment(data.list[i].dt_txt));
					}
			
			
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
//ReactDOM.render(<WeeklyWeatherMolecule/>,document.querySelector('.weeklyContainer'));