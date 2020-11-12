import { getToken, setToken } from "@/utils/auth";
const token = {
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },
  actions: {
    SetToken({ commit }, token) {
      return new Promise(resolve => {
        resolve();
        commit("SET_TOKEN", token);
        setToken(token);
      });
    }
  }
};
export default token;
