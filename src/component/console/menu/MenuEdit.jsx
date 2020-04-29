
import React, { Component } from 'react';
import { Modal, Form, Input, TreeSelect, Select,InputNumber} from 'antd';

import http from '../../../axios/http';
import validator from '../../../util/validator';

import DictSelect from '../../ui/DictSelect';

const FormItem = Form.Item;

class MenuEditForm extends Component {

    save = () => {
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const {editData} = this.props;
            values["level"] = editData.level;
            if(editData.state != null) {
                values["state"] = editData.state;
            }
            if(editData.id != null) {
                values["id"] = editData.id;
            }
            http.post({
                url: '/menu/saveMenu',
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
        const {data} = this.props.orgTree();
        return (
            <Modal
                visible={visible}
                title="菜单编辑"
                okText="保存"
                cancelText="取消"
                maskClosable={false}
                onCancel={onCancel}
                onOk={this.save}
                afterClose={() => { this.props.form.resetFields() }}
            >
                <Form layout="vertical" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <FormItem label="上级菜单：">
                        {getFieldDecorator('parentCode', {
                            initialValue: editData.parentCode
                        })(
                            <TreeSelect 
                                //treeCheckable={true} 
                                treeData={data} 
                                treeDefaultExpandAll={true}
                                //treeCheckStrictly={true}
                                //labelInValue={false}
                            />
                        )}
                    </FormItem>
                    <FormItem label="菜单类型：">
                        {getFieldDecorator('type', {
                            initialValue: editData.type==null? '1':''+editData.type,
                        })(
                            <Select>
                                <Select.Option key='1'>菜单</Select.Option>
                                <Select.Option key='0'>功能</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="菜单编码：">
                        {getFieldDecorator('code', {
                            rules: [
                                { required: true, message: '请输入菜单编码名称!' },
                                validator.lineEnNum,
                                { max: 16, message: '最多只能输入16个字符！' }],
                            initialValue: editData.code,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="菜单名称：">
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入菜单名称!' },
                                { max: 16, message: '最多只能输入16个字符！' }],
                            initialValue: editData.name,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="权限类型：">
                        {getFieldDecorator('authType', {
                            initialValue: editData.authType==null? '1':''+editData.authType,
                        })(
                            <Select>
                                <Select.Option key='1'>需要配权</Select.Option>
                                <Select.Option key='0'>无需权限</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="菜单功能：">
                        {getFieldDecorator('func', {
                            rules: [
                                { max: 128, message: '最多只能输入128个字符！' }],
                            initialValue: editData.func,
                        })(
                            <DictSelect category='BUTTON' />
                        )}
                    </FormItem>
                    <FormItem label="接口路径：">
                        {getFieldDecorator('mapping', {
                            rules: [
                                { max: 128, message: '最多只能输入128个字符！' }],
                            initialValue: editData.mapping,
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

const MenuEdit = Form.create()(MenuEditForm);

export default MenuEdit;