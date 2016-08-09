var React = require('react');
var ReactDOM = require('react-dom');
var WeatherIcon = require('../atoms/weatherIcon.jsx');
var classNames = require('classnames');

var WeeklyWeather = require('../atoms/weeklyWeather.jsx');

var WeeklyWeatherMolecule=React.createClass({
	 render : function(){
        return(
            <div className="pull-right col-sm-4">
				
                <WeeklyWeather>
                    <WeatherIcon temp = {this.props.temp} weather={this.props.weather} />
                </WeeklyWeather>
								
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