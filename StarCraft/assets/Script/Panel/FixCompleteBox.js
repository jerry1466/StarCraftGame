/**
 * FixCompleteBox
 * @author lijun
 **/
import ModuleManager from "ModuleManager";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig"
import BasePanel from "BasePanel"
import Databus from "Databus"
import TweenAlpha from "TweenAlpha"

let databus = new Databus();
cc.Class({
    extends: BasePanel,
    properties: {
        bg: cc.Sprite,
        star:cc.Sprite,
        btnNext:cc.Button,
        spNext:cc.Sprite,
        newStarFlag:cc.Sprite,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.FixCompleteBoxBg());
        ResourceManager.LoadRemoteSprite(this.spNext, ResConfig.NextStarBtn());
    },

    start(){
        ResourceManager.LoadRemoteSprite(this.star, ResConfig.GetStarIcon(this.curStarId));
        if(this.curStarId <= 1015)
        {
            ResourceManager.LoadRemoteSprite(this.newStarFlag, ResConfig.NewStarIcon(1));
        }
        else
        {
            ResourceManager.LoadRemoteSprite(this.newStarFlag, ResConfig.NewStarIcon(2));
        }
        this.newStarFlag.node.opacity = 255;
        var that = this;
        setTimeout(function(){
            TweenAlpha.begin(that.newStarFlag.node, 255, 0, 0.5, 1);
        }, 1000)
    },

    update() {

    },

    onDestroy() {

    },


    Init(curStarId) {
        this.curStarId = curStarId
    },

    onNext(){
        ModuleManager.GetInstance().HideModule("FixCompleteBox");
        ModuleManager.GetInstance().ShowModule("StarListPanel");
    },

    onClose(){
        ModuleManager.GetInstance().HideModule("FixCompleteBox");
    },
})    