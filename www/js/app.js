angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.timetable', {
    url: "/timetable",
    views: {
      'tab-timetable': {
        templateUrl: "templates/timetable.html"
      }
    }
  })

  .state('app.news', {
    url: "/news",
    cache: false,
    views: {
      'tab-news': {
        templateUrl: "templates/news.html",
        controller: 'NewsCtrl'
      }
    }
  })

  .state('app.main', {
    url: "/main",
    views: {
      'tab-main': {
        templateUrl: "templates/main.html",
        controller: 'MainCtrl'
      }
    }
  })

    .state('app.singleNew', {
      url: "/news/:newsid",
      params: {'result': null},
      views: {
        'tab-news': {
          templateUrl: "templates/new.html",
          controller: 'NewlistCtrl'
        }
      }
    })
    ;
  $urlRouterProvider.otherwise('/app/main');
});
