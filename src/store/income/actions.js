import $http from "boot/token_request";

export async function storeIncome ({commit}, data) {
  try {
    const res = await $http.post('/incomes', data);
    if (res.data.status) {
      commit('STORE_INCOME', res.data);
    }
    return res.data
  }catch (e) {
    return false
  }
}
export async function fetchIncome({commit}) {
  try {
    const res = await $http.get('/incomes/get');
    if (res.data.status){
      commit('SET_INCOME', res.data)
    }
    return res.data
  }catch (e) {
    return false
  }
}
export async function fetchIncomeByDate({commit}, date) {
  try {
    const res = await $http.post('/incomes/get/by-date', date);
    if(res.data.status){
      commit('SET_INCOME_BY_DATE', res.data);
    }
    return res.data
  }catch (e) {
    return false
  }
}
