import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

//登录界面
import Login from './component/common/Login';
//页面路由界面
import MainRoute from './route/MainRoute'




// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import moment from 'moment';
import 'moment/locale/zh-cn';
import "antd/dist/antd.css";
//import "./index.css";

// import "@babel/polyfill";
//import "core-js";

moment.locale('zh-cn');
//判断登录状态，如果是已经登录的就不需要再登录了，直接进入主页
if(sessionStorage.getItem("loginStatus") === "true"){
    ReactDOM.render(<MainRoute />, document.getElementById('root'));
}else{
    ReactDOM.render(<Login />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
