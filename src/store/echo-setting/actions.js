import $http from "boot/token_request";
export async function storeEchoSetting ({ commit }, data) {
  try {
    const res = await $http.post('/echo-settings/', data);
    return res.data
  } catch (e) {

  }
}
export async function fetchEchoSetting ({commit}) {

  try {
    const res = await $http.get('/echo-settings/get');
    if (res.data.status) {
      commit('SET_ECHO_SETTING', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function editEchoSetting({ commit }, id) {
  try {
    const res = await $http.get('/echo-settings/'+id+'/edit');
    if (res.data.status) {
      return res.data
    }
  } catch (e) {
    return false
  }
}
export async function updateEchoSetting({commit}, data) {
  try {
    const res = await $http.put('/echo-settings/'+data.id+'/update', data.data);
    // if (res.data.status) {
    //   commit('UPDATE_BLOG', res.data);
    // }
    return res.data
  } catch (e) {
    return false
  }
}
