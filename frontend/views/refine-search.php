
<?php
/* Template name: Refine Items */
// displays four
get_header();


?>

<?php
$user_id = get_current_user_id();
$items = getItems($user_id); // get URL param (from previous form entry)
?>

<h3>Your entered procedures</h3>

<table class="table">
  <tbody>
    <?php
    if ($items) { // check if results even exist
      foreach ($items as $item) {
        $confirmed = $item->confirmed;
        $procedure = $item->procedure_name;
        if ($confirmed == 0) {

        echo "<tr>
                <td>$procedure</td>
                <td>$$item->charge</td>
                <td><a style='color: white;' class='btn btn-warning' href='refine-action?procedure=$procedure'>Need confirmation!</a></td>

              </tr>";
        } else {
          echo "<tr>
                  <td>$procedure</td>
                  <td>$$item->charge</td>
              </tr>";

        }
      }
    } else {
      echo 'No procedures entered yet!';
    }
    ?>
  </tbody>
</table>

<?php get_footer(); ?>
