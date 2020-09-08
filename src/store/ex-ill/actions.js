import $http from "boot/token_request";

//CRUD
//CREATE
export async function storeExIll({commit}, data) {
  try {
    const res = await $http.post('/ex-ills', data);
    if (res.data.status) {
      commit('STORE_EX_ILL', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

//READ
export async function fetchExIll({commit}) {
  try {
    const res = await $http.get('/ex-ills');
    if (res.data.status) {
      commit('SET_EX_ILL', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

//UPDATE
export async function updateExIll({commit}, data) {
  try {
    const res = await $http.put('/ex-ills/' + data.id, data.data);
    if (res.data.status) {
      commit('UPDATE_EX_ILL', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

//DELETE
export async function deleteExIll({commit}, id) {
  try {
    const res = await $http.delete('/ex-ills/' + id + '/delete');
    if (res.data.status) {
      commit('DELETE_EX_ILL', id);
    }
    return res.data
  } catch (e) {
    return false
  }
}
