/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


//(function(document) {
  //'use strict';

  var backend = new Object();

  backend.firebasePath = "https://torrid-inferno-9795.firebaseio.com/";

  backend.firebaseRef = new Firebase(backend.firebasePath);

  backend.authData = null;

  backend.registerUser = function(email, password, callback){
    backend.firebaseRef.createUser({
      email    : email,
      password : password
    }, callback);
  }

  backend.login = function(email, password, callback){
    backend.firebaseRef.authWithPassword({
      email    : email,
      password : password
    }, callback);
  }

  backend.facebookLogin = function(callback){
    backend.firebaseRef.authWithOAuthPopup("facebook", callback);
  }

  backend.twitterLogin = function(callback){
    backend.firebaseRef.authWithOAuthPopup("twitter", callback);
  }

  backend.googleLogin = function(callback){
    backend.firebaseRef.authWithOAuthPopup("google", callback);
  }

  backend.anonymousLogin = function(callback) {
    backend.firebaseRef.authAnonymously(callback);
  }

  backend.logOut = function(){
    backend.firebaseRef.unauth();
  }

  backend.setProfile = function(profile, callback) {
    var authData = backend.getUserProfile();
    backend.firebaseRef.child("profile/"+authData.uid).push(profile, callback);
  }

  backend.isUserLoggedIn = function(callback, callbackError){
    var authData = backend.firebaseRef.getAuth();
    if (authData) {
      var ref = new Firebase(db.firebasePath + "profile/" + authData.uid);
      ref.on("value", callback, callbackError);
    }
  }

  backend.isUserLoggedIn = function(){
    var authData = backend.firebaseRef.getAuth();
    console.log(authData);
    if (authData) return true;
    else return false;
  }

  backend.sendMessage = function(message, callback){
    var authData = backend.getUserProfile();
    backend.firebaseRef.child("messages").push({
        user: authData.displayName,
        msg: message
      }, callback);
    app.scrollPageToBottom();
  }

  backend.getUserProfile = function(){
    var authData = backend.firebaseRef.getAuth();
    if (!authData) return false;
    if (authData.provider == "facebook") return authData.facebook;
    else if (authData.provider == "password") {
      authData.password.user = authData.uid;
      return authData.password;
    }
    else if (authData.provider == "twitter") return authData.twitter;
    else if (authData.provider == "google") return authData.google;
    else return authData.password;
  }

//})(document);




