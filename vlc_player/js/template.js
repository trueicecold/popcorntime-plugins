Plugins.VLCPlayer.Template = {};

Plugins.VLCPlayer.Template.load = function(name, callback) {
	$.ajax(Plugins.VLCPlayer.Config.plugin_location + "/templates/" + name + ".tpl", {
		async: false,
		success:function(data) {
			callback(data);
		},
		complete:function() {
		}
	});
};