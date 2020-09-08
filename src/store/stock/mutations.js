export function STORE_STOCK (state, payload) {
  state.stocks.push(payload.data)
}
export function SET_STOCK_BY_DATE(state, payload) {
  state.stocks_by_date = payload.data
}
// export function STORE_STOCK_DETAIL (state, payload) {
//   state.stock_details.push(payload.data)
// }
export function SET_STOCK(state, payload) {
  state.stocks = payload.data
}
export function SET_STOCK_DETAIL(state, payload) {
  state.stock_details = payload.data
}
export function SET_STOCK_DETAIL_FOR_SALE(state, payload){
  state.stock_detail_sales = payload.data
}
export function SET_STOCK_DETAIL_FOR_REPORT(state, payload) {
  state.stock_detail_for_report = payload.data
}
export function UPDATE_STOCK(state, payload) {
  let index = state.stocks.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.stocks.splice(index,1,payload.data)
}
// export function SET_STOCK_PAY_BACK(state, payload) {
//   state.stock_pay_back = payload.data;
// }
// export function STORE_STOCK_PAY_BACK(state, payload) {
//   state.stock_pay_back.push(payload.data);
// }
