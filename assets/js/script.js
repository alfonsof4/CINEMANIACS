//using moment to display the current date
var date = document.querySelector('#date');
date.textContent = moment().format('dddd Do MMMM, YYYY');

//setting a var to display movie results later
var movieTitleDisplay = document.querySelector('.movie-title-display')

//Defining the intial value
const API_KEY = "27eb4a424f68db4c8bc0fea4d921efa7";
// const API_KEY_OMBD = '6ece1090'
const url = "https://api.themoviedb.org/3/search/movie?api_key=27eb4a424f68db4c8bc0fea4d921efa7";

//Selecting Elements for the
const searchBtn = document.querySelector("#search");
const clearBtn = document.querySelector("#clear");
const inputElement = document.querySelector("#inputValue");

//movie poster to populate
function movieSection(movies) {
    return movies.map((movie) => {
        return `<img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}/>`;
    });
}

//
function createMovieContainer(movies) {
    const movieElement = document.createElement("div");
    movieElement.setAttribute("class", "movie");

    const movieTemplate = `
    <section class="section">
    ${movieSection(movies)}
</section>
<div class="content">
    <p id="content-close">X</p>
</div>
`;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

//executes search, clears input value
searchBtn.onclick = function (event) {
    event.preventDefault();
    //takes the input from the searchbar and applies it to the api url
    const value = inputElement.value;
    const newUrl = url + "&query=" + value;
    inputElement.value = '';

    //hides the populate-here placeholders on click. need to change it to only hide on successful search execution not on empty clicks or no returns
    $('#populate-here').hide();
    $('.placeholder').hide();

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
                        movieTitleDisplay.textContent = ''
                        console.log(data.results);
                        var filtered = data.results.filter(item => item.id == e.target.id)
                        console.log(filtered);
                        var title = document.createElement('h1')
                        title.textContent = filtered[0].title
                        var info = document.createElement('p')
                        info.textContent = filtered[0].overview

                        // create btn for showtime search and append to mtd 
                        movieTitleDisplay.append(title, info)


                    })
                }
            });
        } else {
            //change to modal
            alert("error:" + res.statusText);
        }
    });
};

//this links the second html created for the local showtimes page
function toLocalSearchPage() {
    location.href = "local-search.html";
}

//clear history button function
clearBtn.onclick = function clearSearches() {
    //change to a modal
    if (confirm("Are you sure you want to clear all searches?")) {
        window.localStorage.clear();
    } else { }
    location.reload();
}