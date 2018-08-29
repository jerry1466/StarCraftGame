import ModuleManager from "ModuleManager";
import ResourceManager from "ResourceManager";
import BasePanel from "BasePanel"
import ResConfig from "ResConfig"

cc.Class({
    extends: BasePanel,
    properties: {
        btnConfirm:cc.Button,
        lbMeteor:cc.Label,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.MessageBoxBg());
    },

    Init(robMeteor){
        this.lbMeteor.string = "-" + robMeteor.toString();
    },

    onConfirm(){
        ModuleManager.GetInstance().HideModule("RobBox");
    }
})