var date = document.querySelector("#date");
date.textContent = moment().format("dddd MMMM, YYYY");

/*now unlike the css this really cant be altered too much just because they are 
 things that the moviedb required to use in the searches. i was beat after all this mess
but since its free still have to add the logo or whatever somewhere to pay credit to them for using api key*/

//Defining the intial value
const API_KEY = "27eb4a424f68db4c8bc0fea4d921efa7";
const newUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=27eb4a424f68db4c8bc0fea4d921efa7";

//Selecting Elements for the DOM

const buttonElement = document.querySelector("#search");
const InputElemenet = document.querySelector("#inputvalue");

//creating of the button elemet it will fire once selected

buttonElement.onclick = function (event) {
  /*this is the example in colsole log to show yall button works
   console.log('hello button click');*/

  event.preventDefault();
  //prevent the default behavior of the submission button

  const value = "inputElement.value";
  /*again just to show yall what would be logged when ran and that it worked
   console.log('Value : ', value);*/
  const newUrl = url + "&query=" + value;

  /*this is a bulit in javascript function i spent forever trying to convert the data from
    the moviedb that they key would return and I was stuck then I found this it 
    basically converts the raw data i was getting from the api into json and fits it into code*/
  fetch(newUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log("Data: ", data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
  console.log("Value ", value);
};
