/**
 * Index
 * @author lijun
 **/
import LevelManager from 'LevelManager'
import ResourceManager from 'ResourceManager'
import Databus from 'Databus'
import ImageLoading from 'ImageLoading'
import PrefabLoading from "PrefabLoading"
import SceneManager from 'SceneManager'

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        spBg:cc.Sprite,
        barloading:cc.ProgressBar,
        lbCompany:""
    },

    onDestroy() {

    },


    onLoad() {
        SceneManager.GetInstance().rootCanvas = this.node
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
        this.lbCompany.string = "有來有趣网络科技"
    },

    startLoad(){
        this.loadList = [new ImageLoading(), new PrefabLoading()]
        this.loadIndex = 0;
        this.doLoad();
    },

    doLoad(){
        if(this.loadIndex >= this.loadList.length){
            new LevelManager().SwitchLevel("preload", 0)
        }
        else{
            this.loadList[this.loadIndex].Load()
        }
    },

    update() {
        var blockPercent = 1 / this.loadList.length;
        if(this.loadIndex < this.loadList.length){
            var currentResLoading = this.loadList[this.loadIndex];
            var totalPerent = (this.loadIndex - 1) * blockPercent + currentResLoading.GetProgress();
            this.barloading.progress = totalPerent;
        }
        else{
            this.barloading.progress = 1
        }

        if(currentResLoading.IsComplete())
        {
            this.loadIndex++;
            this.doLoad();
        }
    },
})    