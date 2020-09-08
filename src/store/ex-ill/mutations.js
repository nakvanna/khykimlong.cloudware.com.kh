//CRUD
//CREATE
export function STORE_EX_ILL(state, payload) {
  state.ex_ills.unshift(payload.data)
}

//READ
export function SET_EX_ILL(state, payload) {
  state.ex_ills = payload.data
}

//UPDATE
export function UPDATE_EX_ILL(state, payload) {
  let index = state.ex_ills.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.ex_ills.splice(index, 1, payload.data)
}

//DELETE
export function DELETE_EX_ILL(state, id) {
  state.ex_ills = state.ex_ills.filter(function (x) {
    return x._id !== id
  })
}
