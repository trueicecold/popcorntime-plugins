var Plugins = Plugins || {};
Plugins.AnyFile = {};
Plugins.AnyFile.Config = {
	script_location: document.currentScript.src.split("/").slice(0, -1).join("/") + "/",
	plugin_location: document.currentScript.src.split("/").slice(0, -2).join("/") + "/"
};

Plugins.AnyFile.init = function() {
	$(".search").css("top", "24px");
	Plugins.AnyFile.Template.load("sidebar_buttons", function(data) {
		$(".search").before(data);
	});
}

Plugins.AnyFile.openFile = function() {
	Plugins.AnyFile.CurrentScrapper = Plugins.AnyFile.Scrappers.FileDialog;
	$("#anyfileFileDialog").on("change", function() {
		Plugins.AnyFile.Scrappers.FileDialog.parseFile();
	});
	$("#anyfileFileDialog").click();
}

Plugins.AnyFile.openBrowser = function() {
	Plugins.AnyFile.CurrentScrapper = Plugins.AnyFile.Scrappers.KickassTo;
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
		$('.movie-list').on("DOMSubtreeModified", function() {
			$('.movie-list').off("DOMSubtreeModified");
			setTimeout(function() {
				$(".movie.fullyLoaded.loaded .cover").eq(0).css("position", "relative");
				$(".movie.fullyLoaded.loaded .cover").eq(0).append("<div style='padding:5px;position:absolute;top:130px;width:120px;word-break:break-word;color:#ffffff;font-size:12px;'>" + Plugins.AnyFile.CurrentScrapper.movie.title + "</div>");
				$(".movie.fullyLoaded.loaded a").eq(0).click(function() {
					setTimeout(function() {
						$(".movie-detail h2").css("word-break", "break-word");
					}, 200);
				});
			}, 500);
		});

		setTimeout(function(){
			Plugins.AnyFile.movieList.constructor.busy = false;
		}, 5000);
	}
	catch(e) {}
}

Plugins.AnyFile.simulateClick = function(target, options) {
	var event = target.ownerDocument.createEvent('MouseEvents'),
		options = options || {};

	//Set your default options to the right of ||
	var opts = {
		type: options.type                  || 'click',
		canBubble:options.canBubble             || true,
		cancelable:options.cancelable           || true,
		view:options.view                       || target.ownerDocument.defaultView, 
		detail:options.detail                   || 1,
		screenX:options.screenX                 || 0, //The coordinates within the entire page
		screenY:options.screenY                 || 0,
		clientX:options.clientX                 || 0, //The coordinates within the viewport
		clientY:options.clientY                 || 0,
		ctrlKey:options.ctrlKey                 || false,
		altKey:options.altKey                   || false,
		shiftKey:options.shiftKey               || false,
		metaKey:options.metaKey                 || false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
		button:options.button                   || 0, //0 = left, 1 = middle, 2 = right
		relatedTarget:options.relatedTarget     || null,
	}

	//Pass in the options
	event.initMouseEvent(
		opts.type,
		opts.canBubble,
		opts.cancelable,
		opts.view, 
		opts.detail,
		opts.screenX,
		opts.screenY,
		opts.clientX,
		opts.clientY,
		opts.ctrlKey,
		opts.altKey,
		opts.shiftKey,
		opts.metaKey,
		opts.button,
		opts.relatedTarget
	);

	//Fire the event
	target.dispatchEvent(event);
}

$.when(
	$.getScript(Plugins.AnyFile.Config.script_location + "/template.js"),
	$.getScript(Plugins.AnyFile.Config.script_location + "/scrappers/kickass.to.js"),
	$.getScript(Plugins.AnyFile.Config.script_location + "/scrappers/filedialog.js")
).done(Plugins.AnyFile.init);

