/*var map;
var markers = [];

function initMap() {
	// Constructor creates a new map - only center and zoom are required.
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 45.432795, lng: -122.377449},
		zoom: 13,
		mapTypeControl: false
	});
	  
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
}*/

// API calls to be used later
/*var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=e768dfce820c43968d90887f6add8612';
    $.getJSON(url, function (data) {
        $nytHeaderElem.text('New York Times Articles About ' + city);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a target="_blank" href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        };
    }).fail(function(e) {
        $nytHeaderElem.text('Error: Articles could not be loaded');
    });

    var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("Wikipedia articles failed to load");
    }, 3000);

    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        success: function(response) {
            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++) {
                wikiArticle = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + wikiArticle;
                $wikiElem.append('<li><a target="_blank" href="' + url + '">' + wikiArticle + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
*/
var model = [
	{title: 'Hillsboro Hops', location: {lat: 45.554389, lng: -122.908428}},
	{title: 'Salem-Keizer Volcanoes', location: {lat: 45.016184, lng: -122.998177}},
	{title: 'Eugene Emeralds', location: {lat: 44.060040, lng: -123.066076}},
	{title: 'Boise Hawks', location: {lat: 43.656460, lng: -116.278795}},
	{title: 'Tri-City Dust Devils', location: {lat: 46.266792, lng: -119.171989}},
	{title: 'Spokane Indians', location: {lat: 47.662716, lng: -117.346912}},
	{title: 'Everett Aquasox', location: {lat: 47.967024, lng: -122.201513}},
	{title: 'Vancouver Canadians', location: {lat: 49.243227, lng: -123.105238}}
]

/*var ViewModel = function () {
	this.firstName = ko.observable("Bert");
	this.lastName = ko.observable("Bertington");
	this.fullName = ko.computed(function() {
		return this.firstName() + " " + this.lastName();
	}, this);
	this.capitalizeLastName = function() {
        var currentVal = this.lastName();
        this.lastName(currentVal.toUpperCase());
    };
}

ko.applyBindings(new ViewModel());
*/

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
	for (var i = 0; i < model.length; i++) {
	// Get the position from the location array.
		var position = model[i].location;
		var title = model[i].title;
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

var View = function(data) {
	var self = this;

	self.title = ko.observable(data.title);
}

var ViewModel = function() {
    var self = this;

    self.stadiumList = ko.observableArray();

    model.forEach(function(stadium) {
    	self.stadiumList.push( new View(stadium));
    });  
    
    self.searchBarInput = ko.observable('');
    self.listItems = ko.observableArray(model);
    self.markersOnMap = ko.observableArray(markers);

    self.listFilter = ko.computed(function() {
    	return ko.utils.arrayFilter(self.listItems(), function(stadium) {
    		return stadium.title.toLowerCase().indexOf(self.searchBarInput().toLowerCase()) >= 0;    		
    	});
    });

    /*self.listFilter = ko.computed(function() {
    	var userInput = self.searchBarInput().toLowerCase();

    	self.markersOnMap.removeAll();

    	self.markersOnMap().forEach(function(stadium) {
    		stadium.setVisible(false);
			if (stadium.title.toLowerCase().indexOf(userInput) !== -1) {
				stadium.setVisible(true);
				self.markersOnMap.push(stadium);
			}
    	});
    });*/



    /*function SeatReservation(name, initialMeal) {
	    var self = this;
	    self.name = name;
	    self.meal = ko.observable(initialMeal);

	    self.formattedPrice = ko.computed(function() {
	    	var price = self.meal().price;
	    	return price ? "$" + price.toFixed(2) : "None";
	    });
	}

    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];

    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[0]),
        new SeatReservation("Bert", self.availableMeals[0]),
        new SeatReservation("Nolan", self.availableMeals[2]),
        new SeatReservation("Prince", self.availableMeals[1])
    ]);

    self.addSeat = function() {
    	self.seats.push(new SeatReservation("", self.availableMeals[0]));
    }

    self.totalSurcharge = ko.computed(function() {
    	var total = 0;
    	for (var i = 0; i < self.seats().length; i++) {
    		total += self.seats()[i].meal().price;
    	};
    	return total;
    });*/
}

ko.applyBindings(new ViewModel());