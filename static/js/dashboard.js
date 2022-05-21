// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}

// document.getElementById("snap").addEventListener("click", function() {
// 	context.drawImage(video, 0, 0, 640, 480);
// 	var image = convertCanvasToImage(canvas);

// });

// Converts canvas to an image
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}

$(function(){
	$('button').click(function(){
		var user = $('email').val();
		var pass = $('password').val();
		console.log(user,pass);
		$.ajax({
			url: '/checklogin',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
				// var a = [];
				// if (response.status == 'OK_ADD'){
				// 	$('#result').text('Congratulations on registering for our course, '+response.user+'. Redirecting you to the course webpage...');	
				// 	window.setTimeout(function() { 
				// 		  document.location.href = "http://poloclub.gatech.edu/cse6242/2018spring/"
				// 		}, 3000);
				// 	$('#inputUsername').val("");
				// }
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});

// Trigger photo take
$(function(){
	$('#start_ID').click(function(){
		context.drawImage(video, 0, 0, 640, 480);
		var image = convertCanvasToImage(canvas);
		var x = document.getElementById("take_snapshot");
		var y = document.getElementById("start_identify");
	    if (x.style.display === "none") {
	        x.style.display = "block";
	        y.style.display = "none";
	    } else {
	        x.style.display = "none";
	        y.style.display = "block";
	    }
		$.ajax({
			url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/refugees',
			data: image,
			type: 'PUT',
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});
