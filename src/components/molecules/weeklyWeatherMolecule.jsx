var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

var WeeklyWeather = require('../atoms/weeklyWeather.jsx');

var WeeklyWeatherMolecule=React.createClass({
	 render : function(){
        return(
            <div className="pull-right">
				<div>Description : {this.props.desc}</div>
				<div>Condition : {this.props.condition}</div>
								
				   	<WeeklyWeather desc={this.props.desc}/>
					<WeeklyWeather desc={this.props.desc}/>
					<WeeklyWeather desc={this.props.desc}/>
					<WeeklyWeather desc={this.props.desc}/>
					<WeeklyWeather desc={this.props.desc}/>
            </div>
        );
	 }
});

module.exports=WeeklyWeatherMolecule;