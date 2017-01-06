var map;
var markers = [];

function initMap() {
// Constructor creates a new map - only center and zoom are required.
	map = new google.maps.Map(document.getElementById('map'), {
	 center: {lat: 45.432795, lng: -122.377449},
	 zoom: 13,
   mapTypeControl: false
	});
	/*var hops = {lat: 45.554389, lng: -122.908428};
  var marker = new google.maps.Marker({
  	position: hops,
  	map: map,
  	title: 'Hillsboro Hops'
  }); */  
  var locations = [
  {title: 'Hillsboro Hops', location: {lat: 45.554389, lng: -122.908428}},
  {title: 'Salem-Keizer Volcanoes', location: {lat: 45.016184, lng: -122.998177}},
  {title: 'Eugene Emeralds', location: {lat: 44.060040, lng: -123.066076}},
  {title: 'Boise Hawks', location: {lat: 43.656460, lng: -116.278795}},
  {title: 'Tri-City Dust Devils', location: {lat: 46.266792, lng: -119.171989}},
  {title: 'Spokane Indians', location: {lat: 47.662716, lng: -117.346912}},
  {title: 'Everett Aquasox', location: {lat: 47.967024, lng: -122.201513}},
  {title: 'Vancouver Canadians', location: {lat: 49.243227, lng: -123.105238}}
  ];

  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    bounds.extend(markers[i].position);
  }
  // Extend the boundaries of the map for each marker
  map.fitBounds(bounds); 
};

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick',function(){
      infowindow.setMarker(null);
    });
  }
}