// populate clicked movie info 

// after user inputs zip in search bar dynamically display local showtimes in the results div

//need it to search for showtimes of the previously selected movie title
// var shBtn = document.getElementById(searcHistory)
// = JSON.parse(localStorage.getItem(localStorage.key(localStorage.length - 1))).name

window.localStorage.getItem("key");

// declare variable and get url
var apiKey = "xfkuutw67xzmu7cs8dk27w3j";
var baseUrl = "http://data.tmsapi.com/v1.1";
var showtimesUrl = baseUrl + '/movies/showings';
var zip;
var d = new Date();
var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();

//searches movie showtimes near zip value
function movieSearch(e) {
    e.preventDefault()
    zip = $('#inputValue').val().trim()

    //send off the query
    $.ajax({
        url: showtimesUrl,
            data: { startDate: today,
                zip: zip,
                jsonp: "dataHandler",
                api_key: apiKey
            },
        dataType: "jsonp",
    });
};

//returns the data from the search
function dataHandler(data) {
$(document.body).append('<p>Found' + data.length + ' movies showing within 5 miles of ' + zip+':</p>');
    console.log("data:",data)
    var movies = data.hits;
    $.each(data, function(index, movie) {  // this is a jquery for each loop
        var movieData = `<div class="tile"><br/>`;
        movieData += movie.title;
        if (movie.ratings) { movieData += ' (' + movie.ratings[0].code + ') </div>' };
        $(document.body).append(movieData);
    });
}

//NOT FUNCTIONAL YET
// $("#back-to-main").on("click", backToMainPage())
// function backToMainPage(event) {
//     location.href = "index.html";
// }

// getapi(apiUrl)
$('#search').click(movieSearch) // jquery version of below

// In the DOM you have the search form
// Line 74 is a click listenter
// when the user clicks the button it runs the movieSearch function
// movieSearch gets the zip from the input field and runs the search