// any global variables go here
favoutiteEvents = [];
//
//

// date picker
$('#pick-date').datepicker( {
    minDate: 0,
});

// Function to display city name and date
function displayTitle(dt, city) {
    $('#event_name').text(city + " " + dt);
}

// Function to clear favorites
$('#clear_fav').click(function() {
    $('#favourite-events').html("");
    localStorage.removeItem('favouriteEvents');
});

// event listener for the searchBtn
// a function to handle all the calls made after the searchBtn is clicked
$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    var cityName = document.querySelector("input[name='city-name']").value;
    var date = document.querySelector("input[name='date']").value;
    console.log(cityName, date);
    // call a function displayTitle(date, cityName)
    displayTitle(date, cityName);
    // call the ticket master api using the date and cityName (fetch)
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?size=10&city=' + cityName + '&date=' + date +'&apikey=GLE8iclmKIizOPTZtUoLOFpHe2fHejvM')
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
        $('#results').empty();
        displayEvents(data)
    });
    // call the weather api using the date and cityName (fetch)
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=460baac12caacdeca58e7bae8f1299bc')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&date=' + date +'&units=metric&appid=460baac12caacdeca58e7bae8f1299bc')
        .then(function(weather) {
            return weather.json();
        })
        // then call displayWeather(data)
        .then(function(weather) {
            // displayWeather(weather);
            console.log(weather);
        })
    })
});

// create a function to display the title
    // use querySelector to get the span element 
    // text of the span will equal the cityName + date

// create a function to display the events on the page
var displayEvents = function(data) {
    console.log(data._embedded.events);

    // create a for loop to iterate through the events happening on that day
    for (i = 0; i < data._embedded.events.length; i ++) {
       createEvent(data, i);
    }
    
};

var createEvent = function(data, i) {
    console.log(data, i);
    var currentEvent = data._embedded.events[i];

    var eventContainerEl = $('<div></div>')
    .addClass('col-11 border border-dark p-2 m-2 event-text');

    var eventTitleContainerEl = $('<div></div>')
    .addClass('d-flex flex-row align-items-center justify-content-between');
    var eventTitleEl = $('<h5></h5>')
    .text(currentEvent.name)
    .addClass('m-0 event');
    var favouritesLinkEl = $('<button></button>')
    .text("Add To Favourites")
    .addClass('text-decoration-underline save');

    $(eventTitleContainerEl).append(eventTitleEl, favouritesLinkEl);

    var genreEl = $('<p></p>')
    .text(currentEvent.classifications[0].genre.name)
    .addClass('text-muted font-italic m-0')
    var venueEl = $('<p></p>')
    .text('Venue: ' + currentEvent._embedded.venues[0].name)
    .addClass('m-0')
    var startTimeEl = $('<p></p>')
    .text(currentEvent.dates.start.localTime)
    .addClass('font-weight-light m-0 time');
    var moreInfoEl = $('<a></a>')
    .text("More Info")
    .attr('href', currentEvent.url)

    $(eventContainerEl).append(eventTitleContainerEl, genreEl, venueEl, startTimeEl, moreInfoEl);
    $('#results').append(eventContainerEl);
};


// create a function to display the weather
    // create a variable for the #forecast container

    // create a <h4> for the City Name
    // text will equal cityName
    // create an <img> for the weather condidtions (icon)
    // attr src="url"
    // attr alt="data.main"
    // add classes
    // create a <p></p> for the temperature
    // text will equal data.temp

    // append cityName, icon, temp to #forecast container

// event listener for #results container for element with the class .addToFavourites




    // create variable for the eventName
   
    // create variable for the startTime
   
    // create an empty array to hold events (as a global variable at the top of the code)
    // create an object to hold a event {name: eventName, time: startTime}
   
     
//document.querySelector('#favouritesLinkEl').addEventlistner('click', saveData);

$('#results').on('click',".save", function(event){
    var eventName = $(this).parent().find('.event').text();
    var startTime = $(this).closest('.event-text').find('.time').text();
    console.log(eventName);
    console.log(startTime);
    var saveData = [{name: eventName, time: startTime}];
    
    localStorage.setItem('favouriteEvents', JSON.stringify(saveData));
    displayFavourites();
})

var displayFavourites = function(){
    var toGetEventName = JSON.parse( localStorage.getItem('favouriteEvents'))
    console.log(toGetEventName); 
            
    for (i = 0; i < toGetEventName.length; i ++) {
        createShowFavourites(i, toGetEventName);
    }
}

var createShowFavourites = function(i, toGetEventName) {
    console.log(i);
    var favouriteCardEl = $('<div></div>')
    .addClass('col-11 border border-dark p-2 m-2')

    var eventNameEl = $('<h4></h4>')
    .text(toGetEventName[i].name)

    var timeEl = $('<p></p>')
    .text(toGetEventName[i].time)
    $(favouriteCardEl).append(eventNameEl, timeEl );
    $('#favourite-events').append(favouriteCardEl);
}
displayFavourites();   

// add event listener for .clearLink
// a function to clear the favourites card and clear the local storage
    // create a variable for #favourite-events container using query selector
    // clear innerHTML of the #favourite-events container

    // localStorage.clear() - to clear the favourite events from the local storage

  