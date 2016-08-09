var React = require('react');

var WeeklyWeather = React.createClass({
    render : function(){
        var dayCast = this.props.temp;
        
         return(
            <div className="weeklyItem">
                 <p>{dayCast.hourly[0].temp}</p>
            </div>
        );
    }
   
    
});

module.exports=WeeklyWeather;