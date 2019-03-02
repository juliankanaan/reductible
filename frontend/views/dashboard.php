
<?php
/* Template name: Query Confirm */

get_header();

$user_id = get_current_user_id();
$items = getItems($user_id);

?>
<h3>Your entered procedures</h3>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Procedure</th>
    </tr>
  </thead>
  <tbody>

    <?php
    if ($items) { // check if results even exist
      foreach ($items as $item) {
        echo "
          <tr>
            <td class='procedure' data-procedure="$item->procedure">$item->procedure></td>
          </tr>
             ";
      } else {
        echo 'No procedures entered yet!';
      }
    }
    ?>
    
  </tbody>
</table>


<div class="next_btns" style="display: none;">

  <button id="new_query">Next</button>
</div>


<?php get_footer(); ?>
