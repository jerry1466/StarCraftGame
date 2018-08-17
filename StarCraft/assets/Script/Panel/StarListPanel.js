/**
 * StarListPanel
 * @author lijun
 **/
import BasePanel from 'BasePanel'
import EventUtil from 'EventUtil'
import ModuleManager from 'ModuleManager'
import Productor from "Productor";

cc.Class({
    extends: BasePanel,
    properties: {
        rtProductivity:cc.RichText,
        scrollView:cc.ScrollView
    },

    onLoad(){
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