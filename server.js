var express = require('express'),
    fs = require('fs'),
    app = express.createServer()

app.configure(function(){
    app.use(express.static(__dirname));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.logger());
    app.use(express.errorHandler({
        dumpExceptions: true, 
        showStack: true
    }));
    app.use(app.router);
});

app.get('/', function(req, res){
    res.redirect("/index.html");
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});