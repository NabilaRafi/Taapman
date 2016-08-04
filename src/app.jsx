var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Geosuggest = require('react-geosuggest').default;

var Api = require('./utils/api');

var query = ''; // Expects something like this ?city=London,Paris,Berlin,Madrid
var selectedCityWeather;
var currentCity = 0; // Index of current city displayed
var currentCityName='London';

var Weather = React.createClass({
    render: function() {
        
        //Build class names with dynamic data
    var weatherClass = classNames('wi wi-owm-' + this.state.weather);
    var bgColorClass = 'weather-widget '; // very-warm, warm, normal, cold, very-cold

        // Set the background colour based on the temperature
        if (this.state.temp >= 30) {
        bgColorClass += 'very-warm';
        }
        else if (this.state.temp > 20 && this.state.temp < 30) {
        bgColorClass += 'warm';
        }
        else if (this.state.temp > 10 && this.state.temp < 20) {
        bgColorClass += 'normal';
        }
        else if (this.state.temp > 0 && this.state.temp < 10) {
        bgColorClass += 'cold';
        }
        else if (this.state.temp <= 0) {
        bgColorClass += 'very-cold';
        }
        
       var fixtures =[];
    // Render the DOM elements
    return (<div>
                <div>
                    <Geosuggest
                      placeholder="Enter the location ..."
                      initialValue=""
                      fixtures={fixtures}
                      onSuggestSelect={this.onSuggestSelect}
                      location={new google.maps.LatLng(53.558572, 9.9278215)}
                      radius="20" />
                </div>

                <div className={bgColorClass}>
                    <h1 className="city">{currentCityName}</h1>
                    <div className="weather">
                        <i className={weatherClass}></i>
                    </div>
                    <section className="weather-details">
                        <div className="temp"><span className="temp-number">{this.state.temp}</span><span className="wi wi-degrees"></span>C</div>
                        <div className="humidity"><i className="wi wi-raindrop"></i>{this.state.humidity} %</div>
                        <div className="wind"><i className="wi wi-small-craft-advisory" >{this.state.wind}</i> <span className="vel">Km/h</span></div>
                    </section>
                </div>
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
    

    
fetchData: function() {
    console.log('Fetch data');
    console.log(this.state.lat+" lat");

        console.log("if else");
        // Request new data to the API
        Api.get({lat:this.state.lat,lng:this.state.lng})
            .then(function(data) {
                selectedCityWeather = data;
                currentCityName=data.name;
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
                                
onSuggestSelect: function(suggest) {
    console.log(suggest);
      
      var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'placeId': suggest.placeId }, function (results, status) {
            var latitude;
            var longitude;

            if (status == google.maps.GeocoderStatus.OK) {
                 latitude = results[0].geometry.location.lat();
                 longitude = results[0].geometry.location.lng();            

            }
            this.setState ({
                lat :latitude,
                lng:longitude
            });   
        }.bind(this));
    console.log('API Call');
    this.fetchData();
    console.log('Call end');
  },
 
});

ReactDOM.render(<Weather />, document.querySelector('.container'));