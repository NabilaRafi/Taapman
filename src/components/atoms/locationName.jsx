var React = require('react');

//var currentCity = 0;
//var currentCityName='London';

var LocationName = React.createClass({
    render : function(){
        return(
            <div>
                <h1 className="city">{this.props.currentCityName}</h1>
            </div>
        );
    }
});

module.exports=LocationName;