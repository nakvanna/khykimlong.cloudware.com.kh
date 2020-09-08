export function STORE_SALE(state, payload) {
  let index = state.sales.findIndex(function (x) {
    return x._id === payload.data._id;
  });
  if (index === -1) {
    state.sales.unshift(payload.data)
  } else {
    state.sales.splice(index, 1, payload.data);
  }
}

export function SET_SALE(state, payload) {
  state.sales = payload.data
}

export function SET_SALE_BY_DATE(state, payload) {
  state.sale_by_date = payload.data
}

export function SET_SALE_BY_EXAMINE(state, payload) {
  state.sale_by_examine = payload.data
}
