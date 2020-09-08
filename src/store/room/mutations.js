export function STORE_ROOM(state, payload) {
  state.rooms.push(payload.data)
}

export function SET_ROOM(state, payload) {
  state.rooms = payload.data
}

export function UPDATE_ROOM(state, payload) {
  let index = state.rooms.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.rooms.splice(index, 1, payload.data)
}
