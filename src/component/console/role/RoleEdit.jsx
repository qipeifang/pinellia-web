
import React, { Component } from 'react';
import { Modal, Form, Input, TreeSelect } from 'antd';

import http from '../../../axios/http';
import {treeDataConversion} from '../../ui/treeData';

const FormItem = Form.Item;

class RoleEditForm extends Component {

    state={
        orgTree : [],
        menuTree: []
    }

    componentDidMount() {
        this.loadOrgTree();
        this.loadMenuTree();
    }

    loadOrgTree = ()=>{
        http.post({
            url: '/auth/findOrgTree',
            success: (res) =>{
                treeDataConversion(res);
                this.setState({orgTree:res});
            }
        });
    }
    
    loadMenuTree = ()=>{
        http.post({
            url: '/auth/findUserMenu',
            success: (res) =>{
                treeDataConversion(res);
                this.setState({menuTree:res});
            }
        });

    }

    save = () => {
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let roleId = this.props.editData.roleId
            if( roleId !== undefined && roleId != null){
                values["roleId"] = roleId;
            }
            http.post({
                url: '/role/saveRole',
                data: values,
                success: (res) =>{
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
                title="角色编辑"
                okText="保存"
                cancelText="取消"
                maskClosable={false}
                onCancel={onCancel}
                onOk={this.save}
                afterClose={()=>{this.props.form.resetFields()}}
            >
                <Form layout="vertical" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <FormItem label="角色名称：">
                        {getFieldDecorator('roleName', {
                            rules: [
                                { required: true, message: '请输入角色名!'},
                                {max: 32, message:'最多只能输入32个字符！' }],
                            initialValue: editData.roleName,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <Form.Item label="所属组织：" >
                    {getFieldDecorator('orgCode', {
                        initialValue: editData.orgCode,
                        rules: [{ required: true, message: '请选择组织!' }],
                    })(
                        <TreeSelect 
                            //treeCheckable={true} 
                            treeData={this.state.orgTree} 
                            treeDefaultExpandAll={true}
                            //treeCheckStrictly={true}
                            //labelInValue={false}
                        />
                    )}
                    </Form.Item>
                    <FormItem label="授权菜单：">
                        {getFieldDecorator('menuCode',{
                            initialValue: editData.menuCode,
                        })(
                            <TreeSelect 
                                //treeCheckable={true} 
                                multiple={true}
                                treeData={this.state.menuTree} 
                                treeDefaultExpandAll={true}
                                showSearch={false}
                                //treeCheckStrictly={true}
                            />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const RoleEdit = Form.create()(RoleEditForm);

export default RoleEdit;