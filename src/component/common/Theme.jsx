
import React, { Component } from 'react';
import { Modal } from 'antd';




class Theme extends Component {


    render() {
        const { visible, onCancel } = this.props;
        return (
            <Modal
                visible={visible}
                title="设置"
                okText="保存"
                cancelText="取消"
                maskClosable={false}
                onCancel={onCancel}
                onOk={this.save}
            >
                
            </Modal>
        );
    }
}


export default Theme;