import $http from '../../boot/token_request'

export async function storePatient({commit}, data) {
  try {
    const res = await $http.post('/patients', data);
    if (res.data.status) {
      commit('STORE_PATIENT', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchPatient({commit}) {
  try {
    const res = await $http.get('/patients/get');
    if (res.data.status) {
      commit('SET_PATIENT', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function editPatient({commit}, id) {
  try {
    const res = await $http.get('/patients/' + id + '/edit');
    if (res.data.status) {
      return res.data
    }
  } catch (e) {
    return false
  }
}

export async function updatePatient({commit}, data) {
  try {
    const res = await $http.put('/patients/' + data.id + '/update', data.data);
    if (res.data.status) {
      commit('UPDATE_PATIENT', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updatePatientThumbnail({commit}, data) {
  let thumbnail = new FormData();
  thumbnail.set('photo', data.get('photo'))
  try {
    const res = await $http.put('/patients/' + data.get('id') + '/thumbnail', thumbnail);
    if (res.data.status) {
      commit('UPDATE_PATIENT', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

//==============================//

export async function storePatientDetail({commit}, data) {
  try {
    const res = await $http.post('/patient-details', data);
    if (res.data.status) {
      commit('STORE_PATIENT_DETAIL', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchPatientDetail({commit}, id) {
  try {
    const res = await $http.get('/patient-details/' + id + '/get');
    return res.data
  } catch (e) {
    return false
  }
}
