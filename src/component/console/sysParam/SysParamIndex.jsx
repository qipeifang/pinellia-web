/**
 * 系统参数
 */
import React from 'react';

import { Input, Button, Row, Col, Icon, Tooltip } from 'antd';

import PageLayout from '../../ui/PageLayout';

import SysParamEdit from './SysParamEdit';

class SysParamIndex extends React.Component {

    columns = [{
        title: '参数编码',
        dataIndex: 'code',
        width: '30%',
    }, {
        title: '参数名',
        dataIndex: 'name',
        width: '30%',
    }, {
        title: '参数值',
        dataIndex: 'value',
        width: '30%',
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
                                    placeholder="参数编码/参数名"
                                    onSearch={value => this.state.loadData({ queryString: value })}
                                    enterButton
                                />
                            </Col>
                            <Col span={16} style={{ textAlign: "right" }}>
                                <Button type="primary" onClick={this.add}>新增</Button>
                            </Col>
                        </Row>
                    )}
                    rowKey="code" url="/sysParam/findSysParamPage" columns={this.columns}
                    loadData={(func) => { this.setState({ loadData: func }) }}
                />
                <SysParamEdit
                    visible={this.state.visible}
                    onCancel={this.hiddenModal.bind(this)}
                    editData={this.state.editData}
                    successCallback={this.state.loadData}
                />
            </div>
        )
    }
}

export default SysParamIndex;