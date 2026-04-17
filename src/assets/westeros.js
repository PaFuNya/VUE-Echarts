(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {

    var colorPalette = [
        '#2ec4b6',
        '#e71d36',
        '#ff9f1c',
        '#011627',
        '#fdfffc',
        '#3d5a80',
        '#e0fbfc',
        '#98c1d9',
        '#ee6c4d',
        '#293241'
    ];

    var theme = {
        color: colorPalette,

        title: {
            textStyle: {
                fontWeight: 'normal',
                color: '#2ec4b6'
            },
            subtextStyle: { color: '#666' }
        },

        visualMap: {
            color: ['#bf444c', '#253544']
        },

        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: '#06a055'
                }
            }
        },

        tooltip: {
            backgroundColor: 'rgba(17,34,56,0.88)',
            borderColor: '#777',
            borderWidth: 1,
            textStyle: {
                color: '#fff'
            }
        },

        dataZoom: {
            dataBackgroundColor: '#374151',
            fillerColor: '#1b2939',
            handleColor: '#2381ad'
        },

        categoryAxis: {
            axisLine: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisTick: {
                show: false,
                lineStyle: { color: '#ddd' }
            },
            axisLabel: {
                color: '#ccc'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#eee'],
                    width: 1
                }
            }
        },

        valueAxis: {
            axisLine: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisTick: {
                show: false,
                lineStyle: { color: '#ddd' }
            },
            axisLabel: {
                color: '#ccc'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#eee'],
                    width: 1
                }
            }
        },

        timeline: {
            lineStyle: {
                color: '#505348'
            },
            controlStyle: {
                normal: { color: '#505348' },
                emphasis: { color: '#505348' }
            }
        },

        candlestick: {
            itemStyle: {
                normal: {
                    color: '#e71d36',
                    color0: '#2ec4b6',
                    lineColor: '#e71d36',
                    lineColor0: '#2ec4b6'
                }
            }
        },

        graph: {
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#ccc'
                }
            },
            lineStyle: {
                normal: {
                    color: '#aaa',
                    width: 1,
                    curveness: 0.3
                }
            },
            symbolSize: 8
        },

        map: {
            itemStyle: {
                normal: {
                    areaColor: '#f3f3f3',
                    borderColor: '#999',
                    borderWidth: 0.5
                },
                emphasis: {
                    areaColor: 'rgba(46,196,182,0.3)',
                    borderColor: '#2ec4b6',
                    borderWidth: 1
                }
            },
            label: {
                normal: {
                    textShadowColor: '#000',
                    textShadowBlur: 10
                },
                emphasis: {
                    textStyle: {
                        color: '#2ec4b6'
                    }
                }
            }
        }
    };

    echarts.registerTheme('westeros', theme);
}));
