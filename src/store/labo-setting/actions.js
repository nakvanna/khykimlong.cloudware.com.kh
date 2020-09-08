import $http from "boot/token_request";
export async function storeLaboSetting ({ commit }, data) {
  try {
    const res = await $http.post('/labo-settings', data);
    if(res.data.status){
      commit('STORE_LABO_SETTING', res.data)
    }
    return res.data
  } catch (e) {
    console.log(e)
  }
}
export async function fetchLaboSetting ({commit}) {
  try {
    const res = await $http.get('/labo-settings/get');
    if (res.data.status) {
      commit('SET_LABO_SETTING', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function editLaboSetting ({commit}, id) {
  try {
    const res = await $http.get('/labo-settings/'+id+'/get');
    return res.data
  } catch (e) {
    return false
  }
}
export async function updateLaboSetting({commit}, data) {
  console.log(data)
  try {
    const res = await $http.put('/labo-settings/'+data.id+'/update', data.data);
    if (res.data.status) {
      commit('UPDATE_LABO_SETTING', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

