/**
 * 菜单信息
 */
import React from 'react';

import { Button, Row, Col, Icon, Tooltip } from 'antd';

import PageLayout from '../../ui/PageLayout';

import MenuEdit from './MenuEdit';

import messager from '../../ui/messager';
import http from '../../../axios/http';

class MenuIndex extends React.Component {

    columns = [{
        title: '名称',
        dataIndex: 'name',
        width: '20%',
    }, {
        title: '编码',
        dataIndex: 'code',
        width: '10%',
    }, {
        title: '功能',
        dataIndex: 'func',
        width: '10%',
    }, {
        title: '接口',
        dataIndex: 'mapping',
        width: '20%',
    }, {
        title: '类型',
        dataIndex: 'type',
        width: '10%',
        format: {0:'功能',1 :'菜单'}
    }, {
        title: '权限类型',
        dataIndex: 'authType',
        width: '10%',
        format: {0:'无需权限',1 :'需要配权'}
    }, {
        title: '状态',
        dataIndex: 'state',
        width: '10%',
        format: {0:'正常',1 :'删除', 2:'停用'}
    }, {
        title: '操作',
        dataIndex: 'id',
        width: '15%',
        render: (text, record, index) => (
            <div>
                <Tooltip title="修改">
                    <Icon type="edit" theme="filled" className="table-operate-icon" onClick={this.update.bind(this, record)} />
                </Tooltip>
                <Tooltip title="删除">
                    <Icon type="delete" theme="filled" className="table-operate-icon" onClick={this.delete.bind(this, record.id)} />
                </Tooltip>
                <Tooltip title="启用">
                    <Icon type="check-circle" theme="filled" className="table-operate-icon" onClick={this.enable.bind(this, record.id)} />
                </Tooltip>
                <Tooltip title="停用">
                    <Icon type="stop" theme="filled" className="table-operate-icon" onClick={this.disable.bind(this, record.id)} />
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
        messager.confirm("是否删除该菜单？", () => {
            http.post({
                url: '/menu/deleteMenu',
                data: { id: info },
                success: (res) => {
                    this.state.loadData();
                    messager.notify("删除成功！");
                }
            });
        });
    }

    //启用
    enable = (info, e) => {
        messager.confirm("是否启用该菜单？", () => {
            http.post({
                url: '/menu/enableMenu',
                data: { id: info },
                success: (res) => {
                    this.state.loadData();
                    messager.notify("启用成功！");
                }
            });
        });
    }

    //停用
    disable = (info, e) => {
        messager.confirm("是否停用该菜单？", () => {
            http.post({
                url: '/menu/disableMenu',
                data: { id: info },
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
                    rowKey="id" url="/menu/findMenu"
                    columns={this.columns}
                    treeTable = {true}
                    page ={false}
                    defaultExpandAllRows = {true}
                    loadData={(func) => { this.setState({ loadData: func }) }}
                    getLoadData={(func) => {this.setState({ getLoadData: func }) }}
                />
                <MenuEdit
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

export default MenuIndex;