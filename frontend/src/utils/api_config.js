import { Api } from "./Api.js";
export const apiAuthHost = 'https://api.felitset-1991.nomoredomains.rocks';
const token = window.localStorage.getItem('jwt');

export const authToken = `Bearer ${token}`;

const api = new Api(apiAuthHost, authToken);

export default api;
