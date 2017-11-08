var http = require('http');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var router = express.Router();
app.use(bodyParser.json());

var received_updates = [];

http.createServer(app).listen(8000);

router.get('/', function (req, res,next) 
{
    console.log("En el inicio de la app");

    console.log(req.query["hub.challenge"]);
    res.status(200).send(req.query["hub.challenge"]);
});

router.post('/', function(req, res, next){
    received_updates.unshift(req.body.entry[0].changes[0].value);
    // console.log("Post_id: " + received_updates[0].post_id);
    // console.log("message: " + received_updates[0].message);
    // console.log("sender_id: " + received_updates[0].sender_id);
    // console.log("sender_name: " + received_updates[0].sender_name);
    console.log(received_updates);
    res.status(200).send("200 OK");

    // if(received_updates[0].verb == "add" && received_updates[0].sender_id != "272769389899454" && received_updates[0].message != undefined)
    // {
        // var url = 'http://localhost:3300/mensajesSP';
        // var params = {
            // user: received_updates[0].sender_name,
            // userId: received_updates[0].sender_id,
            // postId: received_updates[0].post_id,
            // message: received_updates[0].message,
        // };
    
        // request.post({url: url, qs: params}, function(err, resp, body) 
        // {
            // if(resp != undefined)
                // if(resp.body != undefined)
                    // console.log("OK");
        // });
    // }

    // received_updates = [];

    
});

app.use(router);