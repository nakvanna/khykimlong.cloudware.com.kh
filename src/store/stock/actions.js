import $http from "boot/token_request";

export async function storeStock({commit}, data) {
  try {
    const res = await $http.post('/stocks', data);
    return res.data;
  } catch (e) {
    return false
  }
}

export async function storeStockDetail({commit}, data) {
  try {
    const res = await $http.post('/stock-details', data);
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchStock({commit}) {
  try {
    const res = await $http.get('/stocks/get');
    if (res.data.status) {
      commit('SET_STOCK', res.data)
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchStockByDate({commit}, data) {
  try {
    const res = await $http.post('/stocks/get/by-date', data);
    if (res.data.status) {
      commit('SET_STOCK_BY_DATE', res.data);
    }
    return res.data;
  } catch (e) {
    return false;
  }
}

//Fetch stock after loop all detail
export async function fetchStockAfterDetail({commit}, id) {
  try {
    const res = await $http.get('/stocks/' + id + '/get-after');
    if (res.data.status) {
      commit('STORE_STOCK', res.data)
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function editStock({commit}, id) {
  try {
    const res = await $http.get('/stocks/' + id + '/edit');
    if (res.data.status) {
      return res.data
    }
  } catch (e) {
    return false
  }
}

export async function viewStock({commit}, id) {
  try {
    const res = await $http.get('/stocks/' + id + '/view');
    if (res.data.status) {
      return res.data
    }
  } catch (e) {
    return false
  }
}

export async function fetchStockDetailByStock({commit}, id) {
  try {
    const res = await $http.get('/stock-details/' + id + '/get');
    if (res.data.status) {
      commit('SET_STOCK_DETAIL', res.data)
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchStockDetailForReport({commit}) {
  try {
    const res = await $http.get('/stock-details/get-report');
    if (res.data.status) {
      commit('SET_STOCK_DETAIL_FOR_REPORT', res.data)
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchStockDetailForSale({commit}) {
  try {
    const res = await $http.get('/stock-details/get-sale');
    if (res.data.status) {
      commit('SET_STOCK_DETAIL_FOR_SALE', res.data)
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateStock({commit}, data) {
  try {
    const res = await $http.put('/stocks/' + data._id + '/update', data);
    return res.data
  } catch (e) {
    return false
  }
}

export async function print({commit}) {
  return await $http.post('/pdf-make/stock');
}

export async function deleteStockDetail({commit}, id) {
  try {
    const res = await $http.delete('/stock-details/' + id + '/delete');
    return res.data;
  } catch (e) {
    return false;
  }
}

export async function stockPayBack({commit}, data) {
  try {
    const res = await $http.post('/stock-pay-backs', data);
    if (res.data.status) {
      commit('UPDATE_STOCK', res.data)
    }
    return res.data;
  } catch (e) {
    return false;
  }
}

export async function fetchStockPayBack({commit}, id) {
  try {
    const res = await $http.get('stock-pay-backs/' + id + '/get');
    return res.data;
  } catch (e) {
    return false
  }
}
