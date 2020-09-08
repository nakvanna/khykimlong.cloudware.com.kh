import $http from '../../boot/token_request'

export async function storeStaff({commit}, data) {
  try {
    const res = await $http.post('/staffs', data);
    if (res.data.status) {
      commit('STORE_STAFF', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateStaffThumbnail({commit}, data) {
  let thumbnail = new FormData();
  thumbnail.set('photo', data.get('photo'))
  try {
    const res = await $http.put('/staffs/' + data.get('id') + '/thumbnail', thumbnail);
    if (res.data.status) {
      commit('UPDATE_STAFF', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateStaff({commit}, data) {
  try {
    const res = await $http.put('/staffs/' + data.id + '/update', data.data);
    if (res.data.status) {
      commit('UPDATE_STAFF', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchStaff({commit}) {
  try {
    const res = await $http.get('/staffs/get');
    if (res.data.status) {
      commit('SET_STAFF', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function editStaff({commit}, id) {
  try {
    const res = await $http.get('/staffs/' + id + '/edit');
    return res.data;
  } catch (e) {
    return false
  }
}

export async function fetchStaffForSalary({commit}, id) {
  try {
    const res = await $http.get('staffs/' + id + '/salary');
    return res.data;
  } catch (e) {
    return false
  }
}

export async function storeStaffSalary({commit}, data) {
  try {
    const res = await $http.post('/staff-payrolls', data);
    if (res.data.status){
      commit('STORE_STAFF_SALARY', res.data);
    }
    return res.data;
  }catch (e) {
    return false;
  }
}
export async function fetchSalaryByStaff({commit}, id) {
  try {
    const res = await $http.get('/staff-payrolls/'+id+'/get/');
    if(res.data.status){
      commit('SET_STAFF_SALARY', res.data);
    }
    return res.data;
  }catch (e) {
    return false;
  }
}
export async function fetchSalaryStaffByDate({commit}, date) {
  try {
    const res = await $http.post('/staff-payrolls/get/by-date', date);
    if (res.data.status){
      commit('SET_STAFF_SALARY_BY_DATE', res.data);
    }
    return res.data;
  }catch (e) {
    return false
  }
}
