/**
 * NewStarPanel
 * @author lijun
 **/
import ModuleManager from "ModuleManager";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig"
import BasePanel from "BasePanel"
import Databus from "Databus"
import TweenAlpha from "TweenAlpha"
import StarConfig from "StarConfig"
import EventUtil from "EventUtil"

let databus = new Databus();
cc.Class({
    extends: BasePanel,
    properties: {
        bg: cc.Sprite,
        star:cc.Sprite,
        btnConfirm:cc.Button,
        flag:cc.Sprite,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.MessageBoxBg());
        ResourceManager.LoadRemoteSprite(this.btnConfirm, ResConfig.NormalBtn());
    },

    start(){
        ResourceManager.LoadRemoteSprite(this.star, ResConfig.GetStarIcon(this.curStarId));
        if(this.curStarId <= 1015)
        {
            ResourceManager.LoadRemoteSprite(this.flag, ResConfig.NewStarIcon(1));
        }
        else
        {
            ResourceManager.LoadRemoteSprite(this.flag, ResConfig.NewStarIcon(2));
        }
        this.flag.node.opacity = 255;
        var that = this;
        setTimeout(function(){
            TweenAlpha.begin(that.flag.node, 255, 0, 0.5, 1);
        }, 1000)
    },

    update() {

    },

    onDestroy() {

    },


    Init(curStarId) {
        this.curStarId = curStarId
    },

    onConfirm(){
        ModuleManager.GetInstance().HideModule("NewStarPanel");
        databus.userInfo.curStarId = databus.userInfo.maxStarId;
        databus.userInfo.brokeFixIndex = -1;
        EventUtil.GetInstance().DispatchEvent("RefreshStar", StarConfig.GetStarConfig(databus.userInfo.curStarId));
    },
})