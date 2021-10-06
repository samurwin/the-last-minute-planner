// any global variables go here
//
//

// date picker
$('#pick-date').datepicker( {
    minDate: 0,
});

// event listener for the searchBtn
// a function to handle all the calls made after the searchBtn is clicked
$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    var cityName = document.querySelector("input[name='city-name']").value;
    var date = document.querySelector("input[name='date']").value;
    console.log(cityName, date);
    // call a function displayTitle(date, cityName)
    // displayTitle(date, cityName);
    // call the ticket master api using the date and cityName (fetch)
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?size=10&city=' + cityName + '&date=' + date +'&apikey=GLE8iclmKIizOPTZtUoLOFpHe2fHejvM')
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
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
    console.log(data);
    // create variable for #results container using query selector
    var resultsContainerEl = document.getElementById('#results');

    // create a for loop to iterate through the events happening on that day
    for (i = 0; i < data._embedded.events.length; i ++) {
        // create a div to hold the event info
        var eventContainerEl = $('<div></div>')
        // add classes
        .addClass('col-11 border-dark p-2 m-2');
        // create a div to hold the event name, venue, and "add to favourites"
        var eventTitleContainerEl = $('<div></div>')
        // add classes
        .addClass('d-flex flex-row align-items-center justify-content-between');
        // create <h4></h4> for the event name
        var eventTitleEl = $('<h4></h4>')
        // text will equal data.event-name
        .text(data._embedded.events[i].name);
        // add classes
        // create a <p></p> for the Venue
        var venueEl = $('<p></p>')
        // text will equal data.venue
        .text(data._embedded.events[i]._embedded.venues[0].name)
        // add classes
        .addClass('text-muted');
        // create a <a></a> for "add to favourites"
        var favouritesLinkEl = $('<a></a>')
        // text will equal "add to favourites"
        .text("Add To Favourites")
        // add classes
        .addClass('text-decoration-underline');

        // append eventName, venue, addToFavourites to the rowDiv
        $(eventTitleContainerEl).append(eventTitleEl, venueEl, favouritesLinkEl);
        
        // create a <p></p> for the start time
        var startTimeEl = $('<p></p>')
        // text will equal data.start-time
        .text(data._embedded.events[i].dates.start.localTime)
        // add classes
        .addClass('font-weight-light');
        // create a <p></p> for the description
        // var descriptionEl = $('<p></p>')
        // text will equal data.description
        // .text(events._embedded.events[i].classification[0].genre.name)
        // add classes
        // create a <a></a> for "more info"
        var moreInfoEl = $('<a></a>')
        // text will equal "More Info"
        .text("More Info")
        // add link
        .attr('src', data._embedded.events[i].url)

        // append rowDiv, startTime, description, moreInfo to div
        $(eventContainerEl).append(eventTitleContainerEl, startTimeEl, moreInfoEl);

        // append div to #results
        $(resultsContainerEl).append(eventContainerEl);
    }

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
// a function to add the event's info to localStorage
    // create variable for the eventName
    // create variable for the startTime
    // create an empty array to hold events (as a global variable at the top of the code)
    // create an object to hold a event {name: eventName, time: startTime}
    // add the event object to the empty array
    // use localStorage.setItem to save the events array to localStorage
    // call function displayFavourites()

// create function to display favourites
    // create a variable for #favourite-events container using query selector
    // localStorage.getItem to get the events array of objects
    // use a for loop to display all the favourite events
        // create a <div></div> to hold the event
        // add classes
        // create a <h4></h4> for the event name
        // text will equal events[i].name
        // create a <p></p> for the start time
        // text will equal events[i].time

        // append name, time to the div
        // append div to #favourite-events container

// add event listener for .clearLink
// a function to clear the favourites card and clear the local storage
    // create a variable for #favourite-events container using query selector
    // clear innerHTML of the #favourite-events container

    // localStorage.clear() - to clear the favourite events from the local storage