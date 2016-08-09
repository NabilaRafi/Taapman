var React = require('react');

var Api = require('../../utils/api');

var LocationName = require('../atoms/locationName.jsx');
var WeatherIcon = require('../atoms/weatherIcon.jsx');
var WeatherMeasures = require('../atoms/weatherMeasure.jsx');

var CurrentWeather = React.createClass({
    render : function(){
        var bgColorClass = 'weather-widget '; // very-warm, warm, normal, cold, very-cold

        // Set the background colour based on the temperature
        if (this.props.temp >= 30) {
        bgColorClass += 'very-warm';
        }
        else if (this.props.temp >= 21 && this.props.temp < 30) {
        bgColorClass += 'warm';
        }
        else if (this.props.temp >= 10 && this.props.temp <= 20) {
        bgColorClass += 'normal';
        }
        else if (this.props.temp >= 0 && this.props.temp < 10) {
        bgColorClass += 'cold';
        }
        else if (this.props.temp <= 0) {
        bgColorClass += 'very-cold';
        }
        return(
            <div className ='col-sm-8'>
                <div className={bgColorClass} >
                    <LocationName currentCityName={this.props.currentCityName} >Default</LocationName>
                    <WeatherIcon temp = {this.props.temp} weather={this.props.weather}></WeatherIcon>
                    <WeatherMeasures temp = {this.props.temp} humidity ={this.props.humidity} wind={this.props.wind}></WeatherMeasures>
                </div>    
                </div> 
            
        )
        
    }
});
module.exports =CurrentWeather;