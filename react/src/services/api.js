import axios from "axios";

const api = axios.create({
    baseURL:"http://10.42.0.1:8000",
    withCredentials:true,
    withXSRFToken:true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si c'est une erreur 401, on la gère silencieusement
    if (error.response && error.response.status === 401) {
      return Promise.reject({ status: 401, message: 'Unauthenticated' });
    }
    return Promise.reject(error);
  }
);

export default api;