/**
 * 项目使用前后端分离，为以后修改提供便利，所以在这里定义一些与服务器交互的常量，
 * 主要包括服务器地址，服务器端口，以及上下文根等
 */

const HTTP_PREFIX = "http://";
// const HTTP_PREFIX = "https://";

const SERVER_IP = "127.0.0.1";	//后台系统的服务器ip
const SERVER_PORT = "8888";		//后台系统的服务端口
const SERVER_CONTEXT = "";		//后台系统的服务上下文根

//因为当前的前端和后台部署在同一个服务上，所以地址是一样的，这里暂时通过获取当前的访问路径，来获取这个系统服务地址
var currentDomain = document.domain;

const SERVER_URL = HTTP_PREFIX + currentDomain+":"+SERVER_PORT+SERVER_CONTEXT;
let server = {
    serverUrl: SERVER_URL,
    serverAddr: SERVER_IP,
    serverPort: SERVER_PORT
};

export default server;