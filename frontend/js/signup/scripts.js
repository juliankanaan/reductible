jQuery("#submission").click(function(e)) {

    e.preventDefault();
    alert("Clicked!");
    // email, login, pass

    var email = jQuery("#email").val();
    var pass = jQuery("#password").val();
    var login = jQuery("#username").val();
    var nonce = jQuery("#nonce").val();

    jQuery.ajax({
         type : "post",
         dataType : "json",
         url : myAjax.ajaxurl,
         data : {action: "signup_handler", "user_login":login, "user_pass":password, "user_email":email, "nonce":nonce},
         success: function(response) {
           // check for success & do something:
            if(response.type == "success") {

              alert("Success");
              alert("user_id:"+response.id);


            }
            else {
               alert("Something failed with the AJAX request");
            }
         }
      });
