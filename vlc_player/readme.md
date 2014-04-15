<pre>
Allows you wathc the movie using VLC Player.

usage:

inside the popcorn time folder, edit vlc.config file with path to vlc.exe. For example:

"D:\Program Files (x86)\VideoLAN\VLC\vlc.exe"

Quotes wrapping the path are a must when using folders with spaces!

building from source:

1. create a folder named "plugins".
2. put the contents of this plugin inside.

3. in popcorn time's index.html, add the following lines just before the "&lt;/body>" tag (at the end of the file):
	
	&lt;script src="plugins/custom_subs_font/js/vlc_player.js"></script>

4. in Gruntfiles, add:
	
	'./plugins/**'
	
	to nodewebkit.src and dist.src arrays.
	
5. build using grunt :)	
	
That's it :)
</pre>
