module.exports = function(grunt) {
    // Please see the grunt documentation for more information regarding task creation: https://github.com/gruntjs/grunt/blob/devel/docs/toc.md 
    grunt.registerMultiTask('import-script', 'Use this grunt module to, in shorthand, import various javascript files into your html files.', function () {
        var src = grunt.file.read(this.data.src);

        var singleAdds    = {};
        var imports       = src.split('@import');
        var srcFirstHalf  = imports.slice(0, 1);
        var srcSecondHalf = imports.slice(imports.length - 1);

        for(var i = 1; i < imports.length; i++) {
            var currentImport = cleanImport(imports[i]);

            if(currentImport.substring(currentImport.length - 5) == '/**/*') {
                grunt.file.recurse(this.data.dev_dir + '/' + currentImport.substring(0, currentImport.length - 4), function(abspath, rootdir, subdir, filename) {
                    if(filename[0] == '.' || filename[0] == '_') return false;

                    if(!singleAdds[abspath]) addScriptForPath(abspath.substring(('public').length));
                });
            } else if(currentImport.substring(currentImport.length - 2) == '/*') {
                grunt.file.recurse(this.data.dev_dir + '/' + currentImport.substring(0, currentImport.length - 2), function(abspath, rootdir, subdir, filename) {
                    if(filename[0] == '.' || filename[0] == '_') return false;

                    if(!singleAdds[abspath] && !subdir) addScriptForPath(abspath.substring(('public').length));
                });
            } else {
                singleAdds[this.data.dev_dir + '/' + currentImport + '.js'] = true;

                addScriptForPath(this.data.dev_dir.substring(('public').length) + '/' + currentImport + '.js');
            }
        }

        var toWrite = '';

        toWrite += srcFirstHalf[0];

        for(var i = 0; i < finalImports.length; i++) toWrite += finalImports[i];

        toWrite += '\n\t\t' + srcSecondHalf[0].substring(srcSecondHalf[0].indexOf('<'));

        grunt.file.write(this.data.dest, toWrite, function() {
            console.log('Success!')
        });        
    });
};

var finalImports = [];

function addScriptForPath(inputPath) {
    if(!inputPath) return false;

    if(inputPath.slice(0, 1) != '/') inputPath = '/' + inputPath;

    var newScript = '<script type="text/javascript" src="' + inputPath + '"></script>\n\t\t';

    finalImports.push(newScript);
}

function cleanImport(inputImport) {
    if(!inputImport) return false;

    return inputImport.substring(1, inputImport.indexOf('.js'));
}
