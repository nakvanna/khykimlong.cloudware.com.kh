import $http from "boot/token_request";

//Product type
export async function storeProductType ({commit}, data) {
  try {
    const res = await $http.post('/product-types', data);
    if (res.data.status) {
      commit('STORE_PRODUCT_TYPE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchProductType({commit}) {
  try {
    const res = await $http.get('/product-types/get');
    if (res.data.status){
      commit('SET_PRODUCT_TYPE', res.data)
    }
    return res.data
  }catch (e) {
    return false
  }
}

//Unit type
export async function storeUnitType ({commit}, data) {
  try {
    const res = await $http.post('/unit-types', data);
    if (res.data.status) {
      commit('STORE_UNIT_TYPE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchUnitType({commit}) {
  try {
    const res = await $http.get('/unit-types/get');
    if (res.data.status){
      commit('SET_UNIT_TYPE', res.data)
    }
    return res.data
  }catch (e) {
    return false
  }
}
//Product
export async function storeProduct ({commit}, data) {
  try {
    const res = await $http.post('/products', data);
    if (res.data.status) {
      commit('STORE_PRODUCT', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchProduct({commit}) {
  try {
    const res = await $http.get('/products/get');
    if (res.data.status){
      commit('SET_PRODUCT', res.data)
    }
    return res.data
  }catch (e) {
    return false
  }
}
export async function editProduct ({commit}, id) {
  try {
    const res = await $http.get('/products/'+id+'/edit');
    if (res.data.status) {
      return res.data
    }
  } catch (e) {
    return false
  }
}
export async function updateProduct({commit}, data) {
  try {
    const res = await $http.put('/products/'+data.id+'/update', data.data);
    if (res.data.status) {
      commit('UPDATE_PRODUCT', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateProductThumbnail ({commit},data) {
  let thumbnail = new FormData();
  thumbnail.set('photo',data.get('photo'))
  try {
    const res = await $http.put('/products/'+data.get('id')+'/thumbnail',thumbnail);
    if (res.data.status) {
      commit('UPDATE_PRODUCT', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
