/**
 * StarListPanel
 * @author lijun
 **/
import BasePanel from 'BasePanel'
import EventUtil from 'EventUtil'
import ModuleManager from 'ModuleManager'
import Productor from "Productor";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";

cc.Class({
    extends: BasePanel,
    properties: {
        bg:cc.Sprite,
        rtProductivity:cc.RichText,
        scrollView:cc.ScrollView
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.StarListPanelBg())
    },

    update() {

    },

    start(){
        this.rtProductivity.string = "<color=#FFFFFF>总产量：" + "</c><color=#9AFF9A>" + Productor.GetInstance().GetTotalProductivity() + "</c><color=#FFFFFF>/秒</c>"
    },

    onDestroy() {
    },

    onClose(){
        ModuleManager.GetInstance().HideModule("StarListPanel")
    }
})