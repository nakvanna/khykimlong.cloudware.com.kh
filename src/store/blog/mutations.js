export function STORE_BLOG(state, payload) {
  state.blogs.push(payload.data);
}
export function UPDATE_BLOG(state, payload) {
  let index = state.blogs.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.blogs.splice(index,1,payload.data)
}
export function SET_BLOG(state, payload) {
  state.blogs = payload.data;
}

