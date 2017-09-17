function aboutPop() {
	swal({
		title: "About RhythmHQ",
		text: "My name a Borat. I come from Kazakhstan. Can I say a first, we support your war of terror! May we show our support to our boys in Iraq! May US and A kill every single terrorist! May your George Bush drink the blood of every single man, women, and child of Iraq! May you destroy their country so that for next thousand years not even a single lizard will survive in their desert!"
	});
}

function donatePop() {
	swal({
		title: "Support the HQ",
		text: "First off, thanks a lot for considering to support RhythmHQ! Unfortuantely, we don't have donations setup right now. Come back later if you'd like!"
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
			else if (track.indexOf('.wav') > -1){
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