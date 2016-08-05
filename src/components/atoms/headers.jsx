var React = require('react');

var WeatherHeader = React.createClass({
        render :function(){
        return(
            <div >
                <div id = "headerDiv">
                  <img src="../../images/headerIcon.png" alt=" Taapmaan "/>
                  <h1 id="headerStyle"> Taapmaan</h1>
                </div>
            </div>
            );
    }
});

module.exports = WeatherHeader;