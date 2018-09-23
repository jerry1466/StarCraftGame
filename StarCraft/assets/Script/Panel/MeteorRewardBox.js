import ModuleManager from "ModuleManager";
import BasePanel from "BasePanel";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
import EventUtil from "EventUtil";

cc.Class({
    extends: BasePanel,
    properties: {
        bg:cc.Sprite,
        btnConfirm:cc.Button,
        lbMeteor:cc.Label,
        icon:cc.Sprite,
    },

    onDestroy(){
        EventUtil.GetInstance().DispatchEvent("FreeTouch");
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.MessageBoxBg());
        ResourceManager.LoadRemoteSprite(this.btnConfirm, ResConfig.WellDoneBtn());
        ResourceManager.LoadRemoteSprite(this.icon, ResConfig.MeteorIcon());
    },

    Init(rewardMeteor){
        this.lbMeteor.string = rewardMeteor.toString();
    },

    onConfirm(){
        ModuleManager.GetInstance().HideModule("MeteorRewardBox");
    }
})