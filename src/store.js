import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyBnOJ0sMNLHMRCz2fDnNQv6kxM4rpguIEE",
  authDomain: "food-diary-f44c0.firebaseapp.com",
  databaseURL: "https://food-diary-f44c0.firebaseio.com",
  projectId: "food-diary-f44c0",
  storageBucket: "food-diary-f44c0.appspot.com",
  messagingSenderId: "615100068834"
};
firebase.initializeApp(config);

export default new Vuex.Store({
  state: { firebase },
  mutations: {},
  actions: {}
});
