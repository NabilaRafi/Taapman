var React = require('react');

var WeatherHeader = React.createClass({
    render :function(){
        return
        (
            <div>
              <img src="../../images/headerIcon.png" alt=" Taapmaan "></img>
              <h1> TaapMan</h1>
            </div>
        )
    }
});

module.exports = WeatherHeader;