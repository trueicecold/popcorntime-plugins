Plugins.AnyFile.Scrappers = Plugins.AnyFile.Scrappers || {};
Plugins.AnyFile.Scrappers.KickassTo = {};

Plugins.AnyFile.Scrappers.KickassTo.parseBrowserResponse = function() {
	Plugins.AnyFile.Template.load("downloadIcon", function(data) {
		Plugins.AnyFile.Scrappers.KickassTo.downloadIcon = data;
	});
	if ($("#anyfile_browser").contents().find("a.siteButton.giantButton.verifTorrentButton").length > 0) {
		Plugins.AnyFile.Scrappers.KickassTo.parseCustomTorrent();
	}
	else {
		$("#movie_crawler_title_download").css("visibility", "hidden");
		$("#movie_crawler_title").removeClass().addClass("error");
		$("#movie_crawler_title").html("No torrent page detected");
	}
	/*
	$("#anyfile_browser").contents().find("a.siteButton.giantButton.verifTorrentButton").each(function() {
		$(this).after(Plugins.AnyFile.Scrappers.KickassTo.downloadIcon);
	});
	*/
}

Plugins.AnyFile.Scrappers.KickassTo.parseCustomTorrent = function() {
	Plugins.AnyFile.Scrappers.KickassTo.movie = {};
	Plugins.AnyFile.Scrappers.KickassTo.movie.title = $("#anyfile_browser").contents().find("span[itemprop=name]").eq(0).html();
	$("#movie_crawler_title").removeClass().addClass("success");
	$("#movie_crawler_title").html("Detected: " + Plugins.AnyFile.Scrappers.KickassTo.movie.title);
	$("#movie_crawler_title_download").css("visibility", "visible");
	if ($("#anyfile_browser").contents().find("span[itemprop=quality]").length > 0) {
		Plugins.AnyFile.Scrappers.KickassTo.movie.quality = $("#anyfile_browser").contents().find("span[itemprop=quality]").eq(0).html();
	}
	if ($("#anyfile_browser").contents().find("a.movieCover img").length > 0) {
		Plugins.AnyFile.Scrappers.KickassTo.movie.image = "http:" + $("#anyfile_browser").contents().find("a.movieCover img").attr("src");
	}
	Plugins.AnyFile.Scrappers.KickassTo.movie.torrent = $("#anyfile_browser").contents().find("a.siteButton.giantButton.verifTorrentButton").attr("href");
	Plugins.AnyFile.Scrappers.KickassTo.movie.seeders = $("#anyfile_browser").contents().find("strong[itemprop=seeders]").eq(0).html()
	Plugins.AnyFile.Scrappers.KickassTo.movie.leechers = $("#anyfile_browser").contents().find("strong[itemprop=leechers]").eq(0).html()
	
	//Plugins.AnyFile.addCustomTorrent(movie);
}