export function STORE_PATIENT(state, payload) {
  state.patients.push(payload.data);
}

export function SET_PATIENT(state, payload) {
  state.patients = payload.data;
}

export function UPDATE_PATIENT(state, payload) {
  let index = state.patients.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.patients.splice(index, 1, payload.data)
}

//==================//

export function STORE_PATIENT_DETAIL(state, payload) {
  state.patient_details.push(payload.data);
}

export function SET_PATIENT_DETAIL(state, payload) {
  state.patient_details = payload.data;
}
