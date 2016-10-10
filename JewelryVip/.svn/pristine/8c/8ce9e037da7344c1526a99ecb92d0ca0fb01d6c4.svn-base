/**
 * Created by chizhang on 16/9/27.
 */
'use strict'
var koa = require('koa'),
    path = require('path'),
    wechatTest = require('./server/wechatTest'),
    util = require('./server/libs/util'),
    wechat_file = path.join(__dirname, './config/wechat.json')
var config = {
    wechat: {
        appID: 'wx036acacfaaeba9c4',
        appSecret: 'd48efbf43b8429bfe358ab70c742f64a',
        token: 'sylm',
        getAccessToken: function () {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken: function (data) {
            // console.log(data.valueOf())
            // // var d = data
            // data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file, data.valueOf())
        }
    }
}

var app = new koa()
app.use(wechatTest(config.wechat))
app.listen(1336)
console.log('success')