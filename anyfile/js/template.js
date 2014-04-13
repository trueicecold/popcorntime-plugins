Plugins.AnyFile.Template = {};

Plugins.AnyFile.Template.load = function(name, callback) {
	$.ajax(Plugins.AnyFile.Config.plugin_location + "/templates/" + name + ".tpl", {
		async: false,
		success:function(data) {
			callback(data);
		},
		complete:function() {
		}
	});
};