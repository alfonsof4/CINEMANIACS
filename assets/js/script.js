var date = document.querySelector('#date');
date.textContent = moment().format('dddd Do MMMM, YYYY');


//Defining the intial value
const API_KEY = "27eb4a424f68db4c8bc0fea4d921efa7";
const url =
    "https://api.themoviedb.org/3/search/movie?api_key=27eb4a424f68db4c8bc0fea4d921efa7";

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

    fetch(newUrl).then(function (res) {
        if (res.ok) {
            res.json().then(function (data) {
                console.log(data);
            });
        } else {
            //change to modal
            alert("error:" + res.statusText);
        }
    });
    console.log("Value ", value);
};


//clear history button function
clearBtn.onclick = function clearSearches() {
            //change to a modal
    if (confirm("Are you sure you want to clear all searches?")) {
        window.localStorage.clear();
    } else { }
    location.reload();
}