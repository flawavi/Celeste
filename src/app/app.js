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
    redirectTo: '/login'
  })
  .when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
    // redirectAuth: "/my-profile",
    // resolve: {
    //   redirectCurrentUser
    // }
  })
  .when('/create', {
    templateUrl: 'partials/createExplorer.html',
    controller: 'CreateExplorerCtrl'
  })
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
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