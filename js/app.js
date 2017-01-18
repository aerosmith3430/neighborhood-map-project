var model = [
	{title: 'Hillsboro Hops', location: {lat: 45.554389, lng: -122.908428}},
	{title: 'Salem-Keizer Volcanoes', location: {lat: 45.016184, lng: -122.998177}},
	{title: 'Eugene Emeralds', location: {lat: 44.060040, lng: -123.066076}},
	{title: 'Boise Hawks', location: {lat: 43.656460, lng: -116.278795}},
	{title: 'Tri-City Dust Devils', location: {lat: 46.266792, lng: -119.171989}},
	{title: 'Spokane Indians', location: {lat: 47.662716, lng: -117.346912}},
	{title: 'Everett Aquasox', location: {lat: 47.967024, lng: -122.201513}},
	{title: 'Vancouver Canadians', location: {lat: 49.243227, lng: -123.105238}}
];

var map;
var markers = [];

function initMap() {
	// Constructor creates a new map - only center and zoom are required.
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 45.432795, lng: -122.377449},
		zoom: 13,
		mapTypeControl: false
	});

	var largeInfowindow = new google.maps.InfoWindow();
	var bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create an array of markers on initialize.
    // Use vm.listItems() to loop directly over the observable array
	for (var i = 0; i < vm.listItems().length; i++) {
	// Get the position from the location array.
		var position = vm.listItems()[i].location;
		var title = vm.listItems()[i].title;		
		
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

		// Create 'marker' property in the location object
		// Store the marker there
		vm.listItems()[i].marker = marker;
		// Create an onclick event to open an infowindow at each marker.
		marker.addListener('click', function() {
			populateInfoWindow(this, largeInfowindow);
		});
		bounds.extend(markers[i].position);
	}
	// Extend the boundaries of the map for each marker
	map.fitBounds(bounds); 
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
		infowindow.setContent('<div>' + marker.title + '<div>');
		infowindow.marker = marker;	
		infowindow.open(map, marker);			
		// Make sure the marker property is cleared if the infowindow is closed.
		infowindow.addListener('closeclick', function() {
			infowindow.marker = null;
		});	

		marker.setAnimation(google.maps.Animation.BOUNCE);
    	setTimeout(function() {
    		marker.setAnimation(null);    		
    	}, 1500);	
		/*
		var streetViewService = new google.maps.StreetViewService();
		var radius = 50;

		function getStreetView(data, status) {
			console.log(status, data);
			if (status == google.maps.StreetViewStatus.OK) {
				var nearStreetViewLocation = data.location.latLng;
				console.log(nearStreetViewLocation);
				var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
				console.log(heading);
				infowindow.setContent('<div>' + marker.title + '</div><div id="pano"><img src="https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + marker.position + '&key=AIzaSyDxXj3rb4K2dGGUVC-wvKyzuWNu5fo9Dns"></div>');
				var panoramaOptions = {
					position: nearStreetViewLocation,
					pov: {
						heading: heading,
						pitch: 30
					}
				};
				var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);		
			} else {
				infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No Street View Found</div>');
			}			
		}
		streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
		infowindow.open(map, marker);*/
	}

	var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';

	var wikiRequestTimeout = setTimeout(function() {
	        $('#wikipedia-links').text("Wikipedia articles failed to load");
	    }, 3000);

	$.ajax({
	    url: wikiURL,
	    dataType: "jsonp",
	    success: function(response) {
	    	console.log(response);
	        var articleList = response[1];
	        for (var i = 0; i < articleList.length; i++) {
	            wikiArticle = articleList[i];
	            var url = 'http://en.wikipedia.org/wiki/' + wikiArticle;
	            infowindow.setContent('<h4>' + marker.title + '</h4><h6>Click link for Wikipedia entry</h6><a target="_blank" href="' + url + '">' + wikiArticle + '</a>');
	        };

	        clearTimeout(wikiRequestTimeout);
	    }
	});
}

var View = function(data) {
	var self = this;

	self.title = ko.observable(data.title);

	/*menu.addEventListener('click', function(e) {
		drawer.classList.toggle('open');
		e.stopPropagation();
	});*/
}

var ViewModel = function() {
    var self = this;

    self.stadiumList = ko.observableArray();

    self.wikiData = ko.observable('');

    model.forEach(function(stadium) {
    	self.stadiumList.push( new View(stadium));
    });
    
    self.searchBarInput = ko.observable('');
    self.listItems = ko.observableArray(model);

    self.listFilter = ko.computed(function() {
    	return ko.utils.arrayFilter(self.listItems(), function(stadium) {
    		if ( stadium.title.toLowerCase().indexOf( self.searchBarInput().toLowerCase() ) >= 0 ) {
    			
    			// If the marker exists and is an object
    			if (typeof stadium.marker === 'object') {
    				// show the marker
    				stadium.marker.setVisible(true);
    			}
    			// show this location
    			return true;
    		} else {
    			
    			if (typeof stadium.marker === 'object') {
    				// hide the marker
    				stadium.marker.setVisible(false);
    			}
    			return false;
    		}
    	});
    });

    self.clickAnimation = function(stadium) {
    	google.maps.event.trigger(stadium.marker, 'click');
    };
}

// Create a global variable to store the ViewModel object
var vm = new ViewModel();
// Apply bindings, passing the ViewModel object as a parameter
ko.applyBindings(vm);