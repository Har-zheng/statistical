import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import token from "./token";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    token
  },
  getters
});
