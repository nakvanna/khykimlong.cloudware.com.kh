import $http from "boot/token_request";

export async function storeDocument ({commit},data) {
  try {
    console.log(data)
    const res = await $http.post('/documents', data);
    if (res.data.status) {
      // commit('STORE_BLOG', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchDocument ({commit}) {
  try {
    const res = await $http.get('/documents');
    if (res.data.status) {
      // commit('SET_BLOG', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function editDocument ({commit},id) {
  try {
    const res = await $http.get('/documents/'+id+'/edit');
    if (res.data.status) {
      return res.data
    }
  } catch (e) {
    return false
  }
}
export async function updateDocument({commit}, data) {
  try {
    const res = await $http.put('/documents/'+data._id+'/update', data);
    if (res.data.status) {
      // commit('UPDATE_BLOG', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
