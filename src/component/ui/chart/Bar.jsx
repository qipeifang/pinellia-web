import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import { colorList } from './chartDef';

class Bar extends React.Component {

    state = {
        domId:  "chart_bar_" + new Date().getTime()+this.props.id,
        chart: null
    }

    componentDidMount() {
        let chart = echarts.init(document.getElementById(this.state.domId));
        this.setState({ chart: chart });
    }

    componentWillReceiveProps() {
        let {data, xData, title,legendShow, labelShow,labelFormatter , yLabel} = this.props;
        let legend = {
            x: 'center',
            y: '30',
        };
        let legendData = [];
        let series = []
        for(let i=0;i<data.length;i++){
            legendData.push(data[i].text);
            let item = {
                data: data[i].data,
                name: data[i].text,
                type: 'bar',
                
            };
            if(labelShow === true){
                item.label= {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                };
                if(labelFormatter){
                    item.label.normal.formatter = labelFormatter;
                }
            }
            series.push(item)
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
            legend: legendShow === false? null: legend,
            grid: {
                left: '2%',
                right: '2%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: xData,
            },
            yAxis: {
                type: 'value',
                axisLabel: yLabel?yLabel:{}
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

export default Bar;