/**
 * 角色信息
 */
import React from 'react';

import { Input, Button, Row, Col, Icon, Tooltip } from 'antd';

import PageLayout from '../../ui/PageLayout';
import http from '../../../axios/http';

import RoleEdit from './RoleEdit';
import messager from '../../ui/messager';


class RoleIndex extends React.Component {
    columns = [{
        title: '角色名',
        dataIndex: 'roleName',
        width: '20%',
    }, {
        title: '组织名',
        dataIndex: 'orgName',
        width: '10%',
    }, {
        title: '菜单信息',
        dataIndex: 'menuName',
        width: '60%',
    }, {
        title: '操作',
        dataIndex: 'roleId',
        width: '10%',
        render: (text, record, index) => (
            <div>
                <Tooltip title="修改">
                    <Icon type="edit" theme="filled" title="修改" className="table-operate-icon" onClick={this.update.bind(this, record)} />
                </Tooltip>
                <Tooltip title="删除">
                    <Icon type="delete" theme="filled" title="删除" className="table-operate-icon" onClick={this.delete.bind(this, text)} />
                </Tooltip>
            </div>
        ),
    }];

    state = {
        visible: false,
        editData: {},
        loadData: ''
    };

    add = () => {
        this.setState({ editData: {} });
        this.showModal();
    }

    update = (info, e) => {
        if (info.menuCode !== undefined && info.menuCode != null && !(info.menuCode instanceof Array)) {
            info.menuCode = info.menuCode.split(",");
        }
        if (info.orgCode !== undefined && info.orgCode != null && !(info.orgCode instanceof Array)) {
            info.orgCode = info.orgCode.split(",");
        }
        this.setState({ editData: info });
        this.showModal();
    }

    delete = (info, e) => {
        messager.confirm("是否删除该角色？", () => {
            http.post({
                url: '/role/deleteRole',
                data: { id: info },
                success: (res) => {
                    this.state.loadData();
                    messager.notify("删除成功！");
                }
            });
        });
    }

    showModal = () => {
        this.setState({ visible: true });
    };
    hiddenModal = () => {
        this.setState({ visible: false });
    };

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <PageLayout
                    condition={(
                        <Row>
                            <Col span={8}>
                                <Input.Search
                                    placeholder="角色名"
                                    onSearch={value => this.state.loadData({ roleName: value })}
                                    enterButton
                                />
                            </Col>
                            <Col span={16} style={{ textAlign: "right" }}>
                                <Button type="primary" onClick={this.add}>新增</Button>
                            </Col>
                        </Row>
                    )}
                    rowKey="roleId"
                    url="/role/findRolePage"
                    columns={this.columns}

                    loadData={(func) => { this.setState({ loadData: func }) }}
                />
                <RoleEdit
                    visible={this.state.visible}
                    onCancel={this.hiddenModal.bind(this)}
                    editData={this.state.editData}
                    successCallback={this.state.loadData}
                />
            </div>
        )
    }

}

export default RoleIndex;