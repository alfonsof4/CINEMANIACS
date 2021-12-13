var date = document.querySelector('#date');
var movieTitleDisplay = document.querySelector('.movie-title-display')
date.textContent = moment().format('dddd Do MMMM, YYYY');


//Defining the intial value
const API_KEY = "27eb4a424f68db4c8bc0fea4d921efa7";
// const API_KEY_OMBD = '6ece1090'
const url = "https://api.themoviedb.org/3/search/movie?api_key=27eb4a424f68db4c8bc0fea4d921efa7";

//Selecting Elements for the
const searchBtn = document.querySelector("#search");
const clearBtn = document.querySelector("#clear");
const inputElement = document.querySelector("#inputValue");
// const movieSearchable = document.querySelector("#movies-searchable");

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
    const value = inputElement.value;
    const newUrl = url + "&query=" + value;
    inputElement.value = '';

    console.log("value: ", value);
    console.log("hello this button has been clicked");
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
                    movieTitle.setAttribute('id', data.results[i].id)
                    movieTitle.textContent = data.results[i].title;
                    movieDiv.append(movieTitle)
                    //on target click clear the results and display info on the movie selected, showing the tile as h1 and info as p
                    movieTitle.addEventListener('click', function (e) {
                        movieTitleDisplay.textContent = ''
                        console.log(data.results);
                        var filtered = data.results.filter(item => item.id == e.target.id)
                        console.log(filtered);
                        var title= document.createElement('h1')
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
    console.log("Value ", value);
};

function getZip(movieTitle) {
    console.log(movieTitle);
}

//clear history button function
clearBtn.onclick = function clearSearches() {
    //change to a modal
    if (confirm("Are you sure you want to clear all searches?")) {
        window.localStorage.clear();
    } else { }
    location.reload();
}