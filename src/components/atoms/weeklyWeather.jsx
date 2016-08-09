var React = require('react');

var WeeklyWeather = React.createClass({
    render : function(){
        return(
            <div className="weeklyItem">
                <h1>Monday</h1>
				<h2>{this.props.desc}</h2>
				<h2>{this.props.temp}</h2>		
            </div>
        );
    }
    
});

module.exports=WeeklyWeather;