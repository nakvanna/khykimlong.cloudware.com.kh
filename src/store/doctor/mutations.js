//CRUD
//CREATE
export function STORE_DOCTOR(state, payload) {
  state.doctors.unshift(payload.data)
}
//READ
export function SET_DOCTOR(state, payload) {
  state.doctors = payload.data
}
//UPDATE
export function UPDATE_DOCTOR(state, payload) {
  let index = state.doctors.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.doctors.splice(index,1,payload.data)
}
//DELETE
export function DELETE_DOCTOR(state, id) {
  state.doctors = state.doctors.filter(function (x) {
    return x._id !== id
  })
}
