import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import { colorList } from './chartDef';

class Pie extends React.Component {

    state = {
        domId: "chart_pie_" + new Date().getTime(),
        chart: null
    }

    componentDidMount() {
        // 初始化
        let chart = echarts.init(document.getElementById(this.state.domId));
        this.setState({ chart: chart });
    }

    componentWillReceiveProps() {
        let { data, title, legendShow, labelShow, labelFormatter, legendData, rose } = this.props;
        let legend = {
            x: 'center',
            y: 'bottom',
        };
        let series = []
        let item = {
            data: data,
            type: 'pie',
            radius: '60%',
        };
        if (labelShow === false) {
            item.label = {
                normal: {
                    show: false,
                }
            };
        } else {
            item.label = {
                normal: {
                    show: true,
                }
            };
            if (labelFormatter) {
                item.label.normal.formatter = labelFormatter;
            }
        }
        if (rose === true) {
            item.roseType = 'area';
        }
        series.push(item)
        legend.data = legendData;
        let option = {
            color: colorList,
            title: {
                text: title,
                x: 'center',   //位置
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: legendShow === false ? null : legend,
            grid: {
                left: '2%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            calculable: true,
            series: series
        };
        if (this.state.chart != null) {
            this.state.chart.setOption(option);
        }
    }

    render() {
        return (
            <div id={this.state.domId} style={{ width: '100%', height: '100%' }}></div>
        );
    }
}

export default Pie;