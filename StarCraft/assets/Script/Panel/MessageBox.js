/**
 * MessageBox
 * @author lijun
 **/
import BasePanel from "BasePanel"
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
import ModuleManager from "ModuleManager";
cc.Class({
    extends: BasePanel,
    properties: {
        spBg:cc.Sprite,
        lbContent:cc.Label,
        btnConfirm:cc.Button,
        btnCancel:cc.Button,
        lbConfirm:cc.Label,
        lbCancel:cc.Label
    },

    onDestroy() {

    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.spBg, ResConfig.MessageBoxBg())
        ResourceManager.LoadRemoteSprite(this.btnConfirm, ResConfig.BigBtn())
        ResourceManager.LoadRemoteSprite(this.btnCancel, ResConfig.BigBtn())
    },

    Init(data) {
        this.confirmHandler = data.confirm;
        this.cancelHandler = data.cancel;
        if(data.confirmText){
            this.lbConfirm.string = data.confirmText;
        }
        if(data.cancelText){
            this.lbCancel.string = data.cancelText;
        }
        if(data.mode == "confirm"){
            this.btnCancel.node.active = false;
            this.btnConfirm.node.x = 0;
        }
        else{
            this.btnCancel.node.active = true;
            this.btnConfirm.node.x = this.spBg.node.width * 0.17;
            this.btnCancel.node.x = -this.spBg.node.width * 0.17;
        }
        this.lbContent.string = data.content;
    },

    OnConfirm(){
        ModuleManager.GetInstance().HideModule("MessageBox");
        if(this.confirmHandler){
            this.confirmHandler()
        }
    },

    OnCancel(){
        ModuleManager.GetInstance().HideModule("MessageBox");
        if(this.cancelHandler){
            this.cancelHandler()
        }
    },
})    