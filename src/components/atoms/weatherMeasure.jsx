var React = require('react');

var WeatherMeasures = React.createClass({
    
    render : function(){
        
        return(
            
            <section className="weather-details">
                        <div className="temp"><span className="temp-number">{this.props.temp}</span><span className="wi wi-degrees"></span>C</div>
                        <div className="humidity"><i className="wi wi-raindrop"></i>{this.props.humidity} %</div>
                        <div className="wind"><i className="wi wi-small-craft-advisory" >{this.props.wind}</i> <span className="vel">Km/h</span></div>
            </section>
        
        );
    }
    
    
});
module.exports = WeatherMeasures;