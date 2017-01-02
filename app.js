var model = ;

var view = ;

var ViewModel = ;


var map;
function initMap() {
// Constructor creates a new map - only center and zoom are required.
map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: 45.432795, lng: -122.377449},
	zoom: 13
	});
}
