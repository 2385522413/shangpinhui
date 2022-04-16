import axios from "axios";

//引入进度条
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

import store from '../store/index';
const requests = axios.create({
    //基础路径
    baseURL: "/api",
    //请求不能超过5S
    timeout: 5000,
});

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config)=>{
    //进度条开始
    nprogress.start();

    if(store.state.detail.uuid_token){
        //请求头添加一个字段(userTempId):和后台商量好了
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    return config;
})

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done();

 //成功的回调函数
    return res.data;
},(error)=>{
    //失败
    return Promise.reject(new Error('faile'))
})

export default requests;
