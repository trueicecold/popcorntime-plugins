<pre>
Allows you to edit the subtitle font styling using regular css rules.

usage:

inside the popcorn time folder, edit subs.config file with the css you want for the subtitles.

building from source:

1. create a folder named "plugins".
2. put the contents of this plugin inside.

3. in popcorn time's index.html, add the following lines just before the "&lt;/body>" tag (at the end of the file):
	
	&lt;script src="plugins/custom_subs_font/js/custom_subs_font.js"></script>

4. in Gruntfiles, add:
	
	'./plugins/**'
	
	to nodewebkit.src and dist.src arrays.
	
5. build using grunt :)	
	
That's it :)
</pre>
