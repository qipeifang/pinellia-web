/**
 * 组织机构
 */
import React from 'react';

import { Button, Row, Col, Icon, Tooltip } from 'antd';

import PageLayout from '../../ui/PageLayout';

import OrgEdit from './OrgEdit';

import messager from '../../ui/messager';
import http from '../../../axios/http';

class OrgIndex extends React.Component {

    columns = [{
        title: '组织名称',
        dataIndex: 'name',
        width: '30%',
    }, {
        title: '状态',
        dataIndex: 'state',
        width: '30%',
        format: {0:'正常',1 :'删除', 2:'停用'}
    }, {
        title: '操作',
        dataIndex: 'id',
        width: '20%',
        render: (text, record, index) => (
            <div>
                <Tooltip title="修改">
                    <Icon type="edit" theme="filled" className="table-operate-icon" onClick={this.update.bind(this, record)} />
                </Tooltip>
                <Tooltip title="删除">
                    <Icon type="delete" theme="filled" className="table-operate-icon" onClick={this.delete.bind(this, record.code)} />
                </Tooltip>
                <Tooltip title="启用">
                    <Icon type="check-circle" theme="filled" className="table-operate-icon" onClick={this.enable.bind(this, record.code)} />
                </Tooltip>
                <Tooltip title="停用">
                    <Icon type="stop" theme="filled" className="table-operate-icon" onClick={this.disable.bind(this, record.code)} />
                </Tooltip>
            </div>
        )
    }];

    state = {
        visible: false,
        editData: {},
        loadData: '',
        getLoadData: ()=>{return {}}
    };

    add = () => {
        this.setState({ editData: {} });
        this.showModal();
    }

    showModal = () => {
        this.setState({ visible: true });
    };
    hiddenModal = () => {
        this.setState({ visible: false });
    };

    //修改
    update = (info, e) => {
        this.setState({ editData: info });
        this.showModal();
    }

    //删除
    delete = (info, e) => {
        messager.confirm("是否删除该组织及其下面的组织？", () => {
            http.post({
                url: '/org/deleteOrg',
                data: { code: info },
                success: (res) => {
                    this.state.loadData();
                    messager.notify("删除成功！");
                }
            });
        });
    }

    //启用
    enable = (info, e) => {
        messager.confirm("是否启用该组织？", () => {
            http.post({
                url: '/org/enableOrg',
                data: { code: info },
                success: (res) => {
                    this.state.loadData();
                    messager.notify("启用成功！");
                }
            });
        });
    }

    //停用
    disable = (info, e) => {
        messager.confirm("是否停用该组织及其下面的组织？", () => {
            http.post({
                url: '/org/disableOrg',
                data: { code: info },
                success: (res) => {
                    this.state.loadData();
                    messager.notify("停用成功！");
                }
            });
        });
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <PageLayout
                    condition={(
                        <Row>
                            <Col span={24} style={{ textAlign: "right" }}>
                                <Button type="primary" onClick={this.add}>新增</Button>
                            </Col>
                        </Row>
                    )}
                    rowKey="code" url="/org/findOrg"
                    columns={this.columns}
                    treeTable = {true}
                    page ={false}
                    defaultExpandAllRows = {true}
                    loadData={(func) => { this.setState({ loadData: func }) }}
                    getLoadData={(func) => {this.setState({ getLoadData: func }) }}
                />
                <OrgEdit
                    visible={this.state.visible}
                    onCancel={this.hiddenModal.bind(this)}
                    editData={this.state.editData}
                    successCallback={this.state.loadData}
                    orgTree = {this.state.getLoadData}
                />
            </div>
        )
    }
}

export default OrgIndex;