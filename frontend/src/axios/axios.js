import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5000/api",
    withCredentials:true
})

export default api;
//every api request is sent through this, reduces code repetition 
