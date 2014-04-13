var Plugins = Plugins || {};
Plugins.Shortcuts = {};
Plugins.Shortcuts.Config = {
	yDelta: 5,
	lastY: null
};

Plugins.Shortcuts.init = function() {
	$(".p_tooltip.play-button").bind("click", function() {
		alert(1);
	});
	
	document.addEventListener('keydown', function(event){
        if (event.ctrlKey && !event.shiftKey) {
			event.preventDefault();
			event.stopImmediatePropagation();
			switch(event.keyCode) {
				case 38:
					Plugins.Shortcuts.Config.lastY = parseInt($('#video-container .vjs-text-track-display').css("bottom")) + Plugins.Shortcuts.Config.yDelta;
					$('#video-container .vjs-text-track-display').css("bottom", Plugins.Shortcuts.Config.lastY + "px");
					break;
				case 40:
					Plugins.Shortcuts.Config.lastY = parseInt($('#video-container .vjs-text-track-display').css("bottom")) - Plugins.Shortcuts.Config.yDelta;
					$('#video-container .vjs-text-track-display').css("bottom", Plugins.Shortcuts.Config.lastY + "px");
					break;
				case 70:
					$('.vjs-fullscreen-control').trigger('click');
					break;
				case 37:
					Plugins.Shortcuts.seek(-5*50);
					break;
				case 39:
					Plugins.Shortcuts.seek(5*50);
					break;
			}
		}
		if (event.shiftKey && !event.ctrlKey) {
			event.preventDefault();
			event.stopImmediatePropagation();
			switch(event.keyCode) {
				case 38:
					Plugins.Shortcuts.simulateClick($(".vjs_biggersub_button.vjs-control").eq(0)[0], {type:"click"})
					break;
				case 40:
					Plugins.Shortcuts.simulateClick($(".vjs_smallersub_button.vjs-control").eq(0)[0], {type:"click"})
					break;
			}		
		}
    });
	
	$(window).resize(function() {
		if ($("#video_player").length > 0) {
			Plugins.Shortcuts.Player = videojs('video_player', { plugins: { biggerSubtitle : {}, smallerSubtitle : {}, customSubtitles: {} }});
			Plugins.Shortcuts.Player.player().on("play", function(event) {
				if (Plugins.Shortcuts.Config.lastY != null) {
					event.preventDefault();
					event.stopImmediatePropagation();		
					$('#video-container .vjs-text-track-display').css("bottom", Plugins.Shortcuts.Config.lastY + "px");
				}
			});
			Plugins.Shortcuts.Player.player().play();
		}
	});	
}

Plugins.Shortcuts.seek = function(time) {
	if ($("#video_player").length > 0) {
		Plugins.Shortcuts.Player = videojs('video_player', { plugins: { biggerSubtitle : {}, smallerSubtitle : {}, customSubtitles: {} }});
		Plugins.Shortcuts.simulateClick($("div[role=slider]").eq(0)[0], {type:"mousedown", clientX:$("div[role=slider]").width()*((Plugins.Shortcuts.Player.currentTime()+time)/Plugins.Shortcuts.Player.duration()), clientY:3});
		Plugins.Shortcuts.simulateClick($("div[role=slider]").eq(0)[0], {type:"mouseup"});
	}
}

Plugins.Shortcuts.simulateClick = function(target, options) {
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

/*
vjs-progress-holder vjs-slider
*/
Plugins.Shortcuts.init();

