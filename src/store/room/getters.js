export function getRooms (state) {
  return state.rooms
}
export function getFreeRoom (state) {
  return state.rooms.filter((x)=>{
    return x.status === false
  })
}
