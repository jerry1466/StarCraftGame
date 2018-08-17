/**
 * XXX
 * @author lijun
 **/
import BasePanel from "BasePanel"
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
cc.Class({
    extends: BasePanel,
    properties: {
        spBg:cc.Sprite,
        lbContent:cc.Label,
        btnConfirm:cc.Button,
        btnCancel:cc.Button
    },

    onDestroy() {

    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.spBg, ResConfig.MessageBoxBg())
    },

    Init(mode, content, confirmHandler, cancelHandler) {
        this.confirmHandler = confirmHandler;
        this.cancelHandler = cancelHandler;
        if(mode == "confirm"){
            this.btnCancel.active = true
            this.btnConfirm.x = this.spBg.node.width * 0.5;
        }
        else{
            this.btnConfirm.x = this.spBg.node.width * 0.33;
            this.btnCancel.x = this.spBg.node.width * 0.67;
        }
        this.lbContent.string = content;
    },

    OnConfirm(){
        if(this.confirmHandler){
            this.confirmHandler()
        }
    },

    OnCancel(){
        if(this.cancelHandler){
            this.cancelHandler()
        }
    },
})    