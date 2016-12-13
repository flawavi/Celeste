"use strict"

var app = angular.module('Celeste', ['ngRoute'])
  .constant('CelesteURL', 'http://localhost:5000/')
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
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
  })
  .when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  })
  .when('/create', {
    templateUrl: 'partials/createExplorer.html',
    controller: 'CreateExplorerCtrl'
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