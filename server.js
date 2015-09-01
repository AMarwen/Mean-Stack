//express 1- include module and store it in var
var express = require("express");

//express 2- storing constructor in variable
var app = express();

//mongodb 1-include the module and store it in varaible
var mongojs = require('mongojs');

/*mongodb 2- setting the databse and the collection
 arg1: databsename arg2 :collection names in array
 (can be 1 collectoin or se of ciollections)*/
var db = mongojs('contactlist', ['contactCollection']);

/* InsertingDocumentInMongoDB#6 : require the module parse the JS and put it in variable
 without this module server won't be able to parse the  body request
 "sent from the Client at step 5"
 */
var bodyParser = require('body-parser');



/*express 3- tell the server to seach for s static files (html,css,javascript,image)
static because they will not change dynamically when we use the app*/
app.use(express.static(__dirname + "/public"));

/*InsertingDocumentInMongoDB#7 : make the server able to parse POST data of the type application/json
 (now the express module can parse the  JSON sent in the HTTP POST request )*/
app.use(bodyParser.json());

//#######################Listen to GET request sent to "/contactlist"##########################
//express 4-Specify HTTP Response that will send to Client to whenever a GET request sent to "/contactlist"
app.get("/contactlist",function(req,res){
    //message will Display at server terminal whenever  a GET request sent to "/contactlist"
    console.log("/contactlist received a HTTP GET request");

    /*<!--mongodb 3 - getting document(JSON) from specific Databse collection db.$CollectionName.find(..)-->*/
      db.contactCollection.find(function(err,docs){
        //mongodb docs(JSON) will display  at server terminal whenever  a GET request send to "/contactlist"
        console.log(docs);
        /*mongodb 4- send a response Contains the "mongoDB contactCollection collection documents"
         whenever  a GET request sent to "/contactlist"*/
        res.json(docs);
    })
});
//########################################################################

//#############Listen to POST request sent to "/contactlist"##################
/*InsertingDocumentInMongoDB#8 : Specify HTTP Response that will send to the Client whenever a HTTP POST request sent to "/contactlist"
 parm 1: the requested page by the client(ex:AngularJS)
 parm 2 : a Callback function that have 2 parameters req and res
                req : will get Request sent to "Arg1" page
                res :will respond to the the Request sent to "Arg1" page
 */
app.post('/contactlist',function(req, res){

    /*info-about-req.body : "req" is an object that contains the request sent to our server and
    it has some props  like "body" wich will get the comming request body in our case JSON object.
    by default req.body undefined and is populated when you use a body-parsing middleware such as body-parser and multer*/
    console.log( "Body of HTTP POST request that has been sent from /contactlist :");
    console.log(req);
    console.log( "Body of HTTP POST request that has been sent from /contactlist :");
    console.log(req.body);

    /*InsertingDocumentInMongoDB#9  : insert HTTP request body (JSON object)  in the Databse Collection
     parm 1 : the JSON content that you want to insert in database
     parm 2 : a Callback function that will send a response to the server
                doc : this parameter will contain jsut the inserted document
     note : db.$CollectionName
    */
    db.contactCollection.insert(req.body, function(err,doc){
        /*InsertingDocumentInMongoDB#10  :send a HTTP response Contain the inserted "document"
         param1 : A JSON objecr ex( the document that has been inserted in the db collection)
         (!next step  in /js/angular-modules/module.js)
         */
        res.json(doc);
    });
});
//#######################################################

//set the HTTP port
app.listen(3000);

//set the message that will Display on server side during server function
console.log("server runing on port 3000");








