<?php
/* Template name: Analysis */

// check if this is user's own post
$post = basename($_SERVER['PHP_SELF']); // get from param
$post_author_id = get_post_field( 'post_author', $post );
$current_user_id = get_current_user_id();

if ( $current_user_id != $post_author_id ){
  exit('This data does not exist or is not yours'); // maybe redirect back?
}


get_header();
include('histogram.js'); // make sure file name is right

// get a bunch of data we need
$data = getDetails($post); // array of shit; see functions.php
  $procedure_name = $data->procedure_name;
  $confirmed      = $data->confirmed;
  $charge         = $data->charge;

  $charge = number_format($charge); // converts float to 1,435 or whatever
?>

<div class="container" id="analysis_info">
<h3>Price Report</h3>

  <div class="d-flex justify-content-between">
    <div class="p-2">
      <div class="analysis-left">
        <p>Your quoted price</p>
        <small class="text-muted">What you were charged</small>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="analysis-right">
        <p id="charge">$<?php echo $charge; ?></p>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-between">
    <div class="p-2">
      <div class="analysis-left">
        <p>Market Average</p>
        <small class="text-muted">Based on <span id='pop-size'></span> similar charges</small>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="analysis-right">
        <p id="avg"></p>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-between">
    <div class="p-2 delta">
      <div class="analysis-left">
        <p>Delta</p>
        <small class="text-muted">Amount you should seek for reduction</small>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="analysis-right">
        <p id="difference"></p>
      </div>
    </div>
  </div>
</div>

<div class='container chart-container'>

  <canvas id="myChart"></canvas>

</div>









<?php get_footer(); ?>
