/**
 * 字典信息
 */
import React from 'react';

import { Input, Button, Row, Col, Icon, Tooltip, List } from 'antd';

import PageLayout from '../../ui/PageLayout';
import http from '../../../axios/http';

import DictEdit from './DictEdit';
import DictCategoryEdit from './DictCategoryEdit';
import messager from '../../ui/messager';

class DictIndex extends React.Component {
    columns = [{
        title: '字典类型编码',
        dataIndex: 'category',
        width: '15%',
    }, {
        title: '字典编码',
        dataIndex: 'code',
        width: '15%',
    }, {
        title: '字典名称',
        dataIndex: 'name',
        width: '20%',
    }, {
        title: '说明',
        dataIndex: 'des',
        width: '20%',
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
                    <Icon type="edit" theme="filled" title="修改" className="table-operate-icon" onClick={this.update.bind(this, record)} />
                </Tooltip>
                <Tooltip title="删除">
                    <Icon type="delete" theme="filled" className="table-operate-icon" onClick={this.delete.bind(this, text)} />
                </Tooltip>
                <Tooltip title="启用">
                    <Icon type="check-circle" theme="filled" className="table-operate-icon" onClick={this.enable.bind(this, text)} />
                </Tooltip>
                <Tooltip title="停用">
                    <Icon type="stop" theme="filled" className="table-operate-icon" onClick={this.disable.bind(this, text)} />
                </Tooltip>
            </div>
        ),
    }];

    state = {
        visible: false,
        categoryList: '',    //字典类型
        selectCategory: '',
        editData: {},
        loadData: '',
        tableWidth: 0,
        category:{
            visible: false,
            editData: {},
        }
    };

    componentDidMount(){
        this.loadCategoryList();
        this.calculatedAltitude();
        //监听窗口大小改变
        window.addEventListener('resize', this.handleResize,false);
    }

    componentWillUnmount() { 
        //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
        window.removeEventListener('resize', this.handleResize,false);
    }

    calculatedAltitude = ()=>{
        let div = document.getElementById("dict_layout_div");
        let divWidth = div.clientWidth || div.offsetWidth;
        this.setState({tableWidth: ( divWidth - 305)});
    }

    handleResize = e => {
        this.calculatedAltitude();
    }

    loadCategoryList =(param={})=>{
        http.post({
            url: '/dict/findDictCategory',
            data: param,
            success: (res) => {
                let category = '';
                if(res != null && res.length > 0){
                    //加载字典列表数据
                    category = res[0].category;
                }
                this.setState({categoryList: res,selectCategory:category});
                this.state.loadData({category:category});
            }
        });
    }

    add = () => {
        if(this.state.selectCategory === undefined 
            || this.state.selectCategory === null
            || this.state.selectCategory === ''
            ){
            messager.alert("请先选择字典类型！")
            return false;
        }
        this.setState({ editData: {category:this.state.selectCategory} });
        this.showModal();
    }
    
    update = (info, e) => {
        this.setState({ editData: info });
        this.showModal();
    }
    
    delete = (info, e) => {
        console.info(info);
        messager.confirm("是否删除该数据字典？", () => {
            http.post({
                url: '/dict/deleteDict',
                data: { id: info },
                success: (res) => {
                    this.state.loadData({category:this.state.selectCategory});
                    messager.notify("删除成功！");
                }
            });
        });
    }

    
    //启用
    enable = (info, e) => {
        messager.confirm("是否启用该数据字典？", () => {
            http.post({
                url: '/dict/enableDict',
                data: { id: info },
                success: (res) => {
                    this.state.loadData({category:this.state.selectCategory});
                    messager.notify("启用成功！");
                }
            });
        });
    }

    //停用
    disable = (info, e) => {
        messager.confirm("是否停用该数据字典？", () => {
            http.post({
                url: '/dict/disableDict',
                data: { id: info },
                success: (res) => {
                    this.state.loadData({category:this.state.selectCategory});
                    messager.notify("停用成功！");
                }
            });
        });
    }

    addCategory = () => {
        this.showModalCategory();
    }
    
    updateCategory = (info, e) => {
        this.showModalCategory(info);
    }

    deleteCategory = (info, e) => {
        messager.confirm("是否确定删除该数据类型，及其下面的数据字典？", () => {
            http.post({
                url: '/dict/deleteCategory',
                data: {category: info.category},
                success: (res) => {
                    this.loadCategoryList();
                    messager.notify("删除成功！");
                }
            });
        });
    }


    clickCategory=(info,e)=>{
        if(this.state.selectCategory === info.category){
        }else{
            //加载字典列表数据
            this.state.loadData({category:info.category});
            this.setState({selectCategory:info.category});
        }
    }

    showModal = () => {
        this.setState({ visible: true });
    };
    hiddenModal = () => {
        this.setState({ visible: false });
    };
    showModalCategory = (category = {}) => {
        this.setState({category:{ visible: true,editData:category} });
    };
    hiddenModalCategory = (category = {}) => {
        this.setState({category:{ visible: false,editData:category} });
    };

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} id="dict_layout_div">
                <style>
                    {`
                        .catetory-list-item{
                            padding: 0 !important;
                        }
                        .catetory-list-item>span{
                            padding: 12px 0px 12px 10px !important;
                        }
                        .catetory-list-item:hover{
                            background: #CCE6FF;
                        }
                        .catetory-list-item.on{
                            background:#0070C0;
                            color:#ffffff;
                        }
                    `}
                </style>
                <div style={{overflow: 'auto',height: '100%',float:'left',width:'300px',paddingRight:'5px',borderRight: '1px solid #e8e8e8'}}>
                    <div style={{ width: '100%',paddingBottom:'24px',borderBottom: '1px solid #e8e8e8'}}>
                        <Row>
                            <Col span={18}>
                                <Input.Search
                                    placeholder="字典类型"
                                    onSearch={value => this.loadCategoryList({ category: value })}
                                    enterButton
                                />
                            </Col>
                            <Col span={6} style={{ textAlign: "right" }}>
                                <Button type="primary" onClick={this.addCategory}>新增</Button>
                            </Col>
                        </Row>
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.categoryList}
                        renderItem={item => (
                            <List.Item className={['catetory-list-item', this.state.selectCategory===item.category?'on':'' ]} >
                                <span style={{width: '100%', cursor: 'pointer',display: 'block'}}
                                    onClick={this.clickCategory.bind(this,item)}
                                >{item.name}</span>
                                <Tooltip title="修改">
                                    <Icon type="edit" theme="filled" title="修改" className="table-operate-icon" onClick={this.updateCategory.bind(this, item)} />
                                </Tooltip>
                                <Tooltip title="删除">
                                    <Icon type="delete" theme="filled" title="删除" className="table-operate-icon" onClick={this.deleteCategory.bind(this, item)} />
                                </Tooltip>
                            </List.Item>
                        )}
                    />
                </div>
                <div style={{overflow: 'visible',height: '100%',float:'right',width: this.state.tableWidth}}>
                    <PageLayout
                        condition={(
                            <Row>
                                <Col span={8}>
                                </Col>
                                <Col span={16} style={{ textAlign: "right" }}>
                                    <Button type="primary" onClick={this.add}>新增</Button>
                                </Col>
                            </Row>
                        )}
                        page ={false}
                        rowKey="id"
                        url="/dict/findDictByCategory"
                        columns={this.columns}
                        loadData={(func) => { this.setState({ loadData: func }) }}
                    />
                    <DictEdit
                        visible={this.state.visible}
                        onCancel={this.hiddenModal.bind(this)}
                        editData={this.state.editData}
                        successCallback={this.state.loadData}
                    />
                    <DictCategoryEdit
                        visible={this.state.category.visible}
                        onCancel={this.hiddenModalCategory.bind(this)}
                        editData={this.state.category.editData}
                        successCallback={this.loadCategoryList}
                    />

                </div>
            </div>
        )
    }

}

export default DictIndex;