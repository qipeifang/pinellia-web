/**
 * 有表格页面的布局
 */
import React from 'react';

import PageTable from './PageTable';

class PageLayout extends React.Component {

    state = {
        height: 0
    }

    componentDidMount() {
        this.calculatedAltitude();
        //监听窗口大小改变
        window.addEventListener('resize', this.handleResize, false);
    }

    componentWillUnmount() {
        //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
        window.removeEventListener('resize', this.handleResize, false);
    }

    calculatedAltitude = () => {
        let divId = this.props.id == null ? 'content_div' : this.props.id;
        let content = document.getElementById(divId);
        let contentHeight = content.clientHeight || content.offsetHeight;
        let header = document.getElementById("header_div");
        let headerHeight = header.clientHeight || header.offsetHeight;
        let height = contentHeight - headerHeight;
        this.setState({ height: height });
    }

    handleResize = e => {
        this.calculatedAltitude();
    }

    render() {
        const { condition } = this.props;
        let paddingBottom = 24;
        if (condition === undefined || condition == null) {
            paddingBottom = 0;
        }
        let divId = this.props.id == null ? 'content_div' : this.props.id;
        return (
            <div style={{ height: '100%' }} id={divId}>
                <div style={{ paddingBottom: paddingBottom }} id="header_div">
                    {condition}
                </div>
                {/* <PageTable rowKey={rowKey} columns={columns} url={url} height={this.state.height}> */}
                <PageTable {...this.props} height={this.state.height}>
                </PageTable>
            </div>
        )
    }

}

export default PageLayout;