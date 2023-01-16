import { Api } from "./Api.js";


export const apiHost = 'https://nomoreparties.co/v1/cohort-50'

export const authToken = '029a79a7-8fba-4611-80b7-2d8ae6512fbe'

const api = new Api(apiHost, authToken);


export default api;
