// paulg: foundation plugin for modal to run
$(document).foundation();
// paulg: hiding "clear searches" button when page loads but will come up when the the searches button is clicked
$("#openModal").hide();

//using moment to display the current date
var date = document.querySelector("#date");
date.textContent = moment().format("dddd Do MMMM, YYYY");

//setting a var to display movie results later
const $searchResultDiv = $('#search-result');
const $viewMovieInfoDiv = $('#view-movie-info');

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
const IMG_URL = "https://image.tmdb.org/t/p/w200";

//Selecting Elements
const searchBtn = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");
var movie = document.querySelector('#movie')
// global variable to store movie search result
let movieResultList = [];

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
                    $searchResultDiv.empty();
                    $viewMovieInfoDiv.empty();

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
                        let movieList = '';
                        // store movie result global to access later
                        movieResultList = data.results;

                        for (var i = 0; i < data.results.length; i++) {
                            if (data.results[i].poster_path) {
                              movieList += `<div class="movieBox medium-4 columns" data-movie-id=${data.results[i].id}>
                              <h6>${data.results[i].title}</h6>
                                <img class="thumbnail" src="${IMG_URL + data.results[i].poster_path}" alt="${data.results[i].title}">
                            </div>`
                            }
                        }
                        $searchResultDiv.html(movieList);
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
        $(".#search-result").empty();
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

$(function () {
  console.log('jquery ready');

  function addEventListner() {
    // using event delegation
    $searchResultDiv.on('click', '.movieBox', function (e) {
      $('#populate-here').hide();
      $('.placeholder').hide();
      $('.movie-title-display').hide();
      $("#search-result").empty();

      const clickedMovieId = $(this).data('movieId');
      const movie = movieResultList.filter(item => item.id === clickedMovieId)[0];

      const template = `
        <h1>${movie.title}</h1>
        <p>${movie.overview}</p>
      `
      $viewMovieInfoDiv.html(template);

      $('#zipBtn').show();
    });
  }

  addEventListner();
});