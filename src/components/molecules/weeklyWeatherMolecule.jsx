var React = require('react');
var ReactDOM = require('react-dom');
var WeatherIcon = require('../atoms/weatherIcon.jsx');
var classNames = require('classnames');

var WeeklyWeather = require('../atoms/weeklyWeather.jsx');

var WeeklyWeatherMolecule=React.createClass({
     
	 render: function(){
        var weeklyWeather = this.props.forecast.map(function(dayForecast, index){
            return <WeeklyWeather key = {index} dayForecast = {dayForecast} />;
        });
         console.log(weeklyWeather);
        return(
            <div className="pull-right col-sm-4">
                {weeklyWeather}				
            </div>
        );
	 }
});

module.exports=WeeklyWeatherMolecule;