var date = document.querySelector("#date");
date.textContent = moment().format("dddd MMMM, YYYY");

/*now unlike the css this really cant be altered too much just because they are 
 things that the moviedb required to use in the searches. i was beat after all this mess
but since its free still have to add the logo or whatever somewhere to pay credit to them for using api key*/

//Defining the intial value
const API_KEY = "27eb4a424f68db4c8bc0fea4d921efa7";
//https://api.themoviedb.org/3/search/movie?api_key=27eb4a424f68db4c8bc0fea4d921efa7&query=furious
//const movie_endpoint = "http://api.themoviedb.org";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=27eb4a424f68db4c8bc0fea4d921efa7";
//const newUrl =
// "https://api.themoviedb.org/3/search/movie?api_key=27eb4a424f68db4c8bc0fea4d921efa7";
//Selecting Elements for the DOM
var testurl =
  "https://api.themoviedb.org/3/movie/550?api_key=27eb4a424f68db4c8bc0fea4d921efa7";
const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");
const movieSearchable = document.querySelector("#movies-searchable");

/*function requestMovie(uri, onComplete, onError) {
  fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError);*/

/* function generateMovieUrl(path) {
    const url = "${movie_endpoint}/3${path}?api_key=${API_KEY}";
    return url;
  }
}*/
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
    ${movieSection(movies)}
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

  const newUrl = url + "&query=" + value;

  console.log("value: ", value);
  console.log("hello this button has been clicked");

  /*fetch(newUrl)
    .then((res) => res.json())
    .then((data) => {
      //console.log("Data: ", data);
      const movies = data.results;
      const movieBlock = createMovieContainer(movies);
      movieSearchable.appendChild(movieBlock);
      console.log("Data: ", data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });*/
  fetch(newUrl).then(function (res) {
    if (res.ok) {
      res.json().then(function (data) {
        console.log(data);
      });
    } else {
      alert("error:" + res.statusText);
    }
  });
  console.log("Value ", value);
};
