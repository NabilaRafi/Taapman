var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

var WeeklyWeather = require('../atoms/weeklyWeather.jsx');

var WeeklyWeatherMolecule=React.createClass({
	 render : function(){
		 
		 var temp=this.props.forecast;
	 
		 
		//var temp=this.props.forecast[2].hourly[0].temp;
		//console.log("Temp is "+temp);
        return(
            <div className="pull-right">
				<div>Description : {this.props.desc}</div>
				<div>Condition : {this.props.condition}</div>
				
				   	
            </div>
        );
	 }
});

module.exports=WeeklyWeatherMolecule;