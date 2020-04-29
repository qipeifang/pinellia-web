/**
 * 分页表格
 */
import React from 'react';

import { Table, Tooltip } from 'antd';

import http from '../../axios/http';

import "../../style/ui/pageTable.css";

import {treeDataConversion} from './treeData';

import messager from './messager';

const init_page_size = 10;
const init_page_number = 1;
class PageTable extends React.Component {

    state = {
        data: [],
        pagination: {
            pageSize: init_page_size,
            current: init_page_number,
            total: 0
        },
        loading: false,
        tableHeaderHeight: 54,
        params: {}   // 查询参数
    };

    componentDidMount() {
        this.fetch(this.state.pagination);

        if(this.props.loadData !== undefined && this.props.loadData != null){
            this.props.loadData(this.filter);
        }
        if(this.props.getLoadData !== undefined && this.props.getLoadData != null){
            this.props.getLoadData(this.getLoadData);
        }

        // this.calculatedHeaderHeight();
        // window.addEventListener('resize', this.handleResize);
    }

    // componentWillUnmount() { 
    //     //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
    //     window.removeEventListener('resize', this.handleResize);
    // }

    // handleResize = e => {
    //     this.calculatedHeaderHeight();
    // }

    // calculatedHeaderHeight = () =>{
    //     let tableHeader = document.getElementsByClassName("ant-table-thead")[0];
    //     let tableHeaderHeight = tableHeader.clientHeight || tableHeader.offsetHeight;
    //     this.setState({tableHeaderHeight: tableHeaderHeight});
    // }


    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({ pagination: pager });
        const params = { ...this.state.params };
        params.pageSize = pagination.pageSize;
        params.pageNumber = pagination.current;
        this.fetch(params);
    }

    handlePaginationChange = (page, pageSize) => {
        const params = { ...this.state.params };
        params.pageSize = pageSize;
        params.pageNumber = page;
        this.fetch(params);
    }

    fetch = (params = {}) => {
        this.setState({ loading: true });
        const {url} = this.props;
        http.post({
            url: url,
            data: {...params},
            success: (res) =>{
                let content = res;
                const pagination = { ...this.state.pagination };
                if(this.props.page === false){
                    
                }else{
                    pagination.total = res.totalElements;
                    pagination.pageSize = res.pageSize;
                    pagination.current = res.pageNumber;
                    content = res.content;
                }
                if(this.props.treeTable){
                    treeDataConversion(content);
                }
                this.setState({
                    loading: false,
                    data: content,
                    pagination,
                    params: params
                });
            },
            error: (res)=>{
                messager.alert(res,"异常","error");
                this.setState({loading:false});
            }
        });
    }

    filter = (params = {}) => {
        params.pageNumber = init_page_number;
        params.pageSize = init_page_size;
        this.fetch(params);
    }

    //获取加载的数据
    getLoadData = ()=>{
        return {data : this.state.data, pagination: this.state.pagination};
    }
    
    render(){
        const {rowKey, height} = this.props;
        let {columns} = this.props;
        columns.forEach(item => {
            if(item.render === undefined || item.render == null){
                item.render = val =>{
                    let text = val;
                    if(item.format !== undefined && item.format != null){
                        text = item.format[text];
                    }
                    return (<Tooltip title={text}>
                        <span>{text}</span>
                    </Tooltip>)
                }
            }
        });
        const y =  height - this.state.tableHeaderHeight - (this.props.page===false?0:48);
        return (
            <div className="page-table-div">
                {this.state.data && this.state.data.length ? 
                    <Table
                        rowKey={rowKey} 
                        dataSource={this.state.data}
                        pagination={this.props.page===false?false:this.state.pagination} 
                        loading={this.state.loading} 
                        onChange={this.handleTableChange}
                        columns={columns}
                        defaultExpandAllRows = {this.props.defaultExpandAllRows}
                        scroll={{ y: y }}
                        bordered= {true}
                        >
                    </Table>
                    : 
                    this.props.defaultExpandAllRows === true?''
                        : 
                        <Table 
                            columns={columns}
                            defaultExpand
                            bordered= {true}
                            >
                        </Table>
                }
            </div>
        )
    }

}

export default PageTable;