
import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

import http from '../../../axios/http';

const FormItem = Form.Item;

class SysParamEditForm extends Component {

    save = () => {
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            http.post({
                url: '/sysParam/saveSysParam',
                data: values,
                success: (res) => {
                    this.props.successCallback();
                    this.props.onCancel();
                }
            });
        });
    };

    render() {
        const { visible, onCancel, form, editData } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="系统参数编辑"
                okText="保存"
                cancelText="取消"
                maskClosable={false}
                onCancel={onCancel}
                onOk={this.save}
                afterClose={() => { this.props.form.resetFields() }}
            >
                <Form layout="vertical" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <FormItem label="系统参数编码：">
                        {getFieldDecorator('code', {
                            rules: [
                                { required: true, message: '请输入角色名!' },
                                { max: 32, message: '最多只能输入32个字符！' }],
                            initialValue: editData.code,
                        })(
                            <Input disabled={editData.code !== undefined && editData.code != null} />
                        )}
                    </FormItem>
                    <FormItem label="系统参数名称：">
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入角色名!' },
                                { max: 64, message: '最多只能输入64个字符！' }],
                            initialValue: editData.name,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="系统参数值：">
                        {getFieldDecorator('value', {
                            rules: [
                                { required: true, message: '请输入角色名!' },
                                { max: 2048, message: '最多只能输入2048个字符！' }],
                            initialValue: editData.value,
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const SysParamEdit = Form.create()(SysParamEditForm);

export default SysParamEdit;