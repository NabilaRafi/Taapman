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
var currentCityName = 'London';

var Weather = React.createClass({
    render: function() {
    // in componentdidmount ask for location      
    // Render the DOM elements
	var isLocationAvailable = this.state.isLocationAvailable;
	var currentWeather = <CurrentWeather currentCityName = {currentCityName} temp={this.state.temp} weather={this.state.weather} wind={this.state.wind} humidity={this.state.humidity}></CurrentWeather>;
		
	var weatherNotFound = <div>Location not found</div>; 
    return (<div>
                          
              <SearchLocation onNewLocation={this.fetchData}></SearchLocation> 
			                    
			{(isLocationAvailable) ? currentWeather : weatherNotFound}
             
			 <WeeklyWeatherMolecule desc={this.state.desc} condition={this.state.condition} wind={this.state.wind} forecast={this.state.forecast} />
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
							  	currentCityName:data.name,
							  	isLocationAvailable:true});
				this.updateData();
        }.bind(this));
	
	   // Request new data to the API
        Api.getForecast({lat:lat,lng:lng})
            .then(function(data) {
                console.log('Forecast API Data is ');
				console.log(data);
/*			console.log(moment());
			console.log('New date check');
			var day1 = moment().startOf('day');
			console.log("Current day");
			console.log(day1);
			var day2 = moment('2016-08-08 12:00:00').startOf('day');
			if(day1.diff(day2) == 0)
				console.log('Same dates');
			else console.log('Different dates');*/
			
			//console.log(day);
			var counter=0;
			var forecast=[{}];
			var hourly=[{}];
			var dte;
			
			dayCounter=moment(data.list[0].dt_txt).startOf('day');
			dte=moment(data.list[0].dt_txt).startOf('day');
			
			for(i=0;i<data.list.length;i++){
					if(dayCounter.diff(moment(data.list[i].dt_txt).startOf('day'))==0){
							hourly.push({
								dte: data.list[i].dt_txt,
								temp: data.list[i].main.temp,
								wind: data.list[i].wind.speed
							});
					
						dte=moment(data.list[i].dt_txt).startOf('day');
					}
					else{
						forecast.push({hourly:hourly,
								  date: dte});
						dayCounter=moment(data.list[i].dt_txt).startOf('day');
						hourly=[];
					}
				
				}
			
			
			console.log('Forecast array');
			console.log(forecast);
			this.setState({forecast:forecast});
			console.log('State definned');
			console.log(this.state.forecast);
			
        }.bind(this));
//    
},
 			/*	console.log('Moment operations'+i);
					console.log(dayCounter);
					console.log(moment(data.list[i].dt_txt).startOf('day'));*/
			/*	
					if(dayCounter.diff(moment(data.list[i].dt_txt).startOf('day'))==0)
						console.log('The dates are same');
					else
						console.log('The dates are different');
					*/
updateData: function() {
    // Update the data for the UI
    this.setState({
        weather: selectedCityWeather.weather[0].id,
        temp: Math.round(selectedCityWeather.main.temp - 273.15), // Kelvin to Celcius
        humidity: Math.round(selectedCityWeather.main.humidity),
        wind: Math.round(selectedCityWeather.wind.speed),
        name:selectedCityWeather.name,
		isLocationAvailable: true
    
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