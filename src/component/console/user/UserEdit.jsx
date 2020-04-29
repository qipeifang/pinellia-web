
import React, { Component } from 'react';
import { Modal, Form, Input, TreeSelect, Select } from 'antd';

import http from '../../../axios/http';
import { treeDataConversion } from '../../ui/treeData';

const FormItem = Form.Item;

class UserEditForm extends Component {

    state = {
        orgTree: [],
        roleList: []
    }

    componentDidMount() {
        this.loadOrgTree();
        this.loadRoleList();
    }

    loadOrgTree = () => {
        http.post({
            url: '/auth/findOrgTree',
            success: (res) => {
                treeDataConversion(res);
                this.setState({ orgTree: res });
            }
        });
    }

    loadRoleList = () => {
        http.post({
            url: '/auth/findAuthRole',
            success: (res) => {
                this.setState({ roleList: res });
            }
        });

    }

    save = () => {
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let id = this.props.editData.id
            if (id !== undefined && id != null) {
                values["id"] = id;
            }
            http.post({
                url: '/user/saveUser',
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
                title="用户编辑"
                okText="保存"
                cancelText="取消"
                maskClosable={false}
                onCancel={onCancel}
                onOk={this.save}
                afterClose={() => { this.props.form.resetFields() }}
            >
                <Form layout="vertical" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <FormItem label="用户名：">
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '请输入角色名!' },
                                { max: 32, message: '最多只能输入32个字符！' }],
                            initialValue: editData.username,
                        })(
                            <Input disabled={editData.username !== undefined && editData.username != null} />
                        )}
                    </FormItem>
                    <Form.Item label="所属组织：" >
                        {getFieldDecorator('orgCode', {
                            initialValue: editData.orgCode,
                            rules: [{ required: true, message: '请选择组织!' }],
                        })(
                            <TreeSelect
                                //treeCheckable={true} 
                                multiple={true}
                                treeData={this.state.orgTree}
                                treeDefaultExpandAll={true}
                            //treeCheckStrictly={true}
                            //labelInValue={false}
                            />
                        )}
                    </Form.Item>
                    <FormItem label="角色信息：">
                        {getFieldDecorator('roleId',
                            editData.roleId == null ? {} : {
                                initialValue: editData.roleId,
                            }
                        )(
                            <Select
                                mode="multiple"
                            //treeCheckable={true} 
                            //treeData={this.state.menuTree} 
                            //treeDefaultExpandAll={true}
                            //showSearch={false}
                            //treeCheckStrictly={true}
                            >
                                {this.state.roleList.map(d => <Select.Option key={d.roleId}>{d.roleName}</Select.Option>)}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const UserEdit = Form.create()(UserEditForm);

export default UserEdit;