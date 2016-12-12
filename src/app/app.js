"use strict"

var app = angular.module('Celeste', ['ngRoute'])

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