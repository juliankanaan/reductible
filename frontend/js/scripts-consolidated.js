// all js we need. other than histogram / charts.js stuff

/*
Part 1: Search functions
*/


function searchInitial(query){ // primary search. return ~10 *descriptions* within one std dev

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
          //jQuery("#similar").fadeIn();
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
          var newArray = withinOne(pricesArray, procArray); // only give procedures within +- a std deviation

          return newArray;
        }



      });




} // end searchInitial()

function confirmQuery(query){ // populate table of similar procedures (4 results)

  String(query); // convert to string
  var url = '#';
  var data = JSON.stringify({search: query, sort: "price", perpage: 5, page: 1, direction: -1});

  jQuery.ajax({
    type: "POST",
    url: url,
    headers: { 'Content-Type':'application/json'},
    dataType: "json",
    data: data,
    success: function(json) {
      // check for success & do something:
      // alert("You got API data");
      $("#similar").fadeIn();
      console.log(JSON.stringify(json));
      jQuery.each(json, function(index, item) { // in the "Price data sets"
        var prices = item.prices;
        jQuery.each(prices, function(index, item) { // for each line item

          var itemprice = JSON.stringify(item.price);
          var desc = JSON.stringify(item.description);


          $("#result"+index).text(JSON.parse(desc));
          $("#pick"+index).attr("data-new", JSON.parse(desc));



        }); // end loop
      }); // end outside loop

    }


  });

} // end confirmQuery()

function populateConfirmTable(descriptions){ // given an array of descriptions, populate table

  // usage: descriptions = searchInitial("hand surgery");
  //        populateConfirmTable(descriptions);

  $("#similar").fadeIn();
  $.each(descriptions, function(index, item) {
    var desc = JSON.stringify(item);

    $("#result"+index).text(JSON.parse(desc));
    $("#pick"+index).attr("data-new", JSON.parse(desc));
  });

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
  //console.log(two);
  var goodArray = [];
  jQuery.each(pricesArray, function(index, item) { // loop prices, pick out

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

    jQuery.each(theArray, function(index, value){

       variance = ( value - avg );
       // console.log(variance);
       varianceSum += Math.pow(variance, 2);

    });
    //console.log(varianceSum);
    var stdv = Math.sqrt(varianceSum / ( theArray.length - 1 ) );

    return stdv;


}
/*
-----END SEARCH FUNCTIONS------
*/
/*
Part 2: Signup, LOGIN stuff:
*/
jQuery(document).ready(function() {
  jQuery("#signup").click(function(e) { // signup

    e.preventDefault();
    //alert("Clicked!");
    // email, login, pass

    var email = jQuery("#email").val();
    var pass = jQuery("#password").val();
    var login = jQuery("#username").val();
    var nonce = jQuery("#nonce").val();

    jQuery.ajax({
         type : "post",
         dataType : "json",
         url : myAjax.ajaxurl,
         data : {action: "createUser", "user_login":login, "user_pass":pass, "user_email":email, "nonce":nonce},
         success: function(response) {
           // check for success & do something:
            if(response.type == "success") {

              alert("Success");
              alert("user_id:"+response.id);
              // window.location.replace("dashboard");

            }
            else {
               alert("Something failed with the AJAX request");
            }
         }
      });
    }); // signup
    jQuery("#login").click(function(e) { // login

      e.preventDefault();
      //alert("Clicked!");
      // email, login, pass

      var email = jQuery("#email").val();
      var pass = jQuery("#password").val();
      var nonce = jQuery("#nonce").val();

      jQuery.ajax({
           type : "post",
           dataType : "json",
           url : myAjax.ajaxurl,
           data : {action: "loginUser", "user_pass":pass, "user_email":email, "nonce":nonce},
           success: function(response) {
             // check for success & do something:
              if(response.type == "success") {

                alert("Logged in");
                alert("user_id:"+response.id);
                // window.location.replace("dashboard");

              }
              else {
                 alert("Something failed with the AJAX request");
              }
           }
        });
      }); // login


}); // login document.ready
/*
-----end SIGNUP STUFF------
*/
/*
Part 3: CRUD db invoice entry
*/
function updateDBItem(newVal, old, user){ // confirmed item, update description in SQL

  jQuery.ajax({
     type : "post",
     dataType : "json",
     url : myAjax.ajaxurl,
     data : {action: "updateItem", "user_id":user, "new":newVal, "old":old},
     success: function(response) {
       // check for success & do something:
        if(response.type == "success") {
            postConfirm(); // redirect

        }
        else {
           alert("Something failed with the AJAX request");
        }
     }
  });
  }
function deleteItem(user, post_id, nonce){ // delete invoice item from DB
  jQuery.ajax({
     type : "post",
     dataType : "json",
     url : myAjax.ajaxurl,
     data : {action: "deleteItem", "user_id":user, "post_id":post_id, "nonce":nonce},
     success: function(response) {
       // check for success & do something:
        if(response.type == "success") {
            confirmDelete(); // deleted alert pops up

        }
        else {
           alert("Something failed with the AJAX request");
        }
     }
  });
}
function deleteThing(data){

    var user_id = data.getAttribute('data-user');
    var nonce   = data.getAttribute('data-nonce');
    var post_id = data.getAttribute('data-post');

    //deleteItem(user_id, post_id, nonce);


}
function confirmDelete(data){
  jQuery(data).closest("tr").fadeOut(); // hide parent DOM object
  jQuery("#deleteConfirm").show().delay(2000); // show banner
  jQuery("#deleteConfirm").fadeOut('slow'); // fade it out again
}
function editItem(user, post_id){
  // edit item (need to figure out how to do this )
}
function storeItemDone(){ // AJAX call to insertItem(), no more entries

  // data we need:
  var user_id = jQuery("#user_id").val();
  var procedure = jQuery("#procedure").val();
  var charge = jQuery("#charge").val();
  var nonce = jQuery("#nonce").val();

  jQuery.ajax({
     type : "post",
     dataType : "json",
     url : myAjax.ajaxurl,
     data : {action: "insertItem", "user_id":user_id, "procedure":procedure, "charge":charge, "nonce":nonce},
     success: function(response) {
       // check for success & do something:
        if(response.type == "success") {

          //alert("Success");
          // alert("user_id:"+response.id);

          window.location.replace("dashboard");
        }
        else {
           alert("Something failed with the AJAX request");
        }
     }
  });

  }
  function storeItemNext(){ // AJAX call to insertItem(), but user has more entries

  // data we need:
  var user_id = jQuery("#user_id").val();
  var procedure = jQuery("#procedure").val();
  var charge = jQuery("#charge").val();
  var nonce = jQuery("#nonce").val();

  jQuery.ajax({
     type : "post",
     dataType : "json",
     url : myAjax.ajaxurl,
     data : {action: "insertItem", "user_id":user_id, "procedure":procedure, "charge":charge, "nonce":nonce},
     success: function(response) {
       // check for success & do something:
        if(response.type == "success") {

          //alert("Success");
          // alert("user_id:"+response.id);
          loadEntry(procedure); // provide new form to use
        }
        else {
           alert("Something failed with the AJAX request");
        }
     }
  });

  }
  function postEntry(){ // either load new entry form or redirect to dashboard

    jQuery("#all_done").click(function(e) {
      e.preventDefault();
      jQuery(this).attr("disabled", "disabled");
      storeItemDone();

    });
    jQuery("#next").click(function(f) {
      f.preventDefault();
      jQuery(this).attr("disabled", "disabled");
      storeItemNext();

    });
  }

  postEntry();
  function loadEntry(procedure){ // reload entry page
    var param = String(procedure);
    jQuery("#alert").fadeIn();
    jQuery("#next").removeAttr("disabled"); // re-enable button
    jQuery("#entry").trigger("reset"); // reset form
    jQuery("#entry-title").text("Enter another procedure!");


  }
  jQuery("#similar").ready(function() {
    var query = jQuery("#gobtn").attr("data-query");
    searchInitial(query);


  });
  jQuery(".picker").click(function(){ // confirm item from list
      var newVal = jQuery(this).attr("data-new");
      var oldVal = jQuery("#gobtn").attr("data-query");
      var user_id = jQuery(this).attr("data-user");
      // var nonce = jQuery(this).attr("data-nonce");

      updateDBItem(newVal, oldVal, user_id); // call function to updateDBItem

  });

  function postConfirm(){
    window.location.replace("dashboard");
  }

/*
-----end------
*/
