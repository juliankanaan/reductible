// function returns an array of matching words if they exist in a larger string. 

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

var sample = 'The quick brown fox jumps over the lazy dog';
var input  = 'man quick fun who could the';

var results = matchBuilder(sample, input);
console.log(results); // returns ["quick", "the"]

