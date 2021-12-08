var date = document.querySelector('#date');
date.textContent = moment().format('dddd MMMM, YYYY');

/*now unlike the css this really cant be altered too much just because they are 
 things that the moviedb required to use in the searches. i was beat after all this mess
but since its free still have to add the logo or whatever somewhere to pay credit to them for using api key*/

//Selecting Elements for the DOM

const buttonElement = document.querySelector('#search');
const InputElemenet = document.querySelector('#inputvalue');

//creating of the button elemet it will fire once selected

buttonElement.onclick = function(event) {
 /*this is the example in colsole log to show yall button works
   console.log('hello button click');*/

   event.preventDefault();
   //prevent the default behavior of the submission button

   const value = 'InputElement.value';
   /*again just to show yall what would be logged when ran and that it worked
   console.log('Value : ', value);*/

  //Defining the intial value
  const API_KEY = '27eb4a424f68db4c8bc0fea4d921efa7';

  /*This is the base of wwhat you need to search with moviedb
  GET/Search/Movie
  then you have to have a strating point and an end point for your seacrh
  http://api.themoviedb.org/3/search/movie?api_key=key that i wont post&query=furious(as an example
  ours will be dynamic)*/


}