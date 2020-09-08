export function SET_ECHO_NOTE(state, payload) {
  state.echo_notes = payload.data;
}

export function STORE_ECHO_NOTE(state, payload) {
  state.echo_notes.unshift(payload.data)
}
