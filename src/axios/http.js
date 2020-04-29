import axios from 'axios';
import qs from 'querystring';

//引入消息提示相关组件
import messager from '../component/ui/messager';
//引入后台服务器相关的配置
import server from './server';

let http = {
    request: "",
    post: "",
    get: ""
}

var $axios = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //'Content-Type': 'application/json;charset=UTF-8'
    },
});

/**
 * post 请求
 */
http.post = function(options){
    let url = options.url;
    if(url == null || url === "") return;
    if(url.startsWith("http://") || url.startsWith("https://")){
        //如果路径已经包含了http，说明传入的已经是完整的访问地址，不需要再添加默认定义的系统地址
    }else{
        url = server.serverUrl + url;
    }
    let data = options.data;
    let params = qs.stringify(data);
    $axios.post(url, params)
        .then(
            (response) => axiosCallback(response,options)
        )
        .catch(
            (error) => {
                if(error.response === undefined || error.response == null){
                    error.response = {data:{message:error.message}};
                }
                axiosCallback(error.response,options)
            }
        )
    ;
}

http.download = function(options){
    let url = options.url;
    if(url == null || url === "") return;
    if(url.startsWith("http://") || url.startsWith("https://")){
        //如果路径已经包含了http，说明传入的已经是完整的访问地址，不需要再添加默认定义的系统地址
    }else{
        url = server.serverUrl + url;
    }
    let data = options.data;
    let params = qs.stringify(data);
    $axios.post(url,params,{
        responseType: 'blob'    // 设置响应数据类型
    })
    .then(res=>{
        if (res.status === 200) {
            // let fileName = res.headers['content-disposition'].split(';')[1].split('=')[1];
            // let contentType = res.headers['content-type'].split(';')[0];
            // let blob = new Blob([res.data],{type:contentType});
            let blob = new Blob([res.data]);
            // for ie 10+
            if (window.navigator.msSaveBlob) {
                window.navigator.msSaveOrOpenBlob(blob, options.fileName);
            }else{
                //google
                let elink = document.createElement('a');
                elink.href = URL.createObjectURL(blob);
                elink.download = options.fileName;
                document.body.appendChild(elink);
                elink.click()
                URL.revokeObjectURL(elink.href);
                document.body.removeChild(elink);
            }
        }
        if(options.success){
            options.success();
        }
    })
}

/**
 * get 请求
 */
http.get = function(options){
    let url = options.url;
    if(url == null || url === "") return;
    let data = options.data;
    let params = qs.stringify(data);
    $axios.get(url, params)
        .then(
            (response) => axiosCallback(response,options)
        )
        .catch(
            (error) => {
                if(error.response === undefined || error.response == null){
                    error.response = {data:{message:error.message}};
                }
                axiosCallback(error.response,options)
            }
        )
    ;
}

/**
 * 返回结果处理
 * @param {*} response 请求返回的结果信息
 * @param {*} options 调用请求时的参数
 */
let axiosCallback = function(response, options){
    let res = response.data;
    if(res === undefined || res == null){ messager.alert("返回信息异常！","异常","error"); }
    if((response.status === 200 || response.status === "200") && (res.code === "200" || res.code === 200)) {
        //说明返回的是正常
        //后端默认返回返回200表示这次请求成功
        if(options.success){
            options.success(res.data);
        }
        return;
    }
    //现在后端会将异常统一处理，然后封装异常信息返回。一般情况下不会进入这个方法，如果进入这个方法，开发过程中要处理掉。
    if(res.code === "403" || res.code === 403){
        //返回说明用户还未登录，并且当前返回的路径需要登录。所以跳转到登录页面
        sessionStorage.removeItem("loginStatus");
        window.location.href = '/';
    }else{
        if(options.error){
            options.error(res.message);
        }else{
            messager.alert(res.message,"异常","error");
        }
    }
}

export default http;