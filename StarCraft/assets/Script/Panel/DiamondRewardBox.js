import ModuleManager from "ModuleManager";
import BasePanel from "BasePanel"

cc.Class({
    extends: BasePanel,
    properties: {
        btnConfirm:cc.Button,
        lbDiamond:"",
    },

    Init(rewardDiamond){
        this.lbDiamond.string = rewardDiamond.toString();
    },

    onConfirm(){
        ModuleManager.GetInstance().HideModule("DiamondRewardBox");
    }
})