
import React, { Component } from 'react';
import { Modal, Form, Input, TreeSelect,InputNumber} from 'antd';

import http from '../../../axios/http';

const FormItem = Form.Item;

class OrgEditForm extends Component {

    save = () => {
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const {editData} = this.props;
            values["level"] = editData.level;
            values["code"] = editData.code;
            if(editData.state) {
                values["state"] = editData.state;
            }
            http.post({
                url: '/org/saveOrg',
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
        //this.setState({orgTree:this.props.orgTree()["data"]});
        return (
            <Modal
                visible={visible}
                title="组织机构编辑"
                okText="保存"
                cancelText="取消"
                maskClosable={false}
                onCancel={onCancel}
                onOk={this.save}
                afterClose={() => { this.props.form.resetFields() }}
            >
                <Form layout="vertical" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <FormItem label="上级组织：">
                        {getFieldDecorator('parentCode', {
                            initialValue: editData.parentCode
                        })(
                            <TreeSelect 
                                //treeCheckable={true} 
                                treeData={data} 
                                treeDefaultExpandAll={true}
                                //treeCheckStrictly={true}
                                //labelInValue={false}
                                disabled={editData.code !== undefined && editData.code != null}
                            />
                        )}
                    </FormItem>
                    <FormItem label="组织名称：">
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入组织名称!' },
                                { max: 16, message: '最多只能输入16个字符！' }],
                            initialValue: editData.name,
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

const OrgEdit = Form.create()(OrgEditForm);

export default OrgEdit;