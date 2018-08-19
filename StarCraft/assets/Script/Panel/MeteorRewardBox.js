import ModuleManager from "ModuleManager";
import BasePanel from "BasePanel";

cc.Class({
    extends: BasePanel,
    properties: {
        btnConfirm:cc.Button,
        lbMeteor:"",
    },

    Init(rewardMeteor){
        this.lbMeteor.string = rewardMeteor.toString();
    },

    onConfirm(){
        ModuleManager.GetInstance().HideModule("MeteorRewardBox");
    }
})