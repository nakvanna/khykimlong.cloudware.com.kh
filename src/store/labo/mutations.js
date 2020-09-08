export function STORE_LABO (state, payload) {
  state.labos.push(payload.data)
}
export function SET_LABO (state, payload) {
  state.labos = payload.data
}
export function UPDATE_LABO(state, payload) {
  let index = state.labos.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.labos.splice(index,1,payload.data)
}
