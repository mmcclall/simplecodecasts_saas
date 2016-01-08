$(document).ready(function() {
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    // Watch for a form submission
    $("#form_submit_btn").click(function(event) {
      event.preventDefault();
      $("input[type=submit]").prop("disabled", true);
      var error = false;
      var ccNUM = $('#card_number').val(),
          cvcNum = $('#card_code').val(),
          expMonth = $('#card_month').val(),
          expYear = $('#card_year').val();
      
      if(!error) {
        // Get the Stripe token
        Stripe.createToken({
          number: ccNUM,
          cvc: cvcNum,
          exp_month: expMonth,
          exp_year: expYear
        }, stripeResonseHandler);
      }
      return false;
    }); // form submission
    function stripeResonseHandler(status, response) {
      // Get a reference to the form
      var f = $("#new_user");
      // Get the token from the response
      var token = response.id;
      // add the token to the form
      f.append('<input type="hidden" name="user[stripe_card_token]" value="'+ token + '" />');
      // submit the form
      f.get(0).submit();
    }
});