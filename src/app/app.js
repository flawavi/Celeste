"use strict"

var app = angular.module('Celeste', ['ngRoute'])
  .constant('CelesteAPIURL', 'http://localhost:8080/')

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
  .when('/play', {
    templateUrl: 'partials/play.html',
    controller: 'PlayCtrl'
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