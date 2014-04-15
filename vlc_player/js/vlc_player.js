var Plugins = Plugins || {};
Plugins.VLCPlayer = {};

Plugins.VLCPlayer.Config = {
	script_location: document.currentScript.src.split("/").slice(0, -1).join("/") + "/",
	plugin_location: document.currentScript.src.split("/").slice(0, -2).join("/") + "/"
};

Plugins.VLCPlayer.customFontCSS = "";
Plugins.VLCPlayer.init = function() {
	var fs = require('fs');
	
	var confLocation = process.execPath;
	if (confLocation.indexOf("\\") > -1) {
		confLocation = confLocation.substr(0, confLocation.lastIndexOf("\\")) + "\\vlc.config";
	}
	if (confLocation.indexOf("/") > -1) {
		confLocation = confLocation.substr(0, confLocation.lastIndexOf("/")) + "/vlc.config";
	}
	
	if (fs.existsSync(confLocation)) {
		fs.readFile(confLocation, function (err, data) {
			if (err) throw err;
			Plugins.VLCPlayer.playerLocation = data.toString();
			if (fs.existsSync(Plugins.VLCPlayer.playerLocation)) {
				//Plugins.Shortcuts.Player.textTracks()[9].cues_[0]
			}
		});
	}
	
	$(window).resize(function() {
		if ($("#video_player").length > 0) {	
			Plugins.VLCPlayer.Player = videojs('video_player', { plugins: { biggerSubtitle : {}, smallerSubtitle : {}, customSubtitles: {} }});
			Plugins.VLCPlayer.Player.player().on('error', function (error) {
				event.preventDefault();
				event.stopImmediatePropagation();
				Plugins.VLCPlayer.runPlayer();
			});
			
			if ($(".vjs-control-bar #control_vlc").length == 0) {
				Plugins.VLCPlayer.Template.load("control_button", function(data) {
					$(".vjs-control-bar").append(data);
				});
			}
		}
	});
}

Plugins.VLCPlayer.runPlayer = function() {
	var exec = require('child_process').exec,
		child;

	child = exec(Plugins.VLCPlayer.playerLocation + " http://127.0.0.1:8888",
	  function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
		  Alert("VLC Player not found or is misconfigured.");
		}
	});
}

$.when(
	$.getScript(Plugins.VLCPlayer.Config.script_location + "/template.js")
).done(Plugins.VLCPlayer.init);

