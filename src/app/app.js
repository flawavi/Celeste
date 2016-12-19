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
  .when('/command_deck', {
    templateUrl: 'partials/commandDeck.html',
    controller: 'CommandDeckCtrl'
  })
  .when('/journey', {
    templateUrl: 'partials/journey.html',
    controller: 'JourneyCtrl'
  })
  .when('/create_journey', {
    templateUrl: 'partials/createJourney.html',
    controller: 'CreateJourneyCtrl'
  })
  .when('/moon', {
    templateUrl: 'partials/moon.html',
    controller: 'MoonCtrl'
  })
  .when('/mars', {
    templateUrl: 'partials/mars.html',
    controller: 'MarsCtrl'
  })
  .when('/jupiter', {
    templateUrl: 'partials/jupiter.html',
    controller: 'JupiterCtrl'
  })
  .when('/saturn', {
    templateUrl: 'partials/saturn.html',
    controller: 'SaturnCtrl'
  })
  .when('/sun', {
    templateUrl: 'partials/sun.html',
    controller: 'SunCtrl'
  })
  .when('/theoortcloud', {
    templateUrl: 'partials/theoortcloud.html',
    controller: 'TheOortCloudCtrl'
  })
  .when('/alphacentauri', {
    templateUrl: 'partials/alphacentauri.html',
    controller: 'AlphaCentauriCtrl'
  })
  .when('/milkyway', {
    templateUrl: 'partials/milkyway.html',
    controller: 'MilkyWayCtrl'
  })
  .when('/andromeda', {
    templateUrl: 'partials/andromeda.html',
    controller: 'AndromedaCtrl'
  })
  .when('/destination', {
    templateUrl: 'partials/destination.html',
    controller: 'DestinationCtrl'
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