export function SET_ECHO (state, payload) {
  state.echos = payload.data;
}
export function STORE_ECHO (state, payload) {
  state.echos.push(payload.data)
}
export function STORE_ECHO_BABY (state, payload) {
  state.echo_babies.push(payload.data)
}
export function SET_ECHO_BABY (state, payload) {
  state.echo_babies = payload.data;
}
export function SET_ECHO_BABY_BY_ID (state, payload) {
  state.echo_baby_by_id = payload.data;
}
