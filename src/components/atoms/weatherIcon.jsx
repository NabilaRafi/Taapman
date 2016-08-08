var React = require('react');
var classNames = require('classnames');


var WeatherIcon = React.createClass({
    render : function(){
        
        //Build class names with dynamic data
    var weatherClass = classNames('wi wi-owm-' + this.props.weather);
        
        return(
            <div className="weather">
                <i className={weatherClass}></i>
            </div>
        
        )   
        
    }   
});

module.exports = WeatherIcon;