import $http from "boot/token_request";

export async function storeEchoNote({commit}, data) {
  try {
    const res = await $http.post('/echo-notes', data);
    console.log(res)
    if (res.status) {
      commit('STORE_ECHO_NOTE', res.data);
    }
    console.log('Hello')
    return res.data;
  } catch (e) {
    return false;
  }
}

export async function fetchEchoNote({commit}) {
  try {
    const res = await $http.get('/echo-notes');
    if (res.data.status) {
      commit('SET_ECHO_NOTE', res.data);
    }
    return res.data;
  } catch (e) {
    return false;
  }
}

export async function editEchoNote({commit}, id) {
  try {
    const res = await $http.get('/echo-notes/' + id + '/edit');
    return res.data;
  } catch (e) {
    return false;
  }
}
