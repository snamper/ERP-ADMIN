import echarts from 'echarts'
import { home as ajax } from 'services'

export default {
	data() {
		return {
			pendingItem: {}
		}
	},
    mounted() {
        this.init()
        this.getPendingItemCount()
    },
    methods: {
        init() {
            const echart = echarts.init(document.getElementById('chart'))
            const options = {
                 title: {
                    text: '分销商与下单量统计'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: 'red'
                        }
                    }
                },
                legend: {
                    data: ['分销商', '下单量']
                },
                grid: {
                    left: '20px',
                    right: '30px',
                    bottom: '20px',
                    containLabel: true
                },
                xAxis: [
                    {
                        name: '月',
                        type: 'category',
                        boundaryGap: false,
                        data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
                    }
                ],
                yAxis: [
                    {
                        name: '数量',
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '分销商',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {
                                color: '#8b59ab'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#8b59ab',
                                lineStyle: {
                                    color: '#8b59ab'
                                }
                            }
                        },
                        data: [80, 100, 180, 110, 40, 90, 400, 300, 200, 100, 20, 0]
                    },
                    {
                        name: '下单量',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {
                                color: '#d7b791'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#d7b791',
                                lineStyle: {
                                    color: '#d7b791'
                                }
                            }
                        },
                        data: [200, 400, 600, 400, 280, 430, 390, 360, 220, 180, 190, 230]
                    }
                ]
            }
            echart.setOption(options)
        },
        getPendingItemCount() {
            ajax.getPendingItemCount().then((result) => {
                this.pendingItem = result
            })
        }
    }
}