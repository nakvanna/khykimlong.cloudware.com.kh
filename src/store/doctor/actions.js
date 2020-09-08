import $http from "boot/token_request";

//CRUD
//CREATE
export async function storeDoctor({commit}, data) {
  console.log(data)
  try {
    const res = await $http.post('/doctors', data);
    if (res.data.status) {
      commit('STORE_DOCTOR', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

//READ
export async function fetchDoctor({commit}) {
  try {
    const res = await $http.get('/doctors');
    if (res.data.status) {
      commit('SET_DOCTOR', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

//UPDATE
export async function updateDoctor({commit}, data) {
  try {
    const res = await $http.put('/doctors/' + data.id, data.data);
    if (res.data.status) {
      commit('UPDATE_DOCTOR', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

//DELETE
export async function deleteDoctor({commit}, id) {
  try {
    const res = await $http.delete('/doctors/' + id + '/delete');
    if (res.data.status) {
      commit('DELETE_DOCTOR', id);
    }
    return res.data
  } catch (e) {
    return false
  }
}
