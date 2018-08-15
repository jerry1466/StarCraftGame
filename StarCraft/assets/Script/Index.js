/**
 * Index
 * @author lijun
 **/
import LevelManager from 'LevelManager'
import ResourceManager from 'ResourceManager'
import Databus from 'Databus'
import ResConfig from "ResConfig";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        spBg:cc.Sprite,
        barloading:cc.ProgressBar,
        lbCompany:""
    },

    update() {

    },

    onDestroy() {

    },


    onLoad() {
        ResourceManager.LoadRemoteSprite(this.spBg, "https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png")
        var that = this
        wx.request({
            url: databus.cfgUrl,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/json'
            },// 设置请求的 header
            success: function (res) {
                if (res.statusCode == 200) {
                    databus.cfgData = res.data
                    databus.Reset();
                    that.startLoad();
                } else {
                    console.log("index.js wx.request CheckCallUser statusCode" + res.statusCode)
                }
            },
            fail: function () {
                console.log("index.js wx.request CheckCallUser fail");
            },
        })
    },

    startLoad(){
        cc.loader.load(ResConfig.GetAllRes(), this.progressCallback.bind(this), this.completeCallback.bind(this))
    },

    progressCallback(completeCount, totalCount, res) {
        var progress = completeCount / totalCount;
        this.barloading.progress = progress;
    },

    completeCallback(){
        new LevelManager().SwitchLevel("preload", 0)
    }
})    