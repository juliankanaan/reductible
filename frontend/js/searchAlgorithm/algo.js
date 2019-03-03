jQuery(document).ready(function() {

function isolateWords(input){
      String(input);
      var words = input.split(" ");
      return words;
}
function stringContains(bigString, smallString){
    if (bigString.indexOf(smallString) >= 0) {
      return true;
    } else {
      return false;
    }
}


function matchBuilder(sample, input){
  var resultsArray = []; // array of matches
  var splitInput = isolateWords(input);

  if (stringContains(sample, input)) { // is it an outright match?

    console.log("Outright match");
    resultsArray.push(splitInput); // push all words into match array

  } else { // okay, do any of the individual words in query match?

    $.each(splitInput, function(index, value){ // loop over each word in user input

            if ( stringContains(sample, value) ) {

                   resultsArray.push(value); // append each matching word to match array

            } else {

              console.log("Cant find match in words");

            }
    });

}
return resultsArray;
} // end matchBuilder()

function differenceBuilder(array1, array2){

  var differences = $(array1).not(array2).get();

  return differences;

} // end differenceBuilder()

});

/*

var sample = 'concussion mc w occ';
var input  = 'concussion occ';

var matches = matchBuilder(sample, input);
console.log(matches); // returns ["concussion", "occ"]
var difference = differenceBuilder(isolateWords(sample), isolateWords(input));
console.log(difference); // returns ["mc", "w"]

var newQuery = $.merge(matches, difference);

console.log(newQuery); // ["concussion", "occ", "w", "mcc"]

*/
