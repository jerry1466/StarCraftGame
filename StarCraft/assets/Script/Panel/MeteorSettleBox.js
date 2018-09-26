/**
 * MeteorSettleBox
 * @author lijun
 **/
import BasePanel from 'BasePanel'
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";

cc.Class({
    extends: BasePanel,
    properties: {
        spBg:cc.Sprite,
        lbTitle:cc.Label,
        lbNum:cc.Label,
        btnConfirm:cc.Button,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.spBg, ResConfig.MessageBoxBg());
        ResourceManager.LoadRemoteSprite(this.btnConfirm, ResConfig.WellDoneBtn());
    },

    update() {

    },

    onDestroy() {

    },

    onClose(){
        if(this.callback)
        {
            this.callback();
        }
    },

    Init(obj) {
        this.title = obj.title == null? "":obj.title;
        this.callback = obj.callback;
        this.meteorNum = obj.meteorNum == null ? 0 : obj.meteorNum;
        this.lbTitle.string = this.title;
        this.lbNum.string = "+ " + this.meteorNum.toString();
    }
})    