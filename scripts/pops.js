function aboutPop() {
	swal({
		title: "About RhythmHQ",
		text: "RhythmHQ is an independent internet radio station showcasing some awesome underground artists from around the world. RhythmHQ was created by Kyotoshift."
	});
}
function submitPop(){
	var email = " submissions[at]rhythmhq.live"
	swal({
		title: "Send Us Music",
		text: "Have something you want me to hear? Send it over!  " + email,
	});
}

function contactPop(){
	var email = " contact[at]rhythmhq.live"
	swal({
		title: "Email Us",
		text: "Find a bug or just wanna say hi? Send me an email! " + email
	});
}

function donatePop() {
	swal({
		title: "Support the HQ",
		text: "First off, thanks a lot for considering to support RhythmHQ! Unfortuantely, donations aren't setup right now. Check back soon!"
	});
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
					button: "Damn",
					icon: "error"
				});
				$("#queryLink").attr('href', 'http://rhythmhq.live').text("Offline");
			}
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
			}
			else if (track.indexOf('.wav') > -1)
			{
			{
				var shorTrack = track.substr(0, track.length - 4);
				$("#queryLink").attr('href', 'https://soundcloud.com/search?q=' + shorTrack).text(shorTrack);
			}
		}
			else
			{
				$("#queryLink").attr('href', 'https://soundcloud.com/search?q=' + track).text(track);
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
  intervalTimer()
})