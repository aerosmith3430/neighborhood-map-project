// Model holds location data

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

// Declare variables in the global scope
var map;
var markers = [];
var menu = document.getElementById('menu');
var main = document.querySelector('main');
var drawer = document.getElementById('drawer');

// Credit to Udacity Google Map API course

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
		// Push the marker to the array of markers.
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

		// Animates marker and stops animation after 1.5 seconds
		marker.setAnimation(google.maps.Animation.BOUNCE);
    	setTimeout(function() {
    		marker.setAnimation(null);    		
    	}, 1500);					
	}

	// URL for Wikipedia API request
	var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';

	// If Wikipedia articles do not load within 3 seconds, an error message displays in the infowindow
	var wikiRequestTimeout = setTimeout(function() {
	        infowindow.setContent('<h4>' + marker.title + '</h4><h6>Wikipedia articles failed to load</h6>');
	    }, 3000);

	// AJAX request to Wikipedia API.  It takes in the URL defined above and, if successful, returns articles and creates an infowindow with the list name and a link
	$.ajax({
	    url: wikiURL,
	    dataType: "jsonp",
	    success: function(response) {	    	
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

// Opens list drawer when the hamburger icon is clicked
menu.addEventListener('click', function(e) {
	drawer.classList.toggle('open');
	e.stopPropagation();
});

// The view handles what the user sees
var View = function(data) {
	var self = this;

	self.title = ko.observable(data.title);	
}

// The ViewModel handles the communication between the model data and the view that the user sees
var ViewModel = function() {
	// Helps to avoid confusion as to which object is being referred to
    var self = this;

    self.stadiumList = ko.observableArray();

    self.wikiData = ko.observable('');

    // Creates a new View object for each item in the model array and pushes it to the stadiumList observable array created above
    model.forEach(function(stadium) {
    	self.stadiumList.push( new View(stadium));
    });
    
    self.searchBarInput = ko.observable(''); // Watches for input in the search bar
    self.listItems = ko.observableArray(model); // Copies from the model into an observable array

    // Watches for input in the search bar and displays the items that match the search criteria and hides those that do not meet the search criteria
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

    // Animates the marker when the list item is clicked. Also closes the drawer if it is open after list item is clicked.
    self.clickAnimation = function(stadium) {
    	google.maps.event.trigger(stadium.marker, 'click');    	
    	drawer.classList.remove('open');    	
    };
}

// Create a global variable to store the ViewModel object
var vm = new ViewModel();
// Apply bindings, passing the ViewModel object as a parameter
ko.applyBindings(vm);