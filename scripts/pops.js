function aboutPop() {
	swal({
		title: "About RhythmHQ",
		confirmButtonColor: '#3273dc',
		html: "RhythmHQ is an independent internet radio station showcasing some awesome underground artists from around the world.<br /><span style='font-size:smaller;'>This project was created by Kyotoshift.</span>"
	});
}
function submitPop(){
	var email = " submissions[at]rhythmhq.live"
	swal({
		title: "Send Tunes",
		confirmButtonColor: '#3273dc',
		html: "Have something you want me to hear? Send it over!<br />" + "<span style='font-size:medium;'>" + email + "</span>",
	});
}

function contactPop(){
	var email = " hello[at]rhythmhq.live"
	swal({
		title: "Contact",
		confirmButtonColor: '#3273dc',
		html: "Find a bug or just wanna say hi? Send me an email!<br /> " + "<span style='font-size:medium;'>" + email + "</span>",
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
  // cancelButtonColor: '#d33',
  confirmButtonColor: '#3273dc',
  reverseButtons: true
}).then(function (result) {
  	window.location = linkURL
}).catch(swal.noop)
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
			var response = response.icestats.source.listeners
			$('#listeners span').text(response);
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
  checkOffline()
  tuneIn()
  // currentListeners();
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
function funStuff(){
	var hex = ['454349','3373dc','DC3333','5DDC33','33D6DC','3B33DC', 'DC33D9'];
	$(document).jkey('p',function(){
		        var color = '#';
                color += hex[Math.floor(Math.random() * hex.length)];
                document.getElementsByClassName('pressIOP')[0].style.background = color;
                document.getElementsByClassName('able-seekbar')[0].style.background = color;
            })
	$(document).jkey('o',function(){
		        var color = '#';
                color += hex[Math.floor(Math.random() * hex.length)];
                document.getElementsByClassName('pressIOP')[0].style.background = color;
            })
	$(document).jkey('i',function(){
		        var color = '#';
                color += hex[Math.floor(Math.random() * hex.length)];
                document.getElementsByClassName('able-seekbar')[0].style.background = color;
            })
	};