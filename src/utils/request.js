import axios from "axios";
import Cookie from 'js-cookie';
import router from '@/router/index'
// export const URL = "http://20.189.126.200:80/api/iecshowroom";
export const URL = "https://vrstate.inventec.com/api/vrhall"; // https证书专用地址
// export const URL = "http://localhost:8002";

// 封装一个axios实例
const http = axios.create({
    // 通用请求的地址前缀
    // baseURL: '/api',
    // baseURL: 'http://localhost:8002',
    // baseURL: 'http://20.189.126.200:80/api/iecshowroom', // linux后端服务
    baseURL: 'https://vrstate.inventec.com/api/vrhall',  // https证书专用地址
    // baseURL: 'http://localhost:8000/api/iecadmin',
    withCredentials: true, // 允许跨域携带cookie
    // 超时时间
    timeout: 100000
})


// 请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做什么
    const userid = sessionStorage.getItem('userid');
    const sessionid = sessionStorage.getItem('sessionid');
    config.headers['userid'] = userid;
    config.headers['sessionid'] = sessionid;
    return config;

}, function (error) {
    // 对请求错误做什么
    return Promise.reject(error);
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做什么
    if (response.data.code==401){
        Cookie.remove('token_iecshowroom')
        alert("會話失效請重新登錄");
        router.push('/login')
    }
    return response;
}, function (error) {
    // 对响应错误做什么
    if (error.response.status==401){
        Cookie.remove('token_iecshowroom');
        alert("會話失效請重新登錄");
        router.push('/login')
    }
    return Promise.reject(error);
})


export default http