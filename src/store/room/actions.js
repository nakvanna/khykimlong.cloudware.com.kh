import $http from "boot/token_request";

export async function storeRoom({commit}, data) {
  try {
    const res = await $http.post('/rooms', data);
    if (res.data.status) {
      commit('STORE_ROOM', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchRoom({commit}) {
  try {
    const res = await $http.get('/rooms/get');
    if (res.data.status) {
      commit('SET_ROOM', res.data)
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateToggle({commit}, data) {
  try {
    const res = await $http.put('/rooms/toggle/' + data._id + '/update', data);
    if (res.data.status) {
      commit('UPDATE_ROOM', res.data)
    }
    return res.data
  } catch (e) {
    console.log(e)
    return false
  }
}
