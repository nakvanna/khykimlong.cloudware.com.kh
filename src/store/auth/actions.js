import $http from '../../boot/token_request'

export async function login({commit}, data) {
  try {
    const res = await $http.post('/auths/login', data);
    if (res.data.status) {
      commit('LOGIN', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateUserData({commit}, data) {
  commit('UPDATE_USER_DATA', data);
}

export async function updateUserPassword({commit}, data) {
  try {
    console.log(data);
    const res = await $http.put(`/auths/user/${data.id}/update`, data.data);
    return res.data;
  } catch (e) {
    return false;
  }
}

export async function fetchUsers({}) {
  try {
    const res = await $http.get('/auths');
    return res.data;
  } catch (e) {
    return false;
  }
}
