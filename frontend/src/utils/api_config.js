import { Api } from "./Api.js";


export const apiHost = 'https://api.felitset-1991.nomoredomains.rocks'

export const authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M2YzU3NTc3OTQwOGVjNTc4ZGU0MDUiLCJpYXQiOjE2NzM5NzExNjUsImV4cCI6MTY3NDU3NTk2NX0.9uGVHeeKWd2yJnOcZoUx5tQyovNCtaX6NcNIFpMkD6M'

const api = new Api(apiHost, authToken);


export default api;
