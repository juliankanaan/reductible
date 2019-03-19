<?php

function createUser(){
  // backend handler for signup.php
}
function logInUser(){
  // same as above just for returning users
}

add_action( 'init', 'my_script_enqueuer' );
function my_script_enqueuer() {
   wp_register_script( "insertItem", '/wp-content/themes/bootstrap-theme/js/scripts.js', array('jquery') );
   wp_localize_script( 'insertItem', 'myAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' )));
   wp_enqueue_script( 'jquery' );
   wp_enqueue_script( 'insertItem' );
}
add_action("wp_ajax_insertItem", "insertItem");
add_action("wp_ajax_nopriv_insertItem", "insertItem");
add_action("wp_ajax_updateItem", "updateItem");
add_action("wp_ajax_nopriv_updateItem", "updateItem");


function insertItem(){ // insert line item into _items table
  // get info we need & sanitize
  $user_id =  $_REQUEST['user_id'];
  $procedure = sanitize_text_field( $_REQUEST['procedure'] );
  $charge  = $_REQUEST['charge']; // sanitize somehow
  $nonce = $_REQUEST['nonce'];
  // build array
  $data = array(
    'user_id' => $user_id,
    'charge' => $charge,
    'procedure_name'  => $procedure

  );
  //echo 'received';

  if ( wp_verify_nonce($nonce, 'insert')) {

      global $wpdb;

      $insert = $wpdb->insert('wp_items_', $data);
      //echo 'tried insert';
      $insert_id = $wpdb->insert_id;

      // check for success
      if ( $insert_id ) { // function returns True or False depending on success

        $result['type'] = 'success';
        $result['charge'] = $charge;
        $result['procedure'] = $procedure;
        $result = json_encode($result);
        echo $result;

      } else {
        $result['type'] = 'failure';

        $result = json_encode($result);
        echo $result;
      }

  }
  exit;


}

function updateItem(){

  $user_id =  $_REQUEST['user_id'];
  $oldprocedure = sanitize_text_field( $_REQUEST['old'] );
  $newprocedure = sanitize_text_field( $_REQUEST['new'] );
  $table = 'wp_items_';
  // $sqlquery = "SELECT procedure FROM 'wp_items_' WHERE user_id = $user_id AND procedure = " ; // fuck
  // $oldprocedure = $wpdb->get_results($sqlquery);


  $sqlquery = "UPDATE `wp_items_` SET `procedure_name` = '$newprocedure', `confirmed` = '1' WHERE `user_id` = $user_id AND `procedure_name` = '$oldprocedure'";

  // WRAP THIS IN CHECK NONCE BEFORE PRODUCTION
      global $wpdb;

      $update = $wpdb->query($sqlquery);
      //echo 'tried insert';

  // check for success
  if ( $update ) { // function returns True or False depending on success

    $result['type'] = 'success';
    $result['new'] = $newprocedure;
    $result = json_encode($result);
    echo $result;

  } else {
    $result['type'] = 'failure';

    $result = json_encode($result);
    echo $result;
  }
  exit;

}


function getItems($user_id){ // get all line items for current user
  global $wpdb;
  $sqlquery = "SELECT procedure_name, charge, confirmed FROM wp_items_ WHERE user_id = $user_id";
  $items = $wpdb->get_results($sqlquery);

  if ($items) {
    return $items; // bundled
  } else {
    return false;
  }

} // usage: foreach (getItems($user_id) as $item ) { echo $item->procedure; }

?>
