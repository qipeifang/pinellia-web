import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import { colorList } from './chartDef';

class Line extends React.Component {

    state = {
        domId: "chart_line_" + new Date().getTime(),
        chart: null
    }

    componentDidMount() {
        // 初始化
        let chart = echarts.init(document.getElementById(this.state.domId));
        this.setState({ chart: chart });
    }

    componentWillReceiveProps() {
        let {data, xData, title} = this.props;
        let legend = {
            x: 'center',
            y: '30',
        };
        let legendData = [];
        let series = []
        for(let i=0;i<data.length;i++){
            legendData.push(data[i].text);
            series.push({
                data: data[i].data,
                name: data[i].text,
                type: 'line',
                smooth: true,
                areaStyle: {},
            })
        }
        legend.data = legendData;
        let option = {
            color: colorList,
            title: {
                text:  title,
                x: 'center',   //位置
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: legend,
            grid: {
                left: '2%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: series
        };
        if(this.state.chart != null){
            this.state.chart.setOption(option);
        }
    }

    render() {
        return (
            <div id={this.state.domId} style={{ width: '100%', height: '100%' }}></div>
        );
    }
}

export default Line;