/**
 * Index
 * @author lijun
 **/
import Scene from 'Scene'
import LevelManager from 'LevelManager'
import ResourceManager from 'ResourceManager'
import Databus from 'Databus'
import ImageLoading from 'ImageLoading'
import PrefabLoading from "PrefabLoading"
import SceneManager from 'SceneManager'
import BuffBase from "BuffBase";
import NetUtil from "NetUtil";

let databus = new Databus()
cc.Class({
    extends: Scene,
    properties: {
        spBg:cc.Sprite,
        barloading:cc.ProgressBar,
        lbCompany:cc.Label,
    },

    onDestroy() {

    },


    onLoad() {
    	SceneManager.GetInstance().rootCanvas = this.node
        ResourceManager.LoadRemoteSprite(this.spBg, "https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png")

        var that = this
        NetUtil.Request(databus.cfgUrl, {}, function(data){
    	    databus.cfgData = data;
    	    databus.Reset();
    	    that.startLoad();
        });
        this.lbCompany.string = "有來有趣网络科技"
        BuffBase.Init();
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
        BuffBase.Update();

        if(this.loadList)
        {
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
        }
    },
})    