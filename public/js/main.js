$(function () {
	var socket = io.connect();
	var $messageForm = $('#messageForm');
	var $message = $('#message');
	var $chat = $('#chat');
	var $messageArea = $('#messageArea');
	var $userFormArea = $('#userFormArea');
	var $userForm = $('#userForm');
	var $username = $('#username');
	var lastmessage  


	$messageForm.submit(function(e) {
		e.preventDefault();
		lastmessage = $message.val()
		socket.emit('send_message', lastmessage);
	 	$message.val('');
	});

	socket.on('new_message', function(data) {
		console.log(data);
		$chat.append('<div class="well"><strong>'+data.user+'</strong>: '+data.msg+'</div>');
		if (data.msg === "Hello") {
			console.log(data.msg);
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> I have already said Hello '+data.user+'</div>');
		}

		else if (data.msg === "What time is it?") {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> It is goooo time!</div>');
		}
		
		else if (data.msg === "What year is it?") {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> It is your year '+data.user+'</div>');
		}

		else if (data.msg === "Do you own a mac?" || data.msg === "Do you have a mac?") {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> Dude, I created the fucking thing!</div>');
		}

		else if (data.msg === "Who are you?") {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> I am Jobs, Steve Jobs!</div>');
		}

		else if (data.msg === "Goodbye") {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> Goodbye '+data.user+'. Hope you enjoyed your stay.</div>');
		}

		else {
			$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> Sorry, can not help you with that. Try asking me what time or year it is, if I have a mac, who I am or just say goodbye.</div>');
		}


	});

	$userForm.submit(function(e) {
		e.preventDefault();
			console.log($username.val());
			socket.emit('new_user', $username.val(), function(data) {
			console.log(data);
			socket.username = $username.val();
			if(data) {
				$userFormArea.hide();
				$messageArea.show();
				$chat.append('<div class="well"><strong>Steve th3 chatter:</strong> Welcome! Try asking me what time or year it is, if I have a mac, who I am or just say goodbye.</div>');
			}
		});
		$username.val('');

	});

});


