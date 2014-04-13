<pre>
Adding new shortcuts to popcorn time:

CTRL-UP - Move the subtitles up a little.
CTRL-DOWN - Move the subtitles down a little.
CTRL-F - Fullscreen mode.
CTRL-RIGHT - Fast forward 5 minutes.
CTRL-LEFT - Rewind 5 minutes.
SHIFT-UP - Bigger subtitles.
SHIFT-DOWN - Smaller subtitles.

building from source:

1. create a folder named "plugins".
2. put the contents of this plugin inside.
3. in popcorn time's index.html, add the following line just before the "&lt;/body>" tag (at the end of the file):

	&lt;script src="plugins/shortcuts/js/shortcuts.js"></script>

4. in Gruntfiles, add:
	
	'./plugins/**'
	
	to nodewebkit.src and dist.src arrays.
	
5. build using grunt :)
	
That's it :)
</pre>
