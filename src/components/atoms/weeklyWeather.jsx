var React = require('react');
var classNames=require('classnames');

var WeeklyWeather = React.createClass({
    render : function(){
		var dayCast = this.props.temp;
		var weatherClass=classNames('wi  wi-owm-'+dayCast.weatherIcon);
      
        
         return(
            <div className="weeklyItem">
                 <p>{dayCast.hourly[0].temp}</p>
				 <span className="weather"><i className={weatherClass}></i></span>
            </div>
        );
    }
   
    
});

module.exports=WeeklyWeather;