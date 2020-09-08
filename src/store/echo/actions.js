import $http from "boot/token_request";
export async function storeEcho ({ commit }, data) {
  try {
    const res = await $http.post('/echos', data)
    if(res.data.status){
      commit('STORE_ECHO', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function storeEchoBaby ({ commit }, data) {
  try {
    const res = await $http.post('/echo-babies', data)
    if(res.data.status){
      commit('STORE_ECHO_BABY', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchEcho({commit}) {
  try {
    const res = await $http.get('/echos/get');
    if (res.data.status) {
      commit('SET_ECHO', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchEchoBaby({commit}) {
  try {
    const res = await $http.get('/echo-babies/get');
    if (res.data.status) {
      commit('SET_ECHO_BABY', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchEchoBabyByID({commit}, id) {
  try {
    const res = await $http.get('/echo-babies/'+id+'/get');
    if (res.data.status) {
      commit('SET_ECHO_BABY_BY_ID', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

