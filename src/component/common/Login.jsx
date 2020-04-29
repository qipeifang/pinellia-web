/**
 * login page
 * 2019-04-28 Joker Chen
 */
import React from 'react';
// import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button } from 'antd';

import "../../style/common/login.css"

import http from '../../axios/http';
import messager from '../../component/ui/messager';
// import Index from './Index';

class Login extends React.Component {

    state = {
        rememberMe: false
    }

    componentDidMount() {
        let rememberMe = localStorage.getItem("rememberMe");
        if (rememberMe === "true") {
            let username = localStorage.getItem("username");
            let password = localStorage.getItem("password");
            this.setState({ rememberMe: true, password: password, username: username });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                http.post({
                    url: '/login',
                    data: values,
                    success: (res) => {
                        //登录成功，设置登录状态
                        sessionStorage.setItem("loginStatus", "true");

                        if(this.state.rememberMe){
                            //记住我的功能，暂时不开放
                            localStorage.setItem("rememberMe", this.state.rememberMe);
                            localStorage.setItem("username", values["username"]);
                            localStorage.setItem("password", values["password"]);
                        }

                        window.location.href = "/";
                        //ReactDOM.render(<Index />, document.getElementById('root'));
                    },
                    error: (res) => {
                        messager.alert(res, "登录失败", "error");
                    }
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (<div className="loginPage">
                    <div className="login">
                        <h2>登录</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名!' }],
                                    initialValue: this.state.username
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="用户名" />
                                )}
                            </Form.Item>
                            <Form.Item style={{ textAlign: 'right' }}>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码!' }],
                                    initialValue: this.state.password
                                })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />
                                )}
                                {/* <Checkbox checked={this.state.rememberMe} onChange={() => { this.setState({ rememberMe: !this.state.rememberMe }) }}>记住我</Checkbox> */}
                            </Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form>
                    </div>
                </div>)
            };
        }
        
export default Form.create()(Login);