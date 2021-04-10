//Главный store
import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import parts from "./modules/parts";
import lots from "./modules/lots";
import bids from "./modules/bids";

Vue.use(Vuex);


 const store = () => new Vuex.Store({
  modules: {
      users,
      parts,
      lots,
      bids
    },
});


export default store;
