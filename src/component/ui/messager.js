/**
 * 消息提示
 * 2019-04-29   Joker Chen
 */
import { Modal, notification} from 'antd';

let messager = {
    alert: "",
    notify: "",
    confirm: ""
};

/**
 * 消息提示
 * @param message 提示的消息
 * @param title 消息标题    default '提示'
 * @param type 消息类型， 'success':'成功','info':'提醒','warning':警告,'error':'失败'， default 'info'
 * @param okCallback    确定之后的回调函数
 */
messager.alert = function(message, title, type, okCallback){
    if(title === undefined || title === null){
        title = '提示';
    }
    if(type === undefined || type === null || type === ''){
        type = 'info';
    }
    Modal[type]({
        title: title,
        content: (
            message
        ),
        okText: '确定',
        onOk:() =>{
            if(okCallback) {
                okCallback();
            }
        }
    });
}

/**
 * 消息提示
 * @param message 提示的消息
 * @param title 消息标题    default '提示'
 * @param type 消息类型， 'success':'成功','info':'提醒','warning':警告,'error':'失败'， default 'info'
 * @param duration  显示多久之后消失
 */
messager.notify = function(message, title, type, duration) {
    if(title === undefined || title === null){
        title = '提示';
    }
    if(type === undefined || type === null || type === ''){
        type = 'info';
    }
    if(duration === undefined || duration === null || duration === ""){
        duration = 4;
    }
    notification[type]({
        message: title,
        description: message,
        duration: duration
    });
}



/**
 * 消息提示
 * @param message 提示的消息
 * @param okCallback 点击确定的回调函数
 * @param cancelCallbak 点击取消的回调函数
 * @param title 消息标题    default '提示'
 */  
messager.confirm = function(message, okCallback, cancelCallbak, title){
    if(title === undefined || title === null){
        title = '提示';
    }
    Modal.confirm({
        title: title,
        content: message,
        okText: '确定',
        cancelText: '取消',
        onOk: function() {
            if(okCallback) {
                okCallback();
            }
        },
        onCancel: function() {
            if(cancelCallbak) {
                cancelCallbak();
            }
        }
    });
}


export default messager;