import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "@/utils/message.plugin";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
// eslint-disable-next-line no-unused-vars
import M from "materialize-css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const eventEmitter = new Vue();

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);

firebase.initializeApp({
  apiKey: "AIzaSyCRNwMVIuq7QjdqDQJV-qZrXUlwjdKHHc4",
  authDomain: "groozgo-test.firebaseapp.com",
  databaseURL: "https://groozgo-test.firebaseio.com",
  projectId: "groozgo-test",
  storageBucket: "groozgo-test.appspot.com",
  messagingSenderId: "873786030955",
  appId: "1:873786030955:web:2df347b152fb4d18e9ea2e",
  measurementId: "G-RV874667D3"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
