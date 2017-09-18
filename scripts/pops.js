function aboutPop() {
	swal({
		title: "About RhythmHQ",
		html: "RhythmHQ is an independent internet radio station showcasing some awesome underground artists from around the world.<br /><span style='font-size:smaller;'>This project was created by Kyotoshift.</span>"
	});
}
function submitPop(){
	var email = " submissions[at]rhythmhq.live"
	swal({
		title: "Send Tunes",
		text: "Have something you want me to hear? Send it over!  " + email,
	});
}

function contactPop(){
	var email = " hello[at]rhythmhq.live"
	swal({
		title: "Contact",
		text: "Find a bug or just wanna say hi? Send me an email! " + email,
	});
}

// function donatePop() {
// 	swal({
// 		title: "Support the HQ",
// 		text: "First off, thanks a lot for considering to support RhythmHQ! Unfortuantely, donations aren't setup right now. Check back soon!"
// 	});
// }

function donatePop() {
	var linkURL = "https://www.patreon.com/rhythmhq"
	swal({
  html: "This is going to redirect you to our Patreon page!<br />Is that okay?",
  confirmButtonText: 'Yep',
  cancelButtonText: 'Nope',
  showCancelButton: true,
  cancelButtonColor: '#d33',
  confirmButtonColor: '#3273dc',
  reverseButtons: true
}).then(function () {
  	window.location = linkURL
})
}

function checkOffline(){
	$.ajax({
		type: 'GET',
		url: 'http://petmemain.com:8000/stream',
		error: function(xhr, ajaxOptions, thrownError){
			if(xhr.status==404){
				swal({
					title: "Stream Offline!",
					text: "Sorry, but RhythmHQ is offline! Come back later!",
					confirmButtonText: "Damn",
					type: 'error'
				});
				$("#queryLink").attr('href', 'http://rhythmhq.live').text("Offline");
			}
		}
	});
}

function currentListeners(){
	$.ajax({
		type: 'GET',
		url: 'http://petmemain.com:8000/status-json.xsl',
		success: function(response, status, xhr){
			// console.log(response.icestats.source.listeners);
			$('#listeners span').text(response.icestats.source.listeners);
		}
	});
}

function trackTitle(){
	$.ajax({
		type: 'GET',
		url: 'http://petmemain.com:8000/status-json.xsl',
		success: function(response, status, xhr){
			// console.log(response.icestats.source.title);
			var track = response.icestats.source.title;
			if (track.indexOf('.mp3') > -1)
			{
				var shorTrack = track.substr(0, track.length - 4);
				$("#queryLink").attr('href', 'https://soundcloud.com/search?q=' + shorTrack).text(shorTrack);
				$(document).prop('title', "RhythmHQ: " + shorTrack);
			}
			else if (track.indexOf('.wav') > -1)
			{
				var shorTrack = track.substr(0, track.length - 4);
				$("#queryLink").attr('href', 'https://soundcloud.com/search?q=' + shorTrack).text(shorTrack);
				$(document).prop('title', "RhythmHQ: " + shorTrack);
			}
			else
			{
				$("#queryLink").attr('href', 'https://soundcloud.com/search?q=' + track).text(track);
				$(document).prop('title', "RhythmHQ: " + track);
			}
		}
	});
}

function intervalTimer(){
	var time = 30000;
	window.setInterval(trackTitle, time);
}

function tuneIn(){
	$('able-button-handler-play').click(trackTitle());
	// console.log("Got current track title");
}

$(window).on('load', function() {
  checkOffline();
  tuneIn();
  currentListeners()
  intervalTimer()
})

function modalShow(){
	var modal = document.getElementById('modal');
  	var elements = document.getElementsByClassName('toggle-modal');
  	for (var i = 0; i < elements.length; i++) {
    	elements[i].addEventListener('click', toggleClass);
    }
	function toggleClass() {
    	modal.classList.toggle('is-active');
    }
}