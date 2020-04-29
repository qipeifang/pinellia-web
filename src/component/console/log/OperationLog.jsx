/**
 * 操作日志
 */
import React from 'react';

import { Input, Row, Col } from 'antd';

import PageLayout from '../../ui/PageLayout';

const columns = [{
    title: '操作人',
    dataIndex: 'operator',
    width: '8%',
  }, {
    title: '远程地址',
    dataIndex: 'remoteAddr',
    width: '7%',
  }, {
    title: '调用方法',
    dataIndex: 'method',
    width: '20%',
  }, {
    title: '参数',
    dataIndex: 'args',
    width: '20%',
  }, {
    title: '操作时间',
    dataIndex: 'operateTime',
    width: '10%',
  }, {
    title: '操作类型',
    dataIndex: 'operateType',
    width: '7%',
    format: { 'S': '保存', 'C': '新增', 'D': '删除', 'U': '修改', 'R': '查询'}
  }, {
    title: '操作描述',
    dataIndex: 'operateDesc',
    width: '10%',
  }, {
    title: '操作结果',
    dataIndex: 'state',
    width: '7%',
    format: {0:'成功',1: '异常'}
  }, {
    title: '失败信息',
    dataIndex: 'exception',
    width: '10%',
}];

class OperationLog extends React.Component {

    render(){
        return (
          <PageLayout
            condition={(
                <Row>
                    <Col span={8}>
                      <Input.Search
                        placeholder="操作人/远程地址/操作描述"
                        onSearch={value => this.state.loadData({queryString: value})}
                        enterButton
                      />
                    </Col>
                </Row>
            )}
            rowKey="id" 
            url="/operationLog/findOperationLogPage"
            columns={columns}
            loadData={(func)=>{this.setState({loadData : func})}}
          >
          </PageLayout>
        )
    }

    

}

export default OperationLog;