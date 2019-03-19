<?php
/* Template name: Signup */

get_header();


?>
<div class="container signup">
  <form onsubmit="return false" id="signup">
    <h4>Register.</h4>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input name='email1' type="email" class="form-control" id="email_input" aria-describedby="emailHelp" placeholder="Enter email">
      <div class="invalid-tooltip">
        Please choose a unique and valid username.
      </div>
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="pass_input" placeholder="Password">
    </div>
    <button onclick="ajaxCreate(this.form);" type="submit" class="btn btn-primary">Sign up</button>
    <small class="form-text text-muted">We'll never ask for any more information than this.</small>
  </form>
  <div class="lower_form">
    <p>Already registered?</p>
    <button type="button" id="signInTrigger" class="btn btn-info">Sign in</button>
  </div>
</div>
<div class="container login" style="display: none;">
  <form onsubmit="return false" id="login">
    <h4>Welcome back.</h4>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input name='email1' type="email" class="form-control" id="email_input" aria-describedby="emailHelp" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="pass_input" placeholder="Password">
    </div>
    <button onclick="ajaxLogin(this.form);" type="submit" class="btn btn-primary">Login</button>
  </form>
  <div class="lower_form">
    <p>Not registered?</p>
    <button type="button" id="registerTrigger" class="btn btn-info">Sign up</button>
  </div>
</div>



<?php get_footer(); ?>
<script type="text/javascript">
function swapper(){
  $("#signInTrigger").click(function(){
    $(".login").show();
    $(".signup").hide();
  });
  $("#registerTrigger").click(function(){
    $(".login").hide();
    $(".signup").show();
  });
}
swapper();

function ajaxCreate(){
  // need to write -- see previous notes
  // callback function will be createUser(data); in backend
}
function ajaxLogin(){
  // need to write
}

</script>
