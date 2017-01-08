'use strict'

app.factory("CelesteFactory", function($q, $http, AuthFactory, Celeste_API_URL){

  let service = {}

  let getLessons = () => {
    return $q((resolve, reject) => {
      $http.get(`${Celeste_API_URL}`)
      .success(obj => {
      resolve(obj)
    })
    .error(error => {
      reject(error)
      })
    })
  }

  service = {getLessons}

  return service

})
