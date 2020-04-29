
import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

import http from '../../../axios/http';

import messager from '../../ui/messager';

const FormItem = Form.Item;

class UserPasswordForm extends Component {

    save = () => {
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            http.post({
                url: '/user/updatePassword',
                data: values,
                success: (res) => {
                    messager.alert(
                        "密码修改成功，请重新登录！",
                        "提示",
                        "success",
                        ()=>{
                        this.props.onCancel();
                        this.props.successCallback();
                    });
                }
            });
        });
    };

    handleConfirmPassword = (rule, value, callback) => {
        const { getFieldValue } = this.props.form
        if (value && value !== getFieldValue('newPassword')) {
            callback('两次输入不一致！')
        }
        // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        callback()
    }

    render() {
        const { visible, onCancel, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="修改密码"
                okText="保存"
                cancelText="取消"
                maskClosable={false}
                onCancel={onCancel}
                onOk={this.save}
                afterClose={() => { this.props.form.resetFields() }}
            >
                <Form layout="vertical" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <FormItem label="旧密码：">
                        {getFieldDecorator('oldPassword', {
                            rules: [
                                { required: true, message: '请输入旧密码!' },
                                { max: 32, message: '密码长度不能多于32位！' },
                                // { min: 6, message: '密码长度不能少于6位！' }
                            ]
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <Form.Item label="新密码：" >
                        {getFieldDecorator('newPassword', {
                            rules: [
                                { required: true, message: '请输入新密码!' },
                                { max: 32, message: '密码长度不能多于32位！' },
                                // { min: 6, message: '密码长度不能少于6位！' }
                            ]
                        })(
                            <Input type="password" />
                        )}
                    </Form.Item>
                    <FormItem label="确认密码：">
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                { required: true, message: '请输入确认密码!' },
                                {validator: this.handleConfirmPassword}
                            ]
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const UserPassword = Form.create()(UserPasswordForm);

export default UserPassword;