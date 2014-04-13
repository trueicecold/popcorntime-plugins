var Plugins = Plugins || {};
Plugins.CustomSubsFont = {};

Plugins.CustomSubsFont.Config = {
	script_location: document.currentScript.src.split("/").slice(0, -1).join("/") + "/",
	plugin_location: document.currentScript.src.split("/").slice(0, -2).join("/") + "/"
};

Plugins.CustomSubsFont.customFontCSS = "";
Plugins.CustomSubsFont.init = function() {
	var fs = require('fs');
	
	var confLocation = process.execPath;
	if (confLocation.indexOf("\\") > -1) {
		confLocation = confLocation.substr(0, confLocation.lastIndexOf("\\")) + "\\subs.config";
	}
	if (confLocation.indexOf("/") > -1) {
		confLocation = confLocation.substr(0, confLocation.lastIndexOf("/")) + "/subs.config";
	}
	
	if (fs.existsSync(confLocation)) {
		fs.readFile(confLocation, function (err, data) {
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
}

Plugins.CustomSubsFont.init();

