import $http from "boot/token_request";

export async function storeSupplier ({commit}, data) {
  try {
    const res = await $http.post('/suppliers', data);
    if (res.data.status) {
      commit('STORE_SUPPLIER', res.data);
    }
    return res.data
  }catch (e) {
    return false
  }
}
export async function fetchSupplier({commit}) {
  try {
    const res = await $http.get('/suppliers/get');
    if (res.data.status){
      commit('SET_SUPPLIER', res.data)
    }
    return res.data
  }catch (e) {
    return false
  }
}
