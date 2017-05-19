$(function () {
	var socket = io.connect();
	var $messageForm = $('#messageForm');
	var $message = $('#message');
	var $chat = $('#chat');
	var $messageArea = $('#messageArea');
	var $userFormArea = $('#userFormArea');
	var $userForm = $('#userForm');
	var $username = $('#username');
	
	$messageForm.submit(function(e) {
		e.preventDefault();
		socket.emit('send message', $message.val());
		$message.val('');
	});

	socket.on('new message', function(data) {
		$chat.append('<div class="well"><strong>'+data.user+'</strong>: '+data.msg+'</div>');
		if (message === "Hello") {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> I have already said Hello '+$('#username')+'</div>');
		}

		else if (message === "What time is it?") {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> It is goooo time!</div>');
		}
		
		else if (message === "What year is it?") {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> It is your year '+$('#username')+'</div>');
		}

		else if (message === "Do you own a Mac?" || "Do you have a Mac?") {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> Dude, I created the fucking thing!</div>');
		}

		else if (message === "Who are you?") {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> I can be whoever you want me to be, '+$('#username')+'</div>');
		}

		else if (message === "Goodbye") {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> Goodbye '+$('#username')+'. Hope you enjoyed your stay.</div>');
		}

		else {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> Sorry, can not help you with that. Try asking me what time or year it is, if I have a mac, who I am or just say goodbye.</div>');
		}


	});

	$userForm.submit(function(e) {
		e.preventDefault();
		socket.emit('new user', $username.val(), function(data) {
			socket.username = $username.val();
			if(data) {
				$userFormArea.hide();
				$messageArea.show();
				$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> Hello '+$('#username')+'. Try asking me what time or year it is, if I have a mac, who I am or just say goodbye.</div>');
			}
		});
		$username.val('');

	});

	// Bot



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


