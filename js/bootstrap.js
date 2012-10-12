requirejs.config({
    paths: {
        tpl: 'lib/tpl/tpl'
    }
});
requirejs(['indexcontroller'], function(indexcontroller) {
    // nothing to do here
});

// global functions
var api = function(api, func, params) {
    var request = $.ajax({
        url: 'api/',
        type: "POST",
        data: {api : api, func : func, params : params},
        dataType: 'json'
    });
    
    return request;
};

var inArray = function(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
};

var isValidLetter = function(letter) {
    var check = letter.substring(0, 1);
    if (check.match(/^[A-Za-z]$/)) {
        return true;
    }
    else {
        return false;
    }
}

var error = function(msg) {
    alert(msg);
}