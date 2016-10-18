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

  .state('app.faculty_news', {
    url: "/news",
    cache: false,
    views: {
      'tab-facultyNews': {
        templateUrl: "templates/faculty_news.html",
        controller: 'FacultyNewsCtrl'
      }
    }
  })

  .state('app.university_news', {
    url: "/vu_news",
    cache: false,
    views: {
      'tab-universityNews': {
        templateUrl: "templates/vu_news.html",
        controller: 'VuNewsCtrl'
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
        'tab-facultyNews': {
          templateUrl: "templates/new.html",
          controller: 'NewlistCtrl'
        }
      }
    })

    .state('app.singleVuEvent', {
      url: "/vu_news/:vu_newsid",
      params: {'result': null},
      views: {
        'tab-universityNews': {
          templateUrl: "templates/new.html",
          controller: 'EventsListCtrl'
        }
      }
    })
    ;
  $urlRouterProvider.otherwise('/app/main');
});
