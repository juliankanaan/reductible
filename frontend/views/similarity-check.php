
<?php
/* Template name: ActionRefine */
// displays four
get_header();


?>
<?php
$procedure = urldecode($_GET['procedure']);
// $procedure = "hydrocodone";
$user_id = get_current_user_id();
?>



<h3>Which procedure is most similar to yours?</h3>
<button style="display: none;" id="gobtn" data-query="<?php echo $procedure; ?>">Go</button>
<table style="display: none;" id="similar" class="table">
  <tbody>
      <tr>
        <td id="result1"></td>
        <td><a style="color: white;"class="picker btn btn-success" data-new="" data-user="<?php echo $user_id; ?>" id="pick1">This one!</a></td>
      </tr>
      <tr>
        <td id="result2"></td>
        <td><a style="color: white;" class="picker btn btn-success" data-new="" data-user="<?php echo $user_id; ?>" id="pick2">This one!</a></td>
      </tr>
      <tr>
        <td id="result3"></td>
        <td><a style="color: white;" class="picker btn btn-success" data-new="" data-user="<?php echo $user_id; ?>" id="pick3">This one!</a></td>
      </tr>
      <tr>
        <td id="result4"></td>
        <td><a style="color: white;" class="picker btn btn-success" data-new="" data-user="<?php echo $user_id; ?>" id="pick4">This one!</a></td>
      </tr>
  </tbody>
</table>
<?php get_footer(); ?>
