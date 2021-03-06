/**
 * GuideMeteorBox
 * @author lijun
 **/
import ModuleManager from "ModuleManager";
import ResourceManager from "ResourceManager";
import LevelManager from "LevelManager";
import BasePanel from "BasePanel"
import ResConfig from "ResConfig"

cc.Class({
    extends: BasePanel,
    properties: {
        bg: cc.Sprite,
        btnSearchMeteor:cc.Button,
        spSearchMeteor:cc.Sprite,
        btnClose:cc.Button,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.MessageBoxBg());
        ResourceManager.LoadRemoteSprite(this.spSearchMeteor, ResConfig.GameSearchMeteorBtn());
        ResourceManager.LoadRemoteSprite(this.btnClose, ResConfig.CloseBtn());
    },

    update() {

    },

    onDestroy() {

    },


    Init() {

    },

    onConfirm(){
        new LevelManager().SwitchLevel("maze", true);
    },

    onClose(){
        ModuleManager.GetInstance().HideModule("GuideMeteorBox");
    },
})    