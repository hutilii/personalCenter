/**
 * Created by chizhang on 16/9/27.
 */
'use strict'
var sha1 = require('sha1'),
    Promise = require('bluebird'),
    request = Promise.promisify(require('request')),
    util = require('./libs/util'), 
    path = require('path')
var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
    accessToken: prefix + 'token?grant_type=client_credential'
}
function Wechat(opts) {
    var that = this
    this.appID = opts.appID
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken
    this.getAccessToken().then(function (data) {
        try {
            data = JSON.parse(data)
        } catch (e) {
            return that.updateAccessToken(data)
        }
        if (that.isValidAccessToken(data)) {
            return Promise.resolve(data)
        } else {
            return that.updateAccessToken(data)
        }
    }).then(function (data) {
        that.acces_token = data.acces_token
        that.expires_in = data.expires_in
        console.log(data)
        that.saveAccessToken(data)
    })
}
Wechat.prototype.isValidAccessToken = function (data) {
    if (!data || !data.acces_token || !data.expires_in) {
        return false
    }
    var access_token = data.acces_token
    var expires_in = data.expires_in
    var now = new Date().getTime()
    if (now < expires_in) {
        return true
    } else {
        return false
    }
}
Wechat.prototype.updateAccessToken = function () {
    var appID = this.appID
    var appSecret = this.appSecret
    var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret
    return new Promise(function (resolve, reject) {
        request({
            url: url,
            json: true
        }).then(function (res) {
            var data= res;
            data = data.body
            var now = new Date().getTime()
            var expires_in = (now + data.expires_in - 20) * 1000
            data.expires_in = expires_in
            resolve(data)
        })
    })

}
module.exports = function (opts) {
    var wechat = new Wechat(opts)
    return function *(next) {
        console.log(this.query)
        var token = opts.token
        var signature = this.query.signature
        var echostr = this.query.echostr
        var timestamp = this.query.timestamp
        var nonce = this.query.nonce
        var str = [token, timestamp, nonce].sort().join("")
        var sha = sha1(str)
        if (sha === signature) {
            this.body = echostr + ''
        } else {
            this.body = 'wrong'
        }
    }
}

