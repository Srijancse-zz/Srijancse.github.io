(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    /**
     * Variables
     */

    // Global selectors
    var $sidebar         = $('.sidebar');
    var $contact         = $('.contact');



    /**
     * Functions
     */

    // Toggle contact form
    var toggleSidebar = function (el) {
      $(el).on('click', function (e){
        e.preventDefault();

        $sidebar.toggleClass('sidebar--open');
        $contact.toggleClass('contact--open');

        preventTabbing();
      });
    };

    // Prevent tabbing to off canvas elements
    var preventTabbing = function () {
      var $links = $('.js--tabbable');

      for( var i = 0, j =  $links.length; i < j; i++ ) {
        if ($sidebar.hasClass('sidebar--open')) {
          $links[i].setAttribute('tabindex', '');
        } else {
          $links[i].setAttribute('tabindex', '-1');
        }
      }
    };

    // AJAX Contact form
    $('.js--submit-btn').click(function(e) {
      e.preventDefault();

      var proceed = true;
      var postData = '';
      var output = '';

      //simple validation at client's end
      //loop through each field and we simply change border color to red for invalid fields
      $('.contact-form input[required], .contact-form textarea[required]').each(function(){
        $(this).addClass('success');
        if (!$.trim($(this).val())){ //if this field is empty
          $(this).removeClass('success');
          $(this).addClass('error'); //change border color to red
          output = '<p class="error"><span>Whoops, an error has occurred.</span> Please ensure you have filled out all required fields.</p>';
          $('.contact-form .contact-form__messages').hide().html(output).fadeIn();
          proceed = false; //set do not proceed flag
        } else {
          $(this).removeClass('error'); //change border color to red
          $(this).addClass('success'); //change border color to red
        }
        //check invalid email
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if ($(this).attr('type')==='email' && !emailReg.test($.trim($(this).val()))){
          $(this).removeClass('success');
          $(this).addClass('error'); //change border color to red
          proceed = false; //set do not proceed flag
        }
      });

      if (proceed) //everything looks good! proceed...
      {
        //get input field values data to be sent to server
        postData = {
          'name'    : $('input[name="name"]').val(),
          'email'   : $('input[name="email"]').val(),
          'message' : $('textarea[name="message"]').val()
        };

        //Ajax post data to server
        $.post('./mailer.php', postData, function(response){
          if (response.type === 'error'){ //load json data from server and output message
            output = '<p class="error"><span>Whoops, an error has occurred.</span> '+response.text+'</p>';
          } else {
            output = '<p class="success">'+response.text+'</p>';
            //reset values in all input fields
            $('.contact-form  input[type=text], .contact-form textarea').val('').removeClass('success');
            $('.contact-form #contact_body').slideUp(); //hide form after success
          }
          $('.contact-form .contact-form__messages').hide().html(output).fadeIn();
        }, 'json');
      }
    });



    /**
     * Call functions
     */

    // Toggle contact form
    toggleSidebar('.js--contact-form-open');
    toggleSidebar('.js--contact-form-close');



    /**
     * Window load calls
     */

    $(window).load(function () {
      // Remove loading overlay
      $('.loading').fadeOut();
    });

  });

})(jQuery, window, document);
