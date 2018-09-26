import ModuleManager from "ModuleManager";
import BasePanel from "BasePanel"
import AnimationManager from "AnimationManager";

cc.Class({
    extends: BasePanel,
    properties: {
        btnConfirm:cc.Button,
        lbDiamond:cc.Label,
    },

    Init(rewardDiamond){
        this.lbDiamond.string = rewardDiamond.toString();
    },

    onConfirm(){
        ModuleManager.GetInstance().HideModule("DiamondRewardBox");
    }
})