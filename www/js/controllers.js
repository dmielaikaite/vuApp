angular.module('starter.controllers', [])

.service('newsService', function() {

  var newsFaculty = {
        title: '',
        price: ''
    };
    return newsFaculty;
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, newsService) {

  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };


  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.selectFaculty = function(faculty) {
    newsService.newsFaculty = faculty;
    console.log(newsService.newsFaculty);
  }
})

.controller('VuNewsCtrl', function($http, $scope , newsService, $state) {
    var query = "http://www.vu.lt/en/news?format=feed&type=rss";
  
$scope.init = function() {
        $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "num":"85", "q": query } })
            .success(function(data) {
              console.log('success');
                $scope.rssTitle = data.responseData.feed.title;
                $scope.rssUrl = data.responseData.feed.feedUrl;
                $scope.rssSiteUrl = data.responseData.feed.link;
                $scope.entries = data.responseData.feed.entries;
                window.localStorage["entries"] = JSON.stringify(data.responseData.feed.entries);
            })
            .error(function(data) {
              console.log('error');
                console.log("ERROR: " + data);
                //cache our data in case there is a time where the user does not have internet access 
                if(window.localStorage["entries"] !== undefined) {
                    $scope.entries = JSON.parse(window.localStorage["entries"]);
                }
            });
    }

    $scope.browse = function(v) {
      $scope.oneNewEntry = v;
      console.log($scope.oneNewEntry);
      $state.go('app.singleVuEvent', {result: $scope.oneNewEntry});
      console.log('clicked');
    }

})

.controller('FacultyNewsCtrl', function($http, $scope , newsService, $state) {
    console.log('chosen: ' + newsService.newsFaculty);
    var facultyRssNewsUrl = "";
    var query = "http://www.vu.lt/en/news?format=feed&type=rss";
    if (newsService.newsFaculty == undefined){
      facultyRssNewsUrl = query;
    }
    if (newsService.newsFaculty == "Faculty of Chemistry­­"){
     facultyRssNewsUrl =  query;
    }
    if (newsService.newsFaculty == "Faculty of Communication­"){
      facultyRssNewsUrl =  query;
    }
    if (newsService.newsFaculty == "Faculty of Economics­"){
      facultyRssNewsUrl =  query; 
    }
    if (newsService.newsFaculty == "Faculty of History­"){
     facultyRssNewsUrl =  query;  
    }
    if (newsService.newsFaculty == "Faculty of Humanities in Kaunas"){
      facultyRssNewsUrl =  query; 
    }
    if (newsService.newsFaculty == "Faculty of Law"){
      facultyRssNewsUrl =  query;
    }
    if (newsService.newsFaculty == "Faculty of Mathematics and Informatics"){
      facultyRssNewsUrl =  "http://mif.vu.lt/lt3/en/news/events?format=feed&type=rss";
    }
    if (newsService.newsFaculty == "Faculty of Medicine"){
      facultyRssNewsUrl =  query;
    }
    if (newsService.newsFaculty == "Faculty of Natural Sciences"){
      facultyRssNewsUrl =  query;
    }
    if (newsService.newsFaculty == "Faculty of Philology"){
      facultyRssNewsUrl =  "http://www.flf.vu.lt/naujienos/bendros-naujienos?format=feed&type=rss";
    }
    if (newsService.newsFaculty == "Faculty of Philosophy"){
      facultyRssNewsUrl =  "http://www.fsf.vu.lt/rss-feed?format=raw&id=94";
    }
    if (newsService.newsFaculty == "Faculty of Physics"){
      facultyRssNewsUrl =  "http://www.ff.vu.lt/naujienos?format=feed&type=rss";
    }
    if (newsService.newsFaculty == "Institute of Foreign Languages"){
      facultyRssNewsUrl =  query;
    }
    if (newsService.newsFaculty == "Institute of International Relations and Political Science"){
      facultyRssNewsUrl =  "http://www.tspmi.vu.lt/en/news/rss.xml";
    }       
   

$scope.init = function() {
        $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "num":"85", "q": facultyRssNewsUrl } })
            .success(function(data) {
                $scope.rssTitle = data.responseData.feed.title;
                $scope.rssUrl = data.responseData.feed.feedUrl;
                $scope.rssSiteUrl = data.responseData.feed.link;
                $scope.entries = data.responseData.feed.entries;
                //cache our data in case there is a time where the user does not have internet access 
                window.localStorage["entries"] = JSON.stringify(data.responseData.feed.entries);
                //console.log(data.responseData.feed.entries[0]);
                console.log($scope.entries[0].publishedDate);

            })
            .error(function(data) {
                console.log("ERROR: " + data);
                //cache our data in case there is a time where the user does not have internet access 
                if(window.localStorage["entries"] !== undefined) {
                    $scope.entries = JSON.parse(window.localStorage["entries"]);
                }
            });
    }

    $scope.browse = function(v) {
      $scope.oneNewEntry = v;
      // $scope.oneEntry = v;
      $state.go('app.singleNew', {result: $scope.oneNewEntry});
      //console.log($scope.oneNewEntry);
      console.log('clicked');
    // window.open(v, "_system", "location=yes");
    }

})

.controller('MainCtrl', function($scope, $stateParams) {

})

.controller('NewlistCtrl', function($scope, $stateParams, newsService) {
  $scope.oneEntry = $stateParams.result

  $scope.getPhoto = function(entry) {
        var imgUrl = entry.content.match(/src="([^"]*)/)[1];
        // if (imgUrl != null){
          return imgUrl;
        // }
        //dosn't work, yet
        // else{
        //   return imgUrl = "https://www.google.lt/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj8vs7WgODPAhWpZpoKHSd5C9kQjRwIBw&url=http%3A%2F%2Fwww.vu.lt%2Fapiemus%2Fvu-atributika&psig=AFQjCNGkNLgJ6CkDnUMIzxbbQUf-nfXOBQ&ust=1476730690694665"
        // }
  }

  console.log($scope.oneEntry);
  console.log('one new');
})

.controller('EventsListCtrl', function($scope, $stateParams, newsService) {
  $scope.oneEntry = $stateParams.result
  $scope.getPhoto = function(entry) {
        var imgUrl = entry.content.match(/src="([^"]*)/)[1];
        return imgUrl;
  }

  console.log($scope.oneEntry);
  console.log('one new');
});


