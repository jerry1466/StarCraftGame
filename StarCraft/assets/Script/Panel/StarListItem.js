/**
 * StarListPanel
 * @author lijun
 **/
import EventUtil from 'EventUtil'
import Databus from 'Databus'
import ResConfig from 'ResConfig'
import ResourceManager from "ResourceManager";
import ModuleManager from "ModuleManager"
import Productor from "Productor";

let databus = new Databus()

cc.Class({
    extends: cc.Component,
    properties: {
        spIcon:cc.Sprite,
        spIntro:cc.Sprite,
        lbName:"",
        lbIntro:"",
        rtProductivity:cc.RichText,
        lbStatus:cc.Label,
        btnView:cc.Button
    },

    update() {

    },

    start(){

    },

    onDestroy() {

    },

    Init(config){
        this.config = config
        ResourceManager.LoadRemoteSprite(this.spIcon, config["resUrl"])
        ResourceManager.LoadRemoteSprite(this.spIcon, ResConfig.IntroBg)
        this.lbName.string = config["name"]
        this.lbIntro.string = config["intro"]
        if(config.id <= databus.userInfo.curStarId)
        {
            this.lbStatus.node.active = false;
            this.btnView.node.active = true;
            this.rtProductivity.node.active = true;
            this.rtProductivity.string = "<color=#000000>产量：" + "</c><color=#9AFF9A>" + Productor.GetInstance().GetStarProductivity(config, databus.userInfo.brokeFixIndex) + "</c><color=#FFFFFF>/秒</c>"
        }
        else
        {
            this.lbStatus.node.active = true;
            this.btnView.node.active = false;
            this.rtProductivity.node.active = false;
            this.lbStatus.string = "未修复"
        }
    },

    onViewClick(){
        ModuleManager.GetInstance().HideModule("StarListPanel")
        EventUtil.GetInstance().DispatchEvent("SwitchStar", this.config)
    }
})