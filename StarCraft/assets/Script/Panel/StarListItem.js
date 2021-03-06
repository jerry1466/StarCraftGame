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
import MoneyUtil from "MoneyUtil";
import UIUtil from "UIUtil";

let databus = new Databus()

cc.Class({
    extends: cc.Component,
    properties: {
        bg:cc.Sprite,
        spIcon:cc.Sprite,
        lbName:cc.Label,
        lbIntro:cc.Label,
        rtProductivity:cc.RichText,
        lbStatus:cc.Label,
        btnView:cc.Button,
        // btnUnlock:cc.Button,
        // costNum:cc.Label,
    },

    update() {

    },

    start(){

    },

    onDestroy() {

    },

    Init(config){
        this.config = config;
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.StarListItemBg());
        ResourceManager.LoadRemoteSprite(this.spIcon, ResConfig.GetStarIcon(this.config["id"]));
        // ResourceManager.LoadRemoteSprite(this.btnUnlock, ResConfig.UnlockBtn());
        ResourceManager.LoadRemoteSprite(this.btnView, ResConfig.ViewStarBtn());
        this.lbName.string = config["name"];
        this.lbIntro.string = config["intro"];
        this.rtProductivity.font = "黑体";
        if(config.id <= databus.userInfo.curStarId)
        {
            this.lbStatus.node.active = false;
            // this.btnUnlock.node.active = false;
            this.btnView.node.active = true;
            this.rtProductivity.node.active = true;
            this.rtProductivity.string = "<color=#EDF700>产量：" + Productor.GetInstance().GetStarProductivity(config, databus.userInfo.brokeFixIndex) + "</c><color=#FFFFFF>/秒</c>";
            this.spIcon.node.color = new cc.Color(255, 255, 255);
        }
        /*
        else if(databus.IsCurStarFixed() && config.id == databus.userInfo.curStarId + 1)
        {
            this.lbStatus.node.active = false;
            // this.btnUnlock.node.active = true;
            // this.costNum.string = this.config["unlock"];
            this.btnView.node.active = false;
            this.rtProductivity.node.active = false;
        }
        */
        else
        {
            this.lbStatus.node.active = true;
            // this.btnUnlock.node.active = false;
            this.btnView.node.active = false;
            this.rtProductivity.node.active = false;
            this.lbStatus.string = "未解锁";
            this.spIcon.node.color = new cc.Color(0, 0, 0);
        }
    },

    onViewClick(){
        ModuleManager.GetInstance().HideModule("StarListPanel");
        EventUtil.GetInstance().DispatchEvent("RefreshStar", this.config);
    },
})