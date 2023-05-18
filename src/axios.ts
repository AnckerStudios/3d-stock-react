import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080'
})

instance.interceptors.request.use((config)=>{
    let t = window.localStorage.getItem('token')
    console.log("t",t);
    if(t){
        config.headers.Authorization = 'Bearer '+t;
    }
    
    return config;
})
export default instance;