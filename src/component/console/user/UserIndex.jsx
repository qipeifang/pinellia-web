/**
 * 用户信息
 */
import React from 'react';

import { Input, Button, Row, Col, Icon, Tooltip } from 'antd';

import PageLayout from '../../ui/PageLayout';

import UserEdit from './UserEdit';

class UserIndex extends React.Component {

    columns = [{
        title: '用户名',
        dataIndex: 'username',
        width: '10%',
    }, {
        title: '身份证',
        dataIndex: 'idNo',
        width: '10%',
    }, {
        title: '用户类型',
        dataIndex: 'type',
        width: '10%',
    }, {
        title: '邮箱',
        dataIndex: 'email',
        width: '10%',
    }, {
        title: '电话',
        dataIndex: 'tel',
        width: '10%',
    }, {
        title: '备注',
        dataIndex: 'remark',
        width: '10%',
    }, {
        title: '状态',
        dataIndex: 'state',
        width: '10%',
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
            </div>
        )
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

    showModal = () => {
        this.setState({ visible: true });
    };
    hiddenModal = () => {
        this.setState({ visible: false });
    };

    update = (info, e) => {
        if (info.roleId !== undefined && info.roleId != null && !(info.roleId instanceof Array)) {
            info.roleId = info.roleId.split(",");
        }
        if (info.orgCode !== undefined && info.orgCode != null && !(info.orgCode instanceof Array)) {
            info.orgCode = info.orgCode.split(",");
        }
        this.setState({ editData: info });
        this.showModal();
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <PageLayout
                    condition={(
                        <Row>
                            <Col span={8}>
                                <Input.Search
                                    placeholder="用户名"
                                    onSearch={value => this.state.loadData({ username: value })}
                                    enterButton
                                />
                            </Col>
                            <Col span={16} style={{ textAlign: "right" }}>
                                <Button type="primary" onClick={this.add}>新增</Button>
                            </Col>
                        </Row>
                    )}
                    rowKey="username" url="/user/findUserPage" columns={this.columns}
                    loadData={(func) => { this.setState({ loadData: func }) }}
                />
                <UserEdit
                    visible={this.state.visible}
                    onCancel={this.hiddenModal.bind(this)}
                    editData={this.state.editData}
                    successCallback={this.state.loadData}
                />
            </div>
        )
    }
}

export default UserIndex;