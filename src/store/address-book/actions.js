import $http from '../../boot/token_request'

export async function storeAddressBook({commit}, data) {
  try {
    const res = await $http.post('/address-books', data);
    if (res.data.status) {
      commit('STORE_ADDRESS_BOOK', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchAddressBook({commit}) {
  try {
    const res = await $http.get('/address-books');
    if (res.data.status) {
      commit('SET_ADDRESS_BOOK', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function storeProvince({commit}, data) {
  try {
    const res = await $http.post('/address-books/province', data);
    if (res.data.status) {
      commit('STORE_PROVINCE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchProvince({commit}) {
  try {
    const res = await $http.get('/address-books/province');
    if (res.data.status) {
      commit('SET_PROVINCE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function storeDistrict({commit}, data) {
  try {
    const res = await $http.post('/address-books/district', data);
    if (res.data.status) {
      commit('STORE_DISTRICT', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchDistrict({commit}) {
  try {
    const res = await $http.get('/address-books/district');
    if (res.data.status) {
      commit('SET_DISTRICT', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function storeCommune({commit}, data) {
  try {
    const res = await $http.post('/address-books/commune', data);
    if (res.data.status) {
      commit('STORE_COMMUNE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchCommune({commit}) {
  try {
    const res = await $http.get('/address-books/commune');
    if (res.data.status) {
      commit('SET_COMMUNE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function storeVillage({commit}, data) {
  try {
    const res = await $http.post('/address-books/village', data);
    if (res.data.status) {
      commit('STORE_VILLAGE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchVillage({commit}) {
  try {
    const res = await $http.get('/address-books/village');
    if (res.data.status) {
      commit('SET_VILLAGE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
