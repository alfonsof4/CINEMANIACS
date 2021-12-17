// paulg: foundation plugin for modal to run
$(document).foundation();
// paulg: hiding "clear searches" button when page loads but will come up when the the searches button is clicked
$("#openModal").hide();

//using moment to display the current date
var date = document.querySelector("#date");
date.textContent = moment().format("dddd Do MMMM, YYYY");

//setting a var to display movie results later
var movieTitleDisplay = document.querySelector(".movie-title-display");
//setting var for the movie details after a title is clicked
var detailsPopulate = document.querySelector(".details-populate");


//hides the results grid div on load
$(".movie-title-display").hide();
//hides the zip search button on load
$("#zipBtn").hide();

//Defining the intial value
const API_KEY = "27eb4a424f68db4c8bc0fea4d921efa7";
const url =
    "https://api.themoviedb.org/3/search/movie?api_key=27eb4a424f68db4c8bc0fea4d921efa7";

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

    // paulg: if else statement added so the api is only called when there are values in the text field
    if (value === "") {
        $("#finalAnswer").hide();
        $("#modalText").text("Please submit a valid movie title");
        $("#exampleModal1").foundation("open");
    } else {
        // paulg: "clear searches" button to pop up when search button is clicked
        $("#openModal").show();

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
                    // console.log(data);

                    //clear data display window of any previous searches
                    movieTitleDisplay.textContent = ''

                    if (data.results.length <= 0) {
                        $("#finalAnswer").hide();
                        $("#modalText").text(
                            "No movies found. Please correct your movie title selection."
                        );
                        $("#openModal").hide();
                        $("#exampleModal1").foundation("open");
                        $(".placeholder").show();
                    } else {
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
                                // console.log(data.results);
                                //pulls the detailed data from the clicked title
                                var filtered = data.results.filter(item => item.id == e.target.id)
                                // console.log(filtered);

                                //creates the elements and displays the detailed information
                                var title = document.createElement('h1')
                                title.setAttribute('class', 'detail')
                                title.textContent = filtered[0].title
                                var info = document.createElement('p')
                                // paulg: adding class to p tag to be able to remove both detail, and detailText class later
                                info.setAttribute("class", "detailText");
                                info.textContent = filtered[0].overview

                                detailsPopulate.prepend(title, info)

                                // calls function to commit title to local storage 
                                saveRecentSearches(title.textContent);

                                //reveals the zipBtn that will redirect to the local search page
                                $('#zipBtn').show();

                                //back to search button
                                //onclick detailsPopulate.textContent = ''
                                //return to 
                            })
                        }
                    }
                });
            } else {
                // reset the page to default after error modal

                location.reload();
            }
        });
    }
};

// paulg: modal created to make sure user would like to clear their search history
var openModal = document.getElementById("openModal");
openModal.addEventListener(
    "click",
    function () {
        localStorage.setItem("movies", "movieTitle");
        $("#modalText").text("");
        $("#finalAnswer").show();
    },
    false
);

//link zip button to an event listenter and redirect to local search page on click
var zipBtn = document.getElementById("zipBtn")
zipBtn.addEventListener("click", toLocalSearchPage)
//this links the second html created for the local showtimes page
function toLocalSearchPage() {
    location.href = "local-search.html";
}

var clearHistory = document.getElementById("clearSearches");
clearHistory.addEventListener(

    "click",
    function (event) {
        $(".movieBox").remove();
        // paulg: removes displayed movie detail and detailText classes
        $(".detail").remove();
        $(".detailText").remove();
        $("#modalText").text("");
        $(".placeholder").show();
        $("#openModal").hide();
        window.localStorage.clear();
    },
    false
);


//save searches to local storage
function saveRecentSearches(movie) {
    recentSearchHistory = localStorage.getItem("title") ?
        JSON.parse(localStorage.getItem("title")) : [];
    recentSearchHistory.push(movie)

    // keeps array at length of 5 
    if (recentSearchHistory.length > 5) {
        recentSearchHistory.shift();
    }
    localStorage.setItem("title", JSON.stringify(recentSearchHistory))
    clearBtns()
    getSearches()
}

getSearches()

//display prior searches in the recent-searches div as buttons
function getSearches() {
    var data = JSON.parse(localStorage.getItem("title"));
    if (data === null) {
        document.getElementById("search-history").innerHTML = ("No Recent Searches");
    } else {
        data = JSON.parse(localStorage.getItem("title"));
        for (i = 0; i < data.length; i++) {
            var btn = document.createElement("button")
            btn.textContent = data[i]
            document.querySelector(".movies .btn-group").appendChild(btn)
            btn.className = "btn";
            btn.attributes = "";
        }
    }
}

// function is called in the saverecentsearches, clears button array to replace with new searches 
function clearBtns() {
    const recentBtns = document.querySelector("#search-history");
    recentBtns.innerHTML = ""
}
