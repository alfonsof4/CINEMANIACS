var date = document.querySelector("#date");
date.textContent = moment().format("dddd MMMM, YYYY");

/*now unlike the css this really cant be altered too much just because they are 
 things that the moviedb required to use in the searches. i was beat after all this mess
but since its free still have to add the logo or whatever somewhere to pay credit to them for using api key*/

//Defining the intial value
const API_KEY = "27eb4a424f68db4c8bc0fea4d921efa7";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=27eb4a424f68db4c8bc0fea4d921efa7";
//Selecting Elements for the DOM

const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");
const movieSearchable = document.querySelector("#movies-searchable");

function movieSection(movies) {
  return movies.map((movie) => {
    return `
           <img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}/>
        `;
  });
}

function createMovieContainer(movies) {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const movieTemplate = `
    <section class="section">
        ${movieSelection(movies)}
       </section>
        <div class="content">
        <p id="content-close">X</p>
        </div>
        `;

  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

buttonElement.onclick = function (event) {
  event.preventDefault();
  const value = inputElement.value;

  const url = newUrl + "&query=" + value;
};

fetch(newUrl)
  .then((res) => res.json())
  .then((data) => {
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log("Data: ", data);
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
console.log("Value ", value);
