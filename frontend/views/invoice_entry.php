
<?php
/* Template name: Invoice Entry */
// displays four
get_header();

$prev_procedure = $_GET['procedure']; // get URL param (from previous form entry)

?>



<div id="alert" class="alert alert-success" style="display:none;" role="alert">
  Added!
</div>

<div class="card text-center">

  <div class="card-header">
    <h3 id="entry-title">Enter a procedure</h3>
  </div>
  <div class="card-body">
  <form id="entry">
    <div class="row">
      <div class="col">

        <input type="text" id="procedure" class="form-control" placeholder="Procedure name" required>
        <small class="form-text text-muted">
          Ex. "blood draw"
        </small>
      </div>
      <div class="col">
        <div class="input-group-prepend">
        <div class="input-group-text">$</div>
        <input type="text" id='charge' class="form-control" placeholder="Cost" required>
        </div>
        <small class="form-text text-muted">
          Ex. "343.43"
        </small>
      </div>
      <input type="hidden" id="user_id" value="<?php echo get_current_user_id(); ?>">
      <?php wp_nonce_field( 'insert', 'nonce' ); ?>
    </div>

  </form>



    <div class="next_btns">

      <button class="btn btn-primary" id="next">Add Another</button>
      <button class="btn btn-secondary" id="all_done">All Done</button>
    </div>
  </div>
</div>

<?php get_footer(); ?>

