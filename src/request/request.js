import axios from 'axios'
import qs from 'qs'
import {
    Message,
    Loading
} from 'element-ui'

let loadingInstance = null;
let count = 0;
const instance = axios.create({
    timeout: 5000, // 设置超时时间
})

// 请求前拦截
instance.interceptors.request.use(config => {
    if (count == 0) {
        loadingInstance = Loading.service({
            target: '.content',
            text: '加载中'
        })
    }
    count++;

    const token = localStorage.getItem('token');
    if (config.method === 'post' || config.method === 'put') {
        if (token) {
            config.data = config.data || {};
            config.data.token = token;
        }
        config.data = qs.stringify(config.data, {
            allowDots: true,
            arrayFormat: 'repeat'
        });
    } else if (config.method === 'get' || config.method === 'delete') {
        if (token) {
            config.params = config.params || {};
            config.params.token = token;
            config.url += '?' + (qs.stringify(config.params, {
                arrayFormat: 'repeat'
            }))
            delete config.params
        }
    }
    return config;
}, err => {
    count--;
    if (count == 0) {
        loadingInstance.close();
    }
    return Promise.reject(err);
})

// 返回结果拦截
instance.interceptors.response.use(result => {
    count--;
    if (count == 0) {
        loadingInstance.close();
    }

    if (result.data && !result.data.success) {
        Message({
            type: 'error',
            message: result.data.msg
        })
    }
    return result.data;
}, err => {
    count--;
    if (count == 0) {
        loadingInstance.close();
    }
    return Promise.reject(err);
})


export default instance;