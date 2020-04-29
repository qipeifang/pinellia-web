
import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

import http from '../../../axios/http';
import validator from '../../../util/validator'
import messager from '../../ui/messager';

const FormItem = Form.Item;

class DictCategoryEditForm extends Component {

    state={
        orgTree : [],
        menuTree: []
    }


    save = () => {
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values["oldCategory"] = this.props.editData["category"];
            http.post({
                url: '/dict/saveCategory',
                data: values,
                success: (res) =>{
                    this.props.successCallback();
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
                title="字典类型编辑"
                okText="保存"
                cancelText="取消"
                maskClosable={false}
                onCancel={onCancel}
                onOk={this.save}
                afterClose={()=>{this.props.form.resetFields()}}
            >
                <Form layout="vertical" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <FormItem label="类型编码：">
                        {getFieldDecorator('category', {
                            rules: [
                                { required: true, message: '请输入类型编码!'},
                                validator.lineEn,
                                {max: 32, message:'最多只能输入32个字符！' }],
                            initialValue: editData.category,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="类型名称：">
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入类型名称!'},
                                {max: 32, message:'最多只能输入32个字符！' }],
                            initialValue: editData.name,
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const DictCategoryEdit = Form.create()(DictCategoryEditForm);

export default DictCategoryEdit;