import $http from "boot/token_request";

export async function storeExpense ({commit}, data) {
  console.log(data)
  try {
    const res = await $http.post('/expenses', data);
    if (res.data.status) {
      commit('STORE_EXPENSE', res.data);
    }
    return res.data
  }catch (e) {
    return false
  }
}
export async function fetchExpense({commit}) {
  try {
    const res = await $http.get('/expenses/get');
    if (res.data.status){
      commit('SET_EXPENSE', res.data)
    }
    return res.data
  }catch (e) {
    return false
  }
}
export async function fetchExpenseByDate({commit}, date) {
  try {
    const res = await $http.post('/expenses/get/by-date', date);
    if(res.data.status){
      commit('SET_EXPENSE_BY_DATE', res.data);
    }
    return res.data
  }catch (e) {
    return false
  }
}
