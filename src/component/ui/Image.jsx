/**
 * 图片上传
 * 2019-05-28 Joker Chen
 */
import React from 'react';
import { Icon, Modal } from 'antd';

import '../../style/common/uploadImage.css';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class Image extends React.Component {

    state = {
        image: null,
        previewVisible: false,
        previewImage: null
    }

    clickUpload = (e) => {
        let fileInput = this.refs.fileInput;
        fileInput.click();
    }

    uploadImage = (e) => {
        let file = e.target.files[0];
        this.handleImageUpload(file);
    }
    handleImageUpload = async file => {
        await getBase64(file).then(base64 => {
            if (this.props.onChange) {
                this.props.onChange({ base64, file });
            }
            this.setState({ image: base64 });
            this.refs.fileInput.value = '';
        });
    }

    handleImagePreview = () => {
        const { file } = this.props;
        // let { image } = this.state;
        // if(file != null){
        //     image = file;
        // }
        this.setState({
            previewImage: file,
            previewVisible: true,
        });
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handleImageRemove = () => {
        this.refs.fileInput.value = '';
        this.setState({ image: null });
        if (this.props.onRemove) {
            this.props.onRemove();
        }
    }

    // handleClear = () => {
    //     this.refs.fileInput.value = '';
    //     this.setState({image: null});
    // }

    render() {
        const { text, file, type, onlyView } = this.props;
        // let { image } = this.state;
        // if(file != null){
        //     image = file;
        // }
        let flag = (file == null || file === "");
        let align = type === 'button' ? "left" : "center";
        return (
            <div>
                <div className={type === 'button' ? '' : "def-picture-card"} >
                    <div hidden={!flag} style={{ verticalAlign: "middle", textAlign: align, display: flag ? '' : "none" }}>
                        {onlyView === true ? null :
                            <div>
                                <Icon type="camera" style={{ fontSize: '28px', margin: '5px', color: '#19be6b', cursor: 'pointer' }} onClick={this.props.openScanner} />
                                <Icon type="picture" style={{ fontSize: '28px', margin: '5px', color: '#40a9ff', cursor: 'pointer' }} onClick={this.clickUpload.bind(this)} />
                                <input type="file" accept="image/jpg,image/jpeg,image/png" onChange={this.uploadImage.bind(this)} style={{ display: "none" }} ref="fileInput" />
                            </div>
                        }
                        <span>{text}</span>
                    </div>
                    <div className="def-upload-item-info" style={{ display: flag ? "none" : '' }}>
                        <img alt="" src={file}></img>
                    </div>
                    <span className="def-upload-item-actions" style={{ display: flag ? "none" : '' }}>
                        <Icon type="eye" onClick={this.handleImagePreview} />
                        {onlyView === true ? null :
                            <Icon type="delete" onClick={this.handleImageRemove} />
                        }
                    </span>
                </div>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>
        );
    }
}

export default Image;