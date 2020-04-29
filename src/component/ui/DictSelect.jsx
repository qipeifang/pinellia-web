/**
 * 数据字典下拉框
 * 2019-04-28 Joker Chen
 */
import React from 'react';
import { Select } from 'antd';


import http from '../../axios/http';

class DictSelect extends React.Component {

    state = {
        dictList: []
    }

    componentDidMount() {
        this.loadDict();

        if(this.props.onRef){
            this.props.onRef(this)
        }
    }

    loadDict = () => {
        http.post({
            url: '/dict/findDict',
            data: { category: this.props.category },
            success: (res) => {
                this.setState({ dictList: res });
            }
        });
    }

    onSelect = (key) => {
        let dictList = this.state.dictList;
        if (dictList != null && dictList.length > 0) {
            let code = this.props.code ? this.props.code : 'code';
            for (let i = 0; i < dictList.length; i++) {
                if (dictList[i][code] === key) {
                    this.props.onSelect(dictList[i]);
                }
            }
        }
    }

    render() {
        let code = this.props.code ? this.props.code : 'code';
        let text = this.props.text ? this.props.text : 'name';
        let onSelect = this.props.onSelect ? this.onSelect : null;
        return <Select {...this.props} onSelect={onSelect}  >
            {this.state.dictList.map(d =>
                <Select.Option
                    key={d[code]}>
                    {d[text]}
                </Select.Option>
            )}
        </Select>
    };
}

export default DictSelect;