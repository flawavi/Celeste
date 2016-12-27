"use strict"

var app = angular.module('Celeste', ['ngRoute'])
  .constant('Celeste_API_URL', 'http://localhost:5000/')
  .constant('FirebaseURL', 'celeste-b0847.firebaseapp.com')

const currentUser = AuthFactory => AuthFactory.currentUser()

const requireCurrentUser = AuthFactory => AuthFactory.currentUser().then(user => {
  if (!user) throw new Error('NO_CURRENT_USER')
})

const redirectCurrentUser = AuthFactory => AuthFactory.currentUser().then(user => {
  if (user) throw new Error('CURRENT_USER')
})

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  })
  .when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
    // redirectAuth: "/my-profile",
    // resolve: {
    //   redirectCurrentUser
    // }
  })
  .when('/createExplorer', {
    templateUrl: 'partials/createExplorer.html',
    controller: 'CreateExplorerCtrl'
  })
  .when('/command_deck/:id', {
    templateUrl: 'partials/commandDeck.html',
    controller: 'CommandDeckCtrl',
    resolve: {
      id: function ($q, $route) {
        var deferred = $q.defer(),
            id = $route.current.params.id
            if(isNaN(id)) {
              deferred.resolve(id)
            } else {
              deferred.reject("There's something wrong with your ID")
            }
            return deferred.promise
      }
    }
  })
  .when('/journey', {
    templateUrl: 'partials/journey.html',
    controller: 'JourneyCtrl'
  })
  .when('/create_journey', {
    templateUrl: 'partials/createJourney.html',
    controller: 'CreateJourneyCtrl'
  })
  .when('/theend', {
    templateUrl: 'partials/theend.html',
    controller: 'TheEndCtrl'
  })
  .when('/destination/:id', {
    templateUrl: 'partials/destination.html',
    controller: 'DestinationCtrl',
    resolve: {
      id: function ($q, $route) {
          var deferred = $q.defer(),
              id = parseInt($route.current.params.id, 10);

          if (!isNaN(id)) {
              deferred.resolve(id);
          } else {
              deferred.reject('Id is not a number');
          }
          return deferred.promise
      }
    }
  })
  .otherwise('/');
});

app.run(($location, FBCreds) => {
  let creds = FBCreds
  let authConfig = {
    apiKey: creds.apiKey,
    authDomain: creds.authDomain
  }
  firebase.initializeApp(authConfig)
})