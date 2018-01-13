$(function() {
  $('a[href*=#]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
  $(document).ready( function() {
    $("#txtEditor").Editor();
    });

});
(function() {
    $('#login-modal input').keyup(function(){
        var empty = false;
            if (($('#login-modal input[type=text]').val() == '')||($('#login-modal input[type=password]').val() == '')) {
                empty = true;
            }
        if (empty) {
            $('#login-modal input[type=submit]').attr('disabled', 'disabled');
        } else {
            $('#login-modal input[type=submit]').removeAttr('disabled');
        }
    });
})();
(function() {
    $('#forgot-password input').keyup(function(){
        var empty = false;
            if ($('#forgot-password input[type=text]').val() == '') {
                empty = true;
            }
        if (empty) {
            $('#forgot-password input[type=submit]').attr('disabled', 'disabled');
        } else {
            $('#forgot-password input[type=submit]').removeAttr('disabled');
        }
    });
})()
function validate() {
    var username = document.forms["login-form"]["user"].value;
    var password = document.forms["login-form"]["pass"].value;
    if (username == "") {
        $('#username').addClass('error');
        return false;
    } else if (password == "") {
        $('#password').addClass('error');
        return false;
    } else {
        authenticate(username, password);
        return false;
    }
}

function authenticate($username, $password) {
    $.ajax({
        type: "GET",
        url: "db.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('user').each(function() {
                var username = $(this).find('username').text();
                if ($username == username) {
                    if ($password == $(this).find("password").text()) {
                        alert('sucess');
                      $('#login-modal').removeClass('auth-failed')
                        return false;
                    } else {
                        $('#login-modal').addClass('auth-failed')
                    }
                } else {
                    $('#login-modal').addClass('auth-failed')
                }
            });
        },
        error: function() {
            alert("An error occurred while processing XML file.");
        }
    });

}
//auto close modal
$(function(){
    $('#send-invoice').on('show.bs.modal', function(){
        var myModal = $(this);
        clearTimeout(myModal.data('hideInterval'));
        myModal.data('hideInterval', setTimeout(function(){
            myModal.modal('hide');
        }, 3000));
    });
});
