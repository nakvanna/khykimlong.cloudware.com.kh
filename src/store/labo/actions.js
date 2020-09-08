import $http from "boot/token_request";
export async function storeLabo ({ commit }, data) {
  try {
    const res = await $http.post('/labos', data)
    if(res.data.status){
      commit('STORE_LABO', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchLabo({commit}) {
  try {
    const res = await $http.get('/labos/get');
    if (res.data.status) {
      commit('SET_LABO', res.data);
    }
    return res.data
  } catch (e) {

  }
}
export async function fetchLaboByID({commit}, id) {
  console.log(id)
  try {
    const res = await $http.get('/labos/'+id+'/edit');
    return res.data
  } catch (e) {

  }
}

export async function editLabo({ commit }, id) {
  try {
    const res = await $http.get('/labos/'+id+'/edit');
    if (res.data.status) {
      return res.data
    }
  } catch (e) {
    return false
  }
}
export async function updateLabo({commit}, data) {
  try {
    const res = await $http.put('/labos/'+data.id+'/update', data.data);
    if (res.data.status) {
      commit('UPDATE_LABO', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchLaboDetail({commit}, id) {
  try {
    const res = await $http.get('/labo-details/'+id+'/get');
    // if (res.data.status) {
    //   commit('SET_LABO', res.data);
    // }
    return res.data
  } catch (e) {

  }
}

export async function updateLaboDetail({commit}, data) {
  try {
    const res = await $http.put('/labos/detail/'+data.id+'/update', data.data);
    // if (res.data.status) {
    //   commit('UPDATE_LABO', res.data);
    // }
    return res.data
  } catch (e) {
    return false
  }
}

