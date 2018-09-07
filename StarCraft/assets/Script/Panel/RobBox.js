import ModuleManager from "ModuleManager";
import ResourceManager from "ResourceManager";
import BasePanel from "BasePanel"
import ResConfig from "ResConfig"

cc.Class({
    extends: BasePanel,
    properties: {
        bg:cc.Sprite,
        btnConfirm:cc.Button,
        lbMeteor:cc.Label,
        btnClose:cc.Button,
        icon:cc.Sprite
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.MessageBoxBg());
        ResourceManager.LoadRemoteSprite(this.btnConfirm, ResConfig.NormalBtn());
        ResourceManager.LoadRemoteSprite(this.btnClose, ResConfig.CloseBtn());
        ResourceManager.LoadRemoteSprite(this.icon, ResConfig.MeteorIcon());
    },

    Init(robMeteor){
        this.lbMeteor.string = "-" + robMeteor.toString();
    },

    onConfirm(){
        ModuleManager.GetInstance().HideModule("RobBox");
    }
})