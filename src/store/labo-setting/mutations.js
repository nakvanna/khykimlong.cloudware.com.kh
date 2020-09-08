export function SET_LABO_SETTING (state, payload) {
  state.labo_settings = payload.data
}
export function STORE_LABO_SETTING (state, payload) {
  state.labo_settings.push(payload.data)
}
export function UPDATE_LABO_SETTING(state, payload) {
  let index = state.labo_settings.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.labo_settings.splice(index,1,payload.data)
}
