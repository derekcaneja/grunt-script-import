grunt-script-import
===================

Use this grunt module to, in shorthand, import various javascript files into your html files.

#Gruntfile
```javascript
script-import: {
    compile: {
        src     : 'path/to/src.html', 
        dest    : 'path/to/output.html',
        dev_dir : 'path/to/dev_directory'
    }
}
```

#Syntax

```html
<script src="/path/to/other.js" type="text/javascript"></script>

<!-- import with grunt-script-import -->
@import path/to/script.js
<!-- end import with grunt-script-import-->
```

###Import a file

'''html
@import path/to/script.js
```

###Import a directory

'''html
@import directory_name/*.js
```

###Import a directory and sub directories

'''html
@import directory_name/**/*.js
```
