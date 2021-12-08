var date = document.querySelector('#date');
date.textContent = moment().format('dddd MMMM, YYYY');

//now unlike the css this really cant be altered too much just because they are 
// things that the moviedb required to use in the searches. i was beat after all this mess
//but since its free still have to add the logo or whatever somewhere to pay credit to them for using api key

//Selecting Elements for the DOM

const buttonElement = document.querySelector('#search');
const InputElemenet = document.querySelector('#inputvalue');

//creating of the button elemet it will fire once selected

buttonElement.onclick = function(event) {
 //this is the example in colsole log to show yall button works
   // console.log('hello button click');
   event.preventDefault();
   //prevent the default behavior of the submission button
   const value = InputElement.value;

}