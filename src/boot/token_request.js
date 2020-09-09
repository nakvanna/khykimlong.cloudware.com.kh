import { LocalStorage } from 'quasar'
import axios from 'axios'
let $http = axios.create({
  baseURL: 'https://api.khykimlong.cloudware.com.kh/'
  // baseURL: 'http://localhost:9000/'
});
let token = LocalStorage.getItem("userInfo");
if (token) {
  $http.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
}
export default $http;
