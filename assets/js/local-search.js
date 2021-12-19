// populate clicked movie info 

// after user inputs zip in search bar dynamically display local showtimes in the results div

//need it to search for showtimes of the previously selected movie title
// var shBtn = document.getElementById(searcHistory)
// = JSON.parse(localStorage.getItem(localStorage.key(localStorage.length - 1))).name
//using moment to display the current date
var date = document.querySelector("#date");
date.textContent = moment().format("dddd Do MMMM, YYYY");

var data = JSON.parse(localStorage.getItem("title"));

// declare variable and get url

var apiKey = "xfkuutw67xzmu7cs8dk27w3j";
var baseUrl = "http://data.tmsapi.com/v1.1";
var showtimesUrl = baseUrl + '/movies/showings';
var zip;
var d = new Date();
var today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

//searches movie showtimes near zip value
function movieSearch(e) {
    e.preventDefault()
    zip = $('#inputValue').val().trim()

    //send off the query
    $.ajax({
        url: showtimesUrl,
        data: {
            startDate: today,
            zip: zip,
            jsonp: "dataHandler",
            api_key: apiKey
        },
        dataType: "jsonp",
    });
};

// retrieves the movie showtimes data from the zip 
//need to display results in the results div https://www.jquery-az.com/use-jquery-append-add-html-content-examples/

function dataHandler(data) {
	$(document.body).append(
		"<p>Found" + data.length + " movies showing within 5 miles of " + zip + ":</p>"
	);
	console.log("data:", data);
	var movies = data.hits;
	var recentSearches = JSON.parse(window.localStorage.getItem('title'));
	$.each(data, function (index, movie) {
		var movieTitle = recentSearches[recentSearches.length-1];
		console.log(movieTitle)
		// this is a jquery for each loop
		var movieData = `<div class="tile"><br/>`;
		if (movieTitle === movie.title) {
		movieData += movie.title;
		if (movie.ratings) {
			movieData += " (" + movie.ratings[0].code + ") </div>";
		}	
		}
		$(document.body).append(movieData);
		var movieData = document.createElement("div")
	});
}

// get array of movies from local storage
// compare last index to movie titles


//back to main page btn var linked to html button id
var backToMainBtn = document.getElementById("back-to-main")
backToMainBtn.addEventListener("click", backToMain)
//this links the first html created for the movie search page
function backToMain() {
    location.href = "./index.html";
}

getSearches()

//display prior searches in the recent-searches div as buttons
//buttons have no link function
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
            btn.className = "button";
            btn.attributes = "";
        }
    }
}

// getapi(apiUrl)
$('#search').click(movieSearch) // jquery version of below

// In the DOM you have the search form
// Line 74 is a click listenter
// when the user clicks the button it runs the movieSearch function
// movieSearch gets the zip from the input field and runs the search
