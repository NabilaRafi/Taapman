var React = require('react');
var ReactDOM = require('react-dom');
var WeatherIcon = require('../atoms/weatherIcon.jsx');
var classNames = require('classnames');

var WeeklyWeather = require('../atoms/weeklyWeather.jsx');

var WeeklyWeatherMolecule=React.createClass({
	 render : function(){
		 
		 var temp1=this.props.forecast[1];
		 var temp2=this.props.forecast[2];
		 var temp3=this.props.forecast[3];
		 var temp4=this.props.forecast[4];
		 var temp5=this.props.forecast[5];
		 
		 console.log(temp1.hourly);
		 console.log(this.props.forecast[2].hourly);
		 
		 
		//var temp=this.props.forecast[2].hourly[0].temp;
		//console.log("Temp is "+temp);
        return(
            <div className="pull-right col-sm-4">
				
                <WeeklyWeather>
                    <WeatherIcon temp = {this.props.temp} weather={this.props.weather} />
                </WeeklyWeather>
								
				   	
            </div>
        );
	 }
});

module.exports=WeeklyWeatherMolecule;