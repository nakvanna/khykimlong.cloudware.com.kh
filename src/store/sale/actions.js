import $http from "boot/token_request";

export async function storeSale({commit}, data) {
  try {
    const res = await $http.post('/sales', data);
    return res.data;
  } catch (e) {
    return false
  }
}
export async function storeSaleDetail({commit}, data) {
  try {
    const res = await $http.post('/sale-details', data);
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchSale({commit}) {
  try {
    const res = await $http.get('/sales/get');
    if (res.data.status) {
      commit('SET_SALE', res.data)
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchSaleByPatient({commit}, patient_id) {
  try {
    const res = await $http.get('/sales/'+patient_id+'/get-by-patient');
    // if (res.data.status) {
    //   commit('SET_SALE', res.data)
    // }
    return res.data
  } catch (e) {
    return false
  }
}
export async function viewSale({commit}, id) {
  try {
    const res = await $http.get('/sales/' + id + '/view');
    if (res.data.status) {
      return res.data
    }
  } catch (e) {
    return false
  }
}
export async function fetchSaleDetailBySale({commit}, id) {
  try {
    const res = await $http.get('/sale-details/' + id + '/get');
    if (res.data.status) {
    }
    return res.data
  } catch (e) {
    return false
  }
}
//Fetch sale after loop all detail
export async function fetchSaleAfterDetail({commit}, id) {
  try {
    const res = await $http.get('/sales/' + id + '/get-after');
    if (res.data.status) {
      commit('STORE_SALE', res.data)
    }
    return res.data
  } catch (e) {
    return false
  }
}
//Edit for pending only
export async function editSale({commit}, id) {
  try {
    const res = await $http.get('/sales/' + id + '/edit');
    if (res.data.status) {

    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function deleteSaleDetail({commit}, id) {
  try {
    const res = await $http.delete('/sale-details/' + id + '/delete');
    return res.data;
  } catch (e) {
    return false;
  }
}
export async function updateSale({commit}, data) {
  try {
    const res = await $http.put('/sales/' + data._id + '/update', data);
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchSaleByDate({commit}, data) {
  try {
    const res = await $http.post('/sales/get/by-date', data);
    console.log(res.data);
    if (res.data.status) {
      commit('SET_SALE_BY_DATE', res.data);
    }
    return res.data;
  } catch (e) {
    return false;
  }
}
export async function fetchSaleByExamination({commit}, id) {
  try {
    const res = await $http.get('/sales/'+id+'/get/by-examination');
    if (res.data.status) {
      commit('SET_SALE_BY_EXAMINE', res.data);
    }
    return res.data;
  }catch (e) {
    return  false;
  }
}
