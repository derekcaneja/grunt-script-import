module.exports = function(grunt) {

    // Grunt Configuration
    grunt.initConfig({

        // Load Dependencies
        pkg: grunt.file.readJSON('package.json'),

        // Start node server
        "script-import" : {
        	compile: {
		        src     : 'path/to/src.html', 
		        dest    : 'path/to/output.html',
		        dev_dir : 'path/to/dev_directory'
		    }
        }
    });

}