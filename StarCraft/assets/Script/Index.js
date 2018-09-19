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
import BuffBase from "BuffBase";
import NetUtil from "NetUtil";
import Productor from "Productor";
import StarConfig from "StarConfig";
import AysncImageLoading from "AysncImageLoading";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        spBg:cc.Sprite,
        barloading:cc.ProgressBar,
        lbTip:cc.Label,
        lbCompany:cc.Label,
    },

    onDestroy() {

    },


    onLoad() {
        SceneManager.GetInstance().SetRoot(this.node);
        //ResourceManager.LoadRemoteSprite(this.spBg, "https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png")
        var that = this
        this.barloading.progress = 0;
        NetUtil.Request(databus.cfgUrl, {}, function(data){
    	    databus.cfgData = data;
    	    databus.Reset();
    	    that.startLoad();
        });
        this.lbCompany.string = "有來有趣网络科技"
        databus.userInfo.curStarId = parseInt(StarConfig.GetStarIds()[0]);
        BuffBase.Init();
    },

    start(){
        Productor.GetInstance().Start();
    },

    startLoad(){
        this.loadList = [new ImageLoading(), new PrefabLoading()]
        this.loadIndex = 0;
        this.doLoad();
    },

    doLoad(){
        if(this.loadIndex >= this.loadList.length){
            new LevelManager().SwitchLevel("preload", 0);
            AysncImageLoading.Load();
        }
        else{
            this.loadList[this.loadIndex].Load()
        }
    },

    update() {
        var nowTime = new Date();
        var lbTipStr = "精彩即将呈现";
        var dotCnt = Math.floor(nowTime.getSeconds() % 3) + 1;
        for(var i = 0; i < dotCnt; i++)
        {
            lbTipStr = lbTipStr + ".";
        }
        this.lbTip.string = lbTipStr;

        if(this.loadList && this.loadList.length > 0)
        {
            var blockPercent = 1 / this.loadList.length;
            if(this.loadIndex < this.loadList.length){
                var currentResLoading = this.loadList[this.loadIndex];
                var totalPerent = (this.loadIndex - 1) * blockPercent + currentResLoading.GetProgress();
                this.barloading.progress = totalPerent < 0? 0 : totalPerent;

                if(currentResLoading.IsComplete())
                {
                    this.loadIndex++;
                    this.doLoad();
                }
            }
            else{
                if(this.loadIndex != 0)
                {
                    this.barloading.progress = 1
                }
                else
                {
                    this.barloading.progress = 0
                }
            }
        }
    },
})    