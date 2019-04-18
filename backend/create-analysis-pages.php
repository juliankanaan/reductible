<?php
// UNTESTED CODE
// creates new pages (wp_posts) for each new

function createPage($user_id, $id){

  $data = array(
            'post_title' => $title,
            'post_content' => 'whispers',
            'page_template' => 'Analysis' // make sure this is right

          );


$post_id = wp_insert_post($data);

return $post_id; // wp_insert_post() returns zero on failure
}
?>
