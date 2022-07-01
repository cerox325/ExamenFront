import axios from "axios-observable";


const axiosClient = axios.create({
    baseURL: 'https://pelisprotest.com'
})

export default axiosClient;