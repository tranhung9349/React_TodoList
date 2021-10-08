import axios from "axios";
import * as queryString from "querystring";

const axiosClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => {queryString.stringify(params)},
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
})

axiosClient.interceptors.response.use((response)=> {
    if(response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;
