// populate clicked movie info 

// after user inputs zip in search bar dynamically display local showtimes in the results div

// declare variables
var apiKey = "xfkuutw67xzmu7cs8dk27w3j";
var baseUrl = "http://data.tmsapi.com/v1.1";
var showtimesUrl = baseUrl + 'movies/showings';
var zipCode = "78701";
var d = new Date();
var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();

$(document).ready(function() {

    //send off the query
    $.ajax({
        url: showtimesUrl,
            data: {
                zip: zipCode,
                jsonp: "dataHandler",
                api_key: apiKey
            },
        dataType: "jsonp",
    });
});

//callback function

// zip code api call using fetch
// function zipSearch() {
//     fetch(baseUrl).then(function (res) {
//       if (res.ok) {
//         res.json().then(function (data) {
//           console.log("test", data);
//           const areaCode = data.results;
//           const movieBlock = createMovieContainer(movies);
//           movieSearchable.innerHTML = movieBlock;
//         });
//       } else {
//         alert("error:" + res.statusText);
//       }
//     });
//   }


function dataHandler(data) {
$(document.body).append('<p>Found' + data.length + ' movies showing within 5 miles of ' + zipCode+':</p>');
    var movies = data.hits;
    $.each(data, function(index, movie) {
        var movieData = '<div class="tile"><img src="http://developer.tmsimg.com/' + movie.preferredImage.uri + '?api_key='+apiKey+'"><br/>';
        movieData += movie.title;
        if (movie.ratings) { movieData += ' (' + movie.ratings[0].code + ') </div>' };
        $(document.body).append(movieData);
    });
}
