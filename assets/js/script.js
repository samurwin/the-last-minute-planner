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
};

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
    var category = document.querySelector(".search-category").value;
    var dayBefore = moment(date, 'MM/DD/YYYY').subtract(1,'d').format('YYYY-MM-DD');
    var dayAfter = moment(date, 'MM/DD/YYYY').add(1, 'd').format('YYYY-MM-DD');
    
    // call a function displayTitle(date, cityName)
    displayTitle(date, cityName);

    // call the ticket master api using the date and cityName (fetch)
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?size=10&city=' + cityName + '&startEndDateTime=' + dayBefore + 'T00:00:00Z,' + dayAfter + 'T00:00:00Z&classificationName=' + category + '&apikey=GLE8iclmKIizOPTZtUoLOFpHe2fHejvM')
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
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + response.coord.lat + '&lon=' + response.coord.lon +'&units=metric&appid=460baac12caacdeca58e7bae8f1299bc')
        .then(function(weather) {
            return weather.json();
        })
        .then(function(weather) {
            $('#forecast').empty();
            displayWeather(weather, cityName, date);
        })
    })
});

// create a function to display the events on the page
var displayEvents = function(data) {
    console.log(data._embedded.events);

    // create a for loop to iterate through the events happening on that day
    for (i = 0; i < data._embedded.events.length; i ++) {
       createEvent(data, i);
    }
    
};

var createEvent = function(data, i) {
    var currentEvent = data._embedded.events[i];

    var eventContainerEl = $('<div></div>')
    .addClass('col-11 border border-dark p-2 m-2 event-text');

    var eventTitleContainerEl = $('<div></div>')
    .addClass('d-flex flex-row  justify-content-between event-titles');
    var eventTitleEl = $('<h5></h5>')
    .text(currentEvent.name)
    .addClass('m-0 event');
    var favouritesLinkEl = $('<button></button>')
    .text("Add To Favourites")
    .addClass('btn btn-outline-secondary save d-none d-lg-block');

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
    .addClass('d-none d-lg-block')
    .attr('href', currentEvent.url)
    var favouritesLinkEl1 = $('<button></button>')
    .text("Add To Favourites")
    .addClass('btn btn-outline-secondary buttons  save d-sm-none d-block float-left');
    var moreInfoEl1 = $('<button></button>')
    .text("More Info")
    .addClass('btn btn-outline-secondary buttons float-right d-sm-none d-block')

    $(moreInfoEl1).on('click', function(){
        window.location = currentEvent.url;
    })

    $(eventContainerEl).append(eventTitleContainerEl, genreEl, venueEl, startTimeEl, moreInfoEl, favouritesLinkEl1, moreInfoEl1);
    $('#results').append(eventContainerEl);
};


// create a function to display the weather
var displayWeather = function(weather, cityName, date) {
    var forecastContainerEl = document.getElementById('forecast');

    if (moment().format('MM/DD/YYYY') === date){
        var cityEl = $('<h5></h5>')
        .text(cityName)
        .addClass('m-0 ')
        var conditionsEl = $('<img>')
        .attr('src', 'https://openweathermap.org/img/wn/' + weather.current.weather[0].icon + '@2x.png')
        .attr('alt', weather.current.weather[0].main);
        var tempEl = $('<p></p>')
        .text('Temp: ' + weather.current.temp + '°C');

        $(forecastContainerEl).append(cityEl, conditionsEl, tempEl);
    } else {
        switch (date) {
            case moment().add(1, 'd').format('MM/DD/YYYY'):
                i = 0;
                break;
            case moment().add(2, 'd').format('MM/DD/YYYY'):
                i = 1;
                break;
            case moment().add(3, 'd').format('MM/DD/YYYY'):
                i = 2;
                break;
            case moment().add(4, 'd').format('MM/DD/YYYY'):
                i = 3;
                break;
            case moment().add(5, 'd').format('MM/DD/YYYY'):
                i = 4;
                break;
            case moment().add(6, 'd').format('MM/DD/YYYY'):
                i = 5;
                break;
            case moment().add(7, 'd').format('MM/DD/YYYY'):
                i = 6;
                break;
            default:
                var messageEl = $('<p></p>')
                .text('No Weather Forecast for this day. Weather Forecast is available for up to 7 days in the future.')
                $(forecastContainerEl).append(messageEl);
        }

        futureWeather(weather, cityName, i);
    }

};

var futureWeather = function(weather, cityName, i) {
    var cityEl = $('<h5></h5>')
    .text(cityName)
    .addClass('m-0')
    var conditionsEl = $('<img>')
    .attr('src', 'http://openweathermap.org/img/wn/' + weather.daily[i].weather[0].icon + '@2x.png')
    .attr('alt', weather.daily[i].weather[0].main);
    var tempEl = $('<p></p>')
    .text('Temp: ' + weather.daily[i].temp.day + '°C');

    $('#forecast').append(cityEl, conditionsEl, tempEl);
};

$('#results').on('click',".save", function(event){
    var eventName = $(this).parent().find('.event').text();
    var startTime = $(this).closest('.event-text').find('.time').text();
    console.log(eventName);
    console.log(startTime);
    var saveData = [{name: eventName, time: startTime}];
    
    localStorage.setItem('favouriteEvents', JSON.stringify(saveData));
    displayFavourites();
});

var displayFavourites = function(){
    var toGetEventName = JSON.parse( localStorage.getItem('favouriteEvents'))
    console.log(toGetEventName); 
            
    for (i = 0; i < toGetEventName.length; i ++) {
        createShowFavourites(i, toGetEventName);
    }
};

var createShowFavourites = function(i, toGetEventName) {
    //console.log(i);
    var favouriteCardEl = $('<div></div>')
    .addClass('col-11 border border-dark p-2 m-2')

    var eventNameEl = $('<h6></h6>')
    .text(toGetEventName[i].name)

    var timeEl = $('<p></p>')
    .text(toGetEventName[i].time)
    $(favouriteCardEl).append(eventNameEl, timeEl );
    $('#favourite-events').append(favouriteCardEl);
};


$('#drop-down').on('click', function(){
    displayFav();
})

var displayFav = function(){
    console.log(displayFav);
    var toGetEventName = JSON.parse( localStorage.getItem('favouriteEvents'))
    //console.log(toGetEventName); 
            
    for (i = 0; i < toGetEventName.length; i ++) {
        createFavourite(i, toGetEventName);
    }

    var clearLinkEl = $('<buttons></buttons>')
    .addClass('btn btn-link btnEl')
    .text('Clear')
    $('#clear').append(clearLinkEl);
}

var createFavourite = function(i, toGetEventName){
    console.log(toGetEventName);
    var cardEl = $('<div></div>')
    .addClass('col-11 border border-dark p-2 m-3 cardEl')
    .text(toGetEventName[i].name+  ":" + "  " +  toGetEventName[i].time)
    $('#display-btn').append(cardEl);
} 

$("#clear").on("click",function() {
    
    $('#display-btn').html("");
    localStorage.removeItem('favouriteEvents');
})

displayFavourites();   