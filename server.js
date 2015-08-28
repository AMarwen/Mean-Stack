//express 1- include module and store it in var
var express = require("express");

//express 2- storing constructor in variable
var app = express();

//mongodb 1-include the module and store it in varaible
var mongojs = require('mongojs');

/*mongodb 2- setting the databse and teh collection
arg1: databsename arg2 :collection names in array
(can be 1 collectoin or se of ciollections)*/
var db = mongojs('contactlist', ['contactCollection'])

/*express 3- tell the server to seach for s static files (html,css,javascript,image)
static because they will not change dynamically when we use the app*/
app.use(express.static(__dirname + "/public"));

//#######################Listen to GET request sent to "/contactlist"##########################
//express 4-Specify HTTP Response that will send to Client to whenever a GET request sent to "/contactlist"
app.get("/contactlist",function(req,res){
    //message will Display at server terminal whenever  a GET request sent to "/contactlist"
    console.log("I received a GET request");

    /*mongodb 3 - getting document(JSON) from specific collection
    db.$CollectionName.find(..)*/
      db.contactCollection.find(function(err,docs){
        //mongodb docs(JSON) will display  at server terminal whenever  a GET request send to "/contactlist"
        console.log(docs);
        /*mongodb  4- send a response Contains the "mongoDB contactCollection collection documents"
         whenever  a GET request sent to "/contactlist"*/
        res.json(docs);
    })
});
//########################################################################

//#############Listen to POST request sent to "/contactlist"##################
//Storing Data In mongoDB : 5-Specify HTTP Response that will send to Client to whenever a POST request sent to "/contactlist"
app.post('/contactlist',function(req, res){
    //Storing Data In mongoDB : 6-testing if server can get data from the Client
    console.log(req.body);
});
//#######################################################

//set the HTTP port
app.listen(3000);

//set the message that will Display on server side during server function
console.log("server runing on port 3000");








