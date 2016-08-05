var React = require('react');

var WeatherHeader = React.createClass({
        render :function(){
        return(
            <div >
                <div id = "headerDiv" className="well row">
					<div className="col-sm-4">
					</div>
					<div className="col-sm-4">
						<img src="src/images/headerIcon.png" alt=" Taapmaan "/>
                  		<h1 id="headerStyle"> Taapmaan</h1>
					</div>
					<div className="col-sm-4">
					</div>
					</div>
            </div>
            );
    }
});

module.exports = WeatherHeader;