


jQuery(document).ready(function() {

    function searchInitial(query){ // only returns 4 items at first

      String(query); // convert to string
      var url = '#';
      var data = JSON.stringify({search: query, sort: "*", perpage: 5, page: 1, direction: -1});

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

    }; // end searchInitial()

    function searchSecondary(query){ //returns 100 items

      String(query); // convert to string
      var url = '#';
      var data = JSON.stringify({search: query, sort: "*", perpage: 100, page: 1, direction: -1});

      jQuery.ajax({
        type: "POST",
        url: url,
        headers: { 'Content-Type':'application/json'},
        dataType: "json",
        data: data,
        success: function(json) {
          // check for success & do something:

          var sum = 0; n = 0; // for averaging the json
          jQuery.each(json, function(index, item) { // in the "Price data sets"
            var prices = item.prices;
            jQuery.each(prices, function(index, item) { // for each line item
              var itemprice = JSON.stringify(item.price);
              var desc = JSON.stringify(item.description);
              console.log(desc +" "+" $ "+itemprice);

              sum += itemprice; // for avg
              n++; // for averaging


            }); // end loop
          var avg = (sum / n);
          console.log("Average is "+avg);
          }); // end outside loop




        } // end success


      });

    }; // end searchSecondary();

    function updateDBItem(newVal, old, user){

      jQuery.ajax({
         type : "post",
         dataType : "json",
         url : myAjax.ajaxurl,
         data : {action: "updateItem", "user_id":user, "new":newVal, "old":old},
         success: function(response) {
           // check for success & do something:
            if(response.type == "success") {
                postConfirm();

            }
            else {
               alert("Something failed with the AJAX request");
            }
         }
      });


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

    };
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
    };

    postEntry();
    function loadEntry(procedure){ // reload entry page
      var param = String(procedure);
      $("#alert").fadeIn();
      $("#next").removeAttr("disabled"); // re-enable button
      jQuery("#entry").trigger("reset"); // reset form
      jQuery("#entry-title").text("Enter another procedure!");


    };
    $("#similar").ready(function() {
      var query = $("#gobtn").attr("data-query");
      searchInitial(query);


    });
    $(".picker").click(function(){
      var newVal = $(this).attr("data-new");
      var oldVal = $("#gobtn").attr("data-query");
      var user_id = $(this).attr("data-user");
      // var nonce = $(this).attr("data-nonce");

      updateDBItem(newVal, oldVal, user_id); // call function to updateDBItem

    });

    function postConfirm(){
      window.location.replace("dashboard");
    }





});
