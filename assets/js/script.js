
// foundation plugin for modal to run
$(document).foundation();

//using moment to display the current date
var date = document.querySelector('#date');
date.textContent = moment().format('dddd Do MMMM, YYYY');

//setting a var to display movie results later
var movieTitleDisplay = document.querySelector('.movie-title-display')
//setting var for the movie details after a title is clicked
var detailsPopulate = document.querySelector('.details-populate')

//hides the results grid div on load
$('.movie-title-display').hide();
//hides the zip search button on load
$('#zipBtn').hide();

//Defining the intial value
const API_KEY = "27eb4a424f68db4c8bc0fea4d921efa7";
const url = "https://api.themoviedb.org/3/search/movie?api_key=27eb4a424f68db4c8bc0fea4d921efa7";

//Selecting Elements
const searchBtn = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");

var movie = document.querySelector('#movie')

//executes search, clears input value
searchBtn.onclick = function (event) {
    event.preventDefault();
    //takes the input from the searchbar and applies it to the api url
    const value = inputElement.value;
    const newUrl = url + "&query=" + value;

    // save to local storage call here?

    //clear the input value box
    inputElement.value = '';

    //hides the populate-here placeholders on click. need to change it to only hide on successful search execution not on empty clicks or no returns
    $('#populate-here').hide();
    $('.placeholder').hide();

    //shows the results div
    $('.movie-title-display').show();

//getResults
    //search for movie entered into search and return the data
    fetch(newUrl).then(function (res) {
        if (res.ok) {
            res.json().then(function (data) {

                console.log(data);

                //clear data display window of any previous searches
                movieTitleDisplay.textContent = ''

                //loop through the data results and create each title as a p
                for (var i = 0; i < data.results.length; i++) {

                    var movieDiv = document.createElement('div')

                // paulg: class attribute added to div for modal removal later
                    movieDiv.setAttribute("class", "movieBox");

                    movieTitleDisplay.append(movieDiv)
                    var movieTitle = document.createElement('p');
                    //set class, id of each p
                    movieTitle.setAttribute('class', 'box')
                    movieTitle.setAttribute('id', data.results[i].id)
                    //add the text content from the returned data titles and lsit them
                    movieTitle.textContent = data.results[i].title;
                    movieDiv.append(movieTitle)

                    //on target click clear the results and display info on the movie selected, showing the tile as h1 and info as p
                    movieTitle.addEventListener('click', function (e) {

                        //hides the populate-here placeholders again to display the clicked detail and this time the movie-title-display grid
                        $('#populate-here').hide();
                        $('.placeholder').hide();
                        $('.movie-title-display').hide();

                        //clears the previous titles
                        movieTitleDisplay.textContent = ''
                        console.log(data.results);
                        //pulls the detailed data from the clicked title
                        var filtered = data.results.filter(item => item.id == e.target.id)
                        // console.log(filtered);

                        //creates the elements and displays the detailed information
                        var title = document.createElement('h1')
                        title.setAttribute('class', 'detail')
                        title.textContent = filtered[0].title
                        var info = document.createElement('p')
                        info.textContent = filtered[0].overview
                        //reveals the zipBtn that will redirect to the local search page
                        $('#zipBtn').show();

                        detailsPopulate.prepend(title, info)

                        // create btn for showtime search and append to mtd 
                    })
                }
            });
        } else {
        //change to modal
            alert("error:" + res.statusText);
            // reset the page to default after error
            location.reload();
        }
    });
};

// add to onclick for zipcode btn 
//this links the second html created for the local showtimes page
function toLocalSearchPage() {
    location.href = "local-search.html";
}

// paulg: modal created to make sure user would like to clear their search history
var openModal = document.getElementById("openModal");
openModal.addEventListener("click", function () {
    localStorage.setItem("movies", "movieTitle");
}, false);


var clearHistory = document.getElementById("clearSearches");
clearHistory.addEventListener('click', function() {
    console.log('Hello world');
    $(".movieBox").remove();
    // window.location.reload(true);
    window.localStorage.clear();
    location.reload();
}, false);