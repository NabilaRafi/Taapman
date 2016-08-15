var React = require('react');
var classNames=require('classnames');
var moment=require('moment');

var WeeklyWeather = React.createClass({
    render : function(){
		var dayCast = this.props.temp;
		var weatherClass=classNames('wi  wi-owm-'+dayCast.weatherIcon+' weekly-icon');
      
        
         return(
            <div className="weeklyItem">
                 <p>{dayCast.date.format('dddd')}</p>
                 <span className="weather"><i className={weatherClass}></i></span>
                 <p>Temp : {dayCast.hourly[0].temp} K</p>
        		 <p>Wind : {dayCast.hourly[0].wind} mph</p>
                 <p>Humidity : {dayCast.hourly[0].humidity}%</p>
	        </div>
        );
    }
   
    
});

module.exports=WeeklyWeather;