import $http from "boot/token_request";

export async function storeExamine({commit}, data) {
  try {
    const res = await $http.post('/examines', data);
    if (res.data.status) {
      commit('STORE_EXAMINE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchExamine({commit}, data) {
  try {
    const res = await $http.get('/examines/get', data);
    if (res.data.status) {
      commit('SET_EXAMINE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchExamineByID({commit}, id) {
  try {
    const res = await $http.get('/examines/' + id + '/get');
    if (res.data.status) {
      commit('SET_EXAMINE_BY_ID', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateStayExamine({commit}, data) {
  try {
    const res = await $http.put('/examines/stay/' + data.examine_id + '/update', {room_id: data.room_id});
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateExamine({commit}, data) {
  try {
    const res = await $http.put('/examines/' + data.id + '/update', data.data);
    if (res.data.status) {
      commit('UPDATE_EXAMINE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
