import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
})

console.log(import.meta.env.VITE_SERVER_URL);

axiosInstance.interceptors.request.use(config => {
    const accessToken = JSON.parse(sessionStorage.getItem('accessToken')) || ''

    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
}, (error) => Promise.reject(error))

export default axiosInstance