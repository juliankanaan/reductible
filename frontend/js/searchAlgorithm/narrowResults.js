function searchInitial(query){

      String(query); // convert to string
      var url = '#';
      var data = JSON.stringify({search: query, sort: "price", perpage: 20, page: 1, direction: -1});
      var pricesArray = [];
      var procArray = [];
      jQuery.ajax({
        type: "POST",
        url: url,
        headers: { 'Content-Type':'application/json'},
        dataType: "json",
        data: data,
        success: function(json) {
          // check for success & do something:
          // alert("You got API data");
          //$("#similar").fadeIn();
          //console.log(JSON.stringify(json));
          jQuery.each(json, function(index, item) { // in the "Price data sets"
            var prices = item.prices;
            jQuery.each(prices, function(index, item) { // for each line item

              var itemprice = JSON.stringify(item.price).replace(/\"/g, "");
              var desc = JSON.stringify(item.description);


              pricesArray.push(itemprice);
              procArray.push(desc);



            }); // end loop
          }); // end outside loop
          newArray = withinOne(pricesArray, procArray); // only give procedures within +- a std deviation


        }



      });

     return newArray;


} // end searchInitial()

function searchAnalysis(query){

      String(query); // convert to string
      var url = '#';
      var data = JSON.stringify({search: query, sort: "price", perpage: 100, page: 1, direction: -1});
      var pricesArray = [];
      var procArray = [];
      jQuery.ajax({
        type: "POST",
        url: url,
        headers: { 'Content-Type':'application/json'},
        dataType: "json",
        data: data,
        success: function(json) {
          // check for success & do something:
          // alert("You got API data");
          //$("#similar").fadeIn();
          //console.log(JSON.stringify(json));
          jQuery.each(json, function(index, item) { // in the "Price data sets"
            var prices = item.prices;
            jQuery.each(prices, function(index, item) { // for each line item

              var itemprice = JSON.stringify(item.price).replace(/\"/g, "");
              var desc = JSON.stringify(item.description);


              pricesArray.push(itemprice);
              procArray.push(desc);



            }); // end loop
          }); // end outside loop
          newArray = withinOne(pricesArray, procArray); // only give procedures within +- a std deviation


        }



      });

     return newArray;


} // end searchAnalysis()


function mergeKeyValue(array1, array2){ // only works when both arrays are strings

   var newArray = [];
   for(var y = 0; y < array1.length; y++){
    var thing = {};
    for(var i = 0; i < array2.length; i++){
        newArray[array2[i]] = array1[y][i];
    }
    newArray.push(thing);
    }

    return newArray; // key val pairs

}

function mean(theArray){


  var avg = stripQuotes(theArray).reduce((a, b) => a + b, 0);

  return avg / theArray.length;

}
function stripQuotes(theArray){

    var cleanArray = [];

    jQuery.each(theArray, function(index, item) {

     var cleanVal = item.replace("\"", " "); // make into a string, clean


     cleanArray.push(Number(cleanVal)); // append to new array

     }); // end outside loop

     return cleanArray;

}

function withinOne(pricesArray, procedureArray){ // return new procedure array with prices +- one std

  var std = stdDev(pricesArray);
  var avg = mean(pricesArray);
  var two = std; // two stdv
  console.log(two);
  var goodArray = [];
  $.each(pricesArray, function(index, item) { // loop prices, pick out

    if (item < ( avg + two ) && item > (avg - two )) {
      // console.log(item);

      goodArray.push(procedureArray[index]);
    }

  });
  return goodArray;

}

function stdDev(theArray){

    // loop over each number, subtracting them from the mean
    var variance = 0;
    var avg = mean(theArray);
    var varianceSum = 0;

    $.each(theArray, function(index, value){

       variance = ( value - avg );
       // console.log(variance);
       varianceSum += Math.pow(variance, 2);

    });
    //console.log(varianceSum);
    var stdv = Math.sqrt(varianceSum / ( theArray.length - 1 ) );

    return stdv;


}


// var query = searchInitial("alteplase injection");
