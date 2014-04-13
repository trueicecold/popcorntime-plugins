var Plugins = Plugins || {};
Plugins.AnyFile = {};
Plugins.AnyFile.Config = {
	script_location: document.currentScript.src.split("/").slice(0, -1).join("/") + "/",
	plugin_location: document.currentScript.src.split("/").slice(0, -2).join("/") + "/"
};

Plugins.AnyFile.init = function() {
	Plugins.AnyFile.CurrentScrapper = Plugins.AnyFile.Scrappers.KickassTo;
	
	$(".search").css("top", "24px");
	Plugins.AnyFile.Template.load("sidebar_buttons", function(data) {
		$(".search").before(data);
	});
	
	
	setTimeout(function() {
		/*
		var movieItems = $(".movie.fullyLoaded.loaded");
		Plugins.AnyFile.movieItem = movieItems.eq(0).clone(true);
		Plugins.AnyFile.movieItem.find("img").attr("src","http://yuq.me/movies/23/823/2382396.jpg");
		movieItems.eq(0).before(Plugins.AnyFile.movieItem);
		*/
		//Plugins.AnyFile.movieItem.find("a").eq(0).trigger("click");
		//Plugins.AnyFile.addCustomTorrent();
	}, 5000);	
	
}

Plugins.AnyFile.openBrowser = function() {
	Plugins.AnyFile.closeBrowser();
	Plugins.AnyFile.Template.load("wrapper", function(data) {
		$("body").append(data);
		setTimeout(function() {
			Plugins.AnyFile.Template.load("header_title_container", function(data) {
				$("#header_title_container").append(data);
			});
			$("#anyfile_browser").on("load", Plugins.AnyFile.CurrentScrapper.parseBrowserResponse);
		}, 1000);
	});
}

Plugins.AnyFile.closeBrowser = function() {
	$(".anyfile_wrapper").remove();
	gui.Window.get();
}

Plugins.AnyFile.addCustomTorrent = function() {
	try {
		Plugins.AnyFile.closeBrowser();
		
		Plugins.AnyFile.movieScrapper = App.currentScrapper;

		Plugins.AnyFile.movieCollection = new Plugins.AnyFile.movieScrapper([], {
			keywords: null,
			genre: null,
			page: null
		});

		Plugins.AnyFile.movieCollection.fetch();

		Plugins.AnyFile.movieCollection.addMovie({
			imdb:       "",
			title:      Plugins.AnyFile.CurrentScrapper.movie.title,
			year:       "Unknown",
			runtime:    0,
			synopsis:   '',
			voteAverage:0,

			image:      Plugins.AnyFile.CurrentScrapper.movie.image,
			bigImage:   Plugins.AnyFile.CurrentScrapper.movie.image,
			backdrop:   '',

			quality:    Plugins.AnyFile.CurrentScrapper.movie.quality,
			torrent:    Plugins.AnyFile.CurrentScrapper.movie.torrent,
			torrents:   [],
			videos:     {},
			subtitles:  [],
			seeders:    Plugins.AnyFile.CurrentScrapper.movie.seeders,
			leechers:   Plugins.AnyFile.CurrentScrapper.movie.leechers,
			hasSubtitle: false
		});

		Plugins.AnyFile.movieList = new App.View.MovieList({
			model: Plugins.AnyFile.movieCollection
		});

		$('.movie-list').first().empty();

		setTimeout(function(){
			Plugins.AnyFile.movieList.constructor.busy = false;
		}, 5000);
	}
	catch(e) {}
}

$.when(
	$.getScript(Plugins.AnyFile.Config.script_location + "/template.js"),
	$.getScript(Plugins.AnyFile.Config.script_location + "/scrappers/kickass.to.js")
).done(Plugins.AnyFile.init);

