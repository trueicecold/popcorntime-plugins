Plugins.AnyFile.Scrappers = Plugins.AnyFile.Scrappers || {};
Plugins.AnyFile.Scrappers.FileDialog = {};

Plugins.AnyFile.Scrappers.FileDialog.parseFile = function() {
	Plugins.AnyFile.Scrappers.FileDialog.movie = {};
	Plugins.AnyFile.Scrappers.FileDialog.movie.image = "plugins/anyfile/images/file_torrent.png";
	Plugins.AnyFile.Scrappers.FileDialog.movie.title = $("#anyfileFileDialog").val().substr($("#anyfileFileDialog").val().lastIndexOf("\\")+1);
	Plugins.AnyFile.Scrappers.FileDialog.movie.torrent = $("#anyfileFileDialog").val();
	Plugins.AnyFile.Scrappers.FileDialog.movie.seeders = 0;
	Plugins.AnyFile.Scrappers.FileDialog.movie.leechers = 0;
	
	Plugins.AnyFile.addCustomTorrent();
}