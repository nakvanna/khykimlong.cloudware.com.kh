export function SET_ECHO_SETTING (state, payload) {
  state.echo_settings = payload.data
}
export function STORE_ECHO_SETTING (state, payload) {
  state.echo_settings.push(payload.data)
}
