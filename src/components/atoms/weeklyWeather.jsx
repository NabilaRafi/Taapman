var React = require('react');
var classNames=require('classnames');
var moment=require('moment');

var WeeklyWeather = React.createClass({
    getInitialState : function(){
      return({
        temp1 : []
      });
    },
    
    getHourlyData : function(){
        alert("reached the hourly data");
        var hourlyCast = this.props.temp1;
        //var weatherClass=classNames('wi  wi-owm-'+dayCast.weatherIcon+' weekly-icon');
        console.log(hourlyCast);
        hourlyCast
            .forEach(function(data){
            console.log("item : " + data);
        });
        return(
            <div>
                
                
            </div>
        )
    
    },
    
    render : function(){
        //console.log(this.props.temp1)
		var dayCast = this.props.temp1;
        
		var weatherClass=classNames('wi  wi-owm-'+dayCast.weatherIcon+' weekly-icon');
         return(
            <div className="weeklyItem" onClick = {this.getHourlyData}>
                 <p>{dayCast.date.format('dddd')}</p>
                 <span className="weather"><i className={weatherClass}></i></span>
                 <p>{Math.ceil(dayCast.hourly[0].temp - 273.15)}C</p>	 
	        </div>
        );
    }
   
    
});

module.exports=WeeklyWeather;