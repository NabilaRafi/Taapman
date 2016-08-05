var React = require('react');
var Geosuggest = require('react-geosuggest').default;

var SearchLocation = React.createClass({
    render : function(){
        return(
           <div className="well row">
                <div className="col-sm-4">
                </div>
                <div className="col-sm-4">
                    <Geosuggest
                      placeholder="Enter the location ..."
                      initialValue=""
                      onSuggestSelect={this.onSuggestSelect}
                      location={new google.maps.LatLng(53.558572, 9.9278215)}
                      radius="20"/>
                </div>
                <div className="col-sm-4"></div>
           </div>
        );
    },
    onSuggestSelect: function(suggest) {
    console.log(suggest);
      
      var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'placeId': suggest.placeId }, function (results, status) {
            var latitude;
            var longitude;

            if (status == google.maps.GeocoderStatus.OK) {
                 latitude = results[0].geometry.location.lat();
                 longitude = results[0].geometry.location.lng();            

            }
            this.setState ({
                lat :latitude,
                lng:longitude
            });   
        }.bind(this));
    this.fetchData();
  },
    
});

module.exports = SearchLocation;