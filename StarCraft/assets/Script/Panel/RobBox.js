import ModuleManager from "ModuleManager";
import BasePanel from "BasePanel"

cc.Class({
    extends: BasePanel,
    properties: {
        btnConfirm:cc.Button,
        lbMeteor:"",
    },

    Init(robMeteor){
        this.lbMeteor.string = robMeteor.toString();
    },

    onConfirm(){
        ModuleManager.GetInstance().HideModule("RobBox");
    }
})