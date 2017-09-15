const webpack = require('webpack');

module.exports = {
    entry: {
        'login':['./src/js/login.js'],
        'common':['./src/js/common.js'],
        'common_detail':['./src/js/common_detail.js'],
        'aerobic':['./src/js/aerobic.js'],
        'aerobic_detail':['./src/js/aerobic_detail.js'],
        'rockport':['./src/js/rockport.js'],
        'rockport_detail':['./src/js/rockport_detail.js'],
        '4min_walk':['./src/js/4min_walk.js'],
        '4min_walk_detail':['./src/js/4min_walk_detail.js'],
        'info':['./src/js/info.js'],
        'info_history':['./src/js/info_history.js'],
        'print_common':['./src/js/print_common.js'],
        'print_aerobic':['./src/js/print_aerobic.js'],
        'print_rockport':['./src/js/print_rockport.js'],
        'print_4min_walk':['./src/js/print_4min_walk.js'],
        'survey_report':['./src/js/survey_report.js'],
        'survey_report_detail':['./src/js/survey_report_detail'],
        'clinic_set':['./src/js/clinic_set'],
        'stats':['./src/js/stats'],
        'info_statistics':['./src/js/info_statistics.js'],
        '4min_statistics_list':['./src/js/4min_statistics_list.js']
    },
    output: {
        path: __dirname + '/dist/js',
        filename:'[name].js',
        chunkFilename:'[name].js'
    },
    module: {

    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'commonDom',
            chunks:['login','common','common_detail','aerobic','aerobic_detail','rockport','rockport_detail','4min_walk','4min_walk_detail','info','info_history','print_common','print_aerobic','print_rockport','print_4min_walk','survey_report','survey_report_detail','clinic_set','stats','info_statistics','4min_statistics_list']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            except: ['$super','$','exports','require','echarts']
        })
    ]
};