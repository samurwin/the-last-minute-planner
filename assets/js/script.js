var favouriteEvents = [];

// event listener for the searchBtn


// a function to handle all the calls made after the searchBtn is clicked

    
    // call the ticket master api using the date and cityName (fetch)
        // then call displayEvents(data)
    // call the weather api using the date and cityName (fetch)
        // then call displayWeather(data)

// create a function to display the title
    // use querySelector to get the span element 
    // text of the span will equal the cityName + date

// create a function to display the events on the page
var displayEvents = function(){
    console.log(displayEvents);
    var resultContainerEl = document.querySelector('#favourite-events');
    resultContainerEl.className = addToFavourites;
    

    for (var i = 0; i = events.length; i++){
        // event name
        var eventName = events[i] +  '/' + events[i].name;

        // create a div to hold the event info
        var infoEl = document.createElement('div');
        // add classes
        infoEl.classList = "list-item flex-row justify-space-between align-center";

        //// create <h4></h4> for the event name
        var eventNameEl = document.createElement('h4');
        // text will equal data.event-name
        eventNameEl.textContent = data.event-Name;
        // add classes
        eventNameEl.classList = "list-item flex-row justify-space-between align-center";
        //append to container
        infoEl.appendChild(eventNameEl);

        var startTimeEl = document.createElement('p');
        startTime.textContent = data.time;
        startTimeEl.classList = "list-item flex-row justify-space-between align-center"
        infoEl.appendChild(startTimeEl);

        // create a <p></p> for the Venue
        var vanueEl = document.createElement('p');
        // text will equal data.venue
        vanueEl.textContent = data.vanue;
        // add classes
        vanueEl.classList = "list-item flex-row justify-space-between align-center";
        //append
        infoEl.appendChild(vanueEl);

        // create a <a></a> for "add to favourites"
        var favouritesEl = document.createElement('a');
        // text will equal "add to favourites"
        favouritesEl.textContent = addToFavourites;
        // add classes
        favouritesEl.classList = "list-item flex-row justify-space-between align-center";
        //append
        infoEl.appendChild(favouritesEl);

         // append div to #results
         resultContainerEl.appendChild(infoEl);


    }

    console.log(eventName);
    console.log(startTime);


    // create variable for #results container using query selector
    
    // create a for loop to iterate through the events happening on that day
        // create a div to hold the event info
        // add classes
        // create a div to hold the event name, venue, and "add to favourites"
        // add classes
        // create <h4></h4> for the event name
        // text will equal data.event-name
        // add classes
        // create a <p></p> for the Venue
        // text will equal data.venue
        // add classes
        // create a <a></a> for "add to favourites"
        // text will equal "add to favourites"
        // add classes

        // append eventName, venue, addToFavourites to the rowDiv
        
        // create a <p></p> for the start time
        // text will equal data.start-time
        // add classes
        // create a <p></p> for the description
        // text will equal data.description
        // add classes
        // create a <a></a> for "more info"
        // text will equal "More Info"
        // add classes

        // append rowDiv, startTime, description, moreInfo to div

        // append div to #results
}
displayEvents();
// create a function to display the weather
    // create a variable for the #forecast container

    // create a <h4> for the City Name
    // text will equal data.city
    // create an <img> for the weather condidtions (icon)
    // attr src="url"
    // attr alt="data.weather-condition"
    // add classes
    // create a <p></p> for the temperature
    // text will equal data.temp

    // append cityName, icon, temp to #forecast container

// event listener for #results container for element with the class .addToFavourites
document.getElementsByClassName('addToFavourites').addEventListner('submit', );
// a function to add the event's id to localStorage

    // create an empty array to hold events
   
    // create an object to hold a event {name: eventName, time: startTime}
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
    // create a variable for #favourite-events container
    // clear innerHTML of the #favourite-events container

    // localStorage.clear() - to clear the favourite events from the local storage


