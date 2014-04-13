var Plugins = Plugins || {};
Plugins.CustomSubsFont = {};

Plugins.CustomSubsFont.Config = {
	script_location: document.currentScript.src.split("/").slice(0, -1).join("/") + "/",
	plugin_location: document.currentScript.src.split("/").slice(0, -2).join("/") + "/"
};

Plugins.CustomSubsFont.customFontCSS = "";
Plugins.CustomSubsFont.init = function() {
	var fs = require('fs');
	
	fs.readFile('plugins\\custom_subs_font\\subs.config', function (err, data) {
		if (err) throw err;
		Plugins.CustomSubsFont.customFontCSS = "<style>\n" +
		"\t.vjs-subtitles.vjs-text-track {\n" +
		"\t\t" + data + "\n" + 
		"\t}\n" +
		"</style>";
		$("head").append(Plugins.CustomSubsFont.customFontCSS);
		console.log(Plugins.CustomSubsFont.customFontCSS);
	});	
}

Plugins.CustomSubsFont.init();

