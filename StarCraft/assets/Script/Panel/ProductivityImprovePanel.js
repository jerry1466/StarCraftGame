/**
 * ProductivityImprovePanel
 * @author lijun
 **/
import Databus from 'Databus'
import BasePanel from 'BasePanel'
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
import ModuleManager from "ModuleManager";

let databus = new Databus()
cc.Class({
    extends: BasePanel,
    properties: {
        bg:cc.Sprite,
        preNum:cc.Label,
        preIcon:cc.Sprite,
        nextNum:cc.Label,
        nextIcon:cc.Sprite,
        btnConfirm:cc.Button,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.MessageBoxBg());
        ResourceManager.LoadRemoteSprite(this.btnConfirm, ResConfig.WellDoneBtn());
        ResourceManager.LoadRemoteSprite(this.preIcon, ResConfig.DiamondIcon());
        ResourceManager.LoadRemoteSprite(this.nextIcon, ResConfig.DiamondIcon());
    },

    update() {

    },

    onDestroy() {
        if(this.callback)
        {
            this.callback();
        }
    },

    onClose(){
        ModuleManager.GetInstance().HideModule("ProductivityImprovePanel");
    },

    Init(param) {
        this.preNum.string = param.pre;
        this.nextNum.string = param.next;
        this.callback = param.callback;
    }
})    