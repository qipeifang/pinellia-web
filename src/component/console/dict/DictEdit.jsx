
import React, { Component } from 'react';
import { Modal, Form, Input,InputNumber } from 'antd';

import http from '../../../axios/http';
import messager from '../../ui/messager';

const FormItem = Form.Item;

class DictEditForm extends Component {

    save = () => {
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let id = this.props.editData.id
            if( id !== undefined && id != null){
                values["id"] = id;
            }
            let state = this.props.editData.state
            if( state !== undefined && state != null){
                values["state"] = state;
            }
            let category = this.props.editData.category
            values["category"] = category;
            http.post({
                url: '/dict/saveDict',
                data: values,
                success: (res) =>{
                    this.props.successCallback({category:category});
                    this.props.onCancel();
                    messager.notify("保存成功！");
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
                title="字典编辑"
                okText="保存"
                cancelText="取消"
                maskClosable={false}
                onCancel={onCancel}
                onOk={this.save}
                afterClose={()=>{this.props.form.resetFields()}}
            >
                <Form layout="vertical" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <FormItem label="编码：">
                        {getFieldDecorator('code', {
                            rules: [
                                { required: true, message: '请输字典编码!'},
                                {max: 32, message:'最多只能输入32个字符！' }],
                            initialValue: editData.code,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="名称：">
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入字典名称!'},
                                {max: 32, message:'最多只能输入32个字符！' }],
                            initialValue: editData.name,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="说明：">
                        {getFieldDecorator('des', {
                            rules: [
                                {max: 64, message:'最多只能输入64个字符！' }],
                            initialValue: editData.des,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="显示顺序：">
                        {getFieldDecorator('sequence', {
                            rules: [
                                { required: true, message: '请输入显示顺序!' },
                            ],
                            initialValue: editData.sequence,
                        })(
                            <InputNumber min={0} max={999} style={{width:'100%'}}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const DictEdit = Form.create()(DictEditForm);

export default DictEdit;