angular.module('starter.controllers', [])

.service('newsService', function() {

  var newsFaculty = {
        title: '',
        price: ''
    };
   var facultyUrl = {
        url: ''
    };   
    return newsFaculty, facultyUrl;
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, newsService, $http) {

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

    $scope.init = function() {
        $http.get('js/data.json').success(function(data) {
          for (var i = 0; i < data.faculties.length; i++){
            if (newsService.newsFaculty == data.faculties[i].name){
              newsService.facultyUrl = data.faculties[i].url;
              if (newsService.facultyUrl == "" || newsService.facultyUrl == null){
                newsService.facultyUrl = "http://www.vu.lt/en/news?format=feed&type=rss";
              }
            }
          }
            $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "num":"85", "q": newsService.facultyUrl } })
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
                //
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
        return imgUrl;
  }
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


