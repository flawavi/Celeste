"use strict"

app.factory("AuthFactory", function(){
  let service

  let createUser = userObj => {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
  }


  service = {createUser}

  return service
})