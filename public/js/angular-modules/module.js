//Angular : 3-create a module and store it in varaible
//!module name is the same as the one set at step 1ng-app="MyApp"
var MyApp = angular.module('MyApp',[]);

/*Angular : 4-create a Controller inside your module
then use the $scope object to access to the "controller ng-model and template var"*/
MyApp.controller("AppCtrl",function($scope , $http)
{
       //##################sHTTP GET request###############################
        //Angular : 6-Send GET HTTP request to "/contactlist"
       $http.get("/contactlist").success(function(response){
            console.log("I got the data I required");
           $scope.contactlist = response;
       });
        //###########################################################

    //##################HTTP POST request###############################
   //InsertingDocumentInMongoDB#4 : get "contact" model Var that exist in  "AppCtrl"  then send it to a HTTP server(node.js)
   // (!prev step  in /public/index.html!)
    $scope.addContact = function(){
        console.log("HTTP req : Data that will be sent in HTTP post to the /contactlist :"); console.log($scope.contact);
        /*InsertingDocumentInMongoDB#5 : Sending JSON object(contact) to the server
         arg1 : url that will handle the request
         arg2 : the data that will be handled (!next step  in /server.js)*/

        /*InsertingDocumentInMongoDB#11 : When server send a HTTP response from step 10
        the "success" method will access to that response and it will store it in its first parameter*/
        $http.post("/contactlist",$scope.contact).success(function(response){
            console.log("HTTP res : Data sent from the server after inserting document in DB:");console.log(response);
            /*StoringDataInMongoDB#12: to display Retrieved document from DB without page refresh
                we will push the Document in the HTTP response into the  "contactlist" model variable
                (! next step in /index.html)*/
            $scope.contactlist.push(response);

        });
    }//addContact
    //###########################################################




})//MyApp.controller


















