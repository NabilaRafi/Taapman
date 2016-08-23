var React = require('react');
var ReactDOM = require('react-dom');
var WeatherIcon = require('../atoms/weatherIcon.jsx');
var classNames = require('classnames');

var WeeklyWeather = require('../atoms/weeklyWeather.jsx');

var WeeklyWeatherMolecule=React.createClass({
    
  render: function(){
        return(
            
            <div className="pull-right col-sm-4 weekly-weather-widget">
                <WeeklyWeather temp1={this.props.forecast[0]} />
                <WeeklyWeather temp1={this.props.forecast[1]} />
                <WeeklyWeather temp1={this.props.forecast[2]} />
                <WeeklyWeather temp1={this.props.forecast[3]} />
                <WeeklyWeather temp1={this.props.forecast[4]} />
            </div>
        ); 
	 }
});

module.exports=WeeklyWeatherMolecule;