var React = require('react');

var WeeklyWeather = React.createClass({
    render : function(){
        var temp = this.props.dayForecast.hourly[0];
        return(
            <div className="weeklyItem">
                <h1>Monday</h1>		
            </div>
        );
    }
   
    
});

module.exports=WeeklyWeather;