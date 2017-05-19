$(function () {
	var socket = io.connect();
	var $messageForm = $('#messageForm');
	var $message = $('#message');
	var $chat = $('#chat');
	var $messageArea = $('#messageArea');
	var $userFormArea = $('#userFormArea');
	var $userForm = $('#userForm');
	var $users = $('#users');
	var $username = $('#username');

 	$messageForm.submit(function(e) {
		e.preventDefault();
		socket.emit('send message', $message.val());
		$message.val('');
	});

	socket.on('new message', function(data) {
		$chat.append('<div class="well"><strong>'+data.user+'</strong>: '+data.msg+'</div>');
	});

	$userForm.submit(function(e) {
		e.preventDefault();
		socket.emit('new user', $username.val(), function(data) {
			if(data) {
				$userFormArea.hide();
				$messageArea.show();
			}
		});
		$username.val('');
	});

$("#message").keyup(function(event){
    if(event.keyCode == 13){
        $("#submitMessage").click();
    }
});

$("#username").keyup(function(event){
    if(event.keyCode == 13){
        $("#submitUser").click();
    }
});


});


