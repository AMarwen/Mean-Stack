//Angular : 3-create a module and store it in varaible
//!module name is the same as the one set at step 1ng-app="MyApp"
var MyApp = angular.module('MyApp',[]);

/*Angular : 4-create a Controller inside your module
then use the $scope object to access to the "controller ng-model and template var"*/
MyApp.controller("AppCtrl",function($scope , $http) {
   //##################send HTTP request###############################
    //Angular : 6-Send GET HTTP request to "/contactlist"
   $http.get("/contactlist").success(function(response){
        console.log("I got the data I required");
       $scope.contactlist = response;
   });
    //###########################################################

   //Storing Data In mongoDB : 3-create Controller method
    $scope.addContact = function(){
        console.log($scope.contact);
        /*Storing Data In mongoDB : 4-Sending JSON object(contact) to the server
         arg1 : ukr that will handle the request
         arg2 : the data that will be handled (!next step  in /server.js)*/
        $http.post("/contactlist",$scope.contact);
    }

})//MyApp.controller


















