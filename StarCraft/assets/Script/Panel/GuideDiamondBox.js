/**
 * GuideMeteorBox
 * @author lijun
 **/
import ModuleManager from "ModuleManager";
import ResourceManager from "ResourceManager";
import BasePanel from "BasePanel";
import ResConfig from "ResConfig";
import InterfaceManager from "InterfaceManager";
import Databus from "Databus";
import EventUtil from "EventUtil";
import SceneManager from "SceneManager";
import UIUtil from "UIUtil";

let databus = new Databus();
cc.Class({
    extends: BasePanel,
    properties: {
        bg: cc.Sprite,
        btnShare:cc.Button,
        lbCostNum:cc.Label,
        btnClose:cc.Button,
        costIcon:cc.Sprite,
        lbRewardNum:cc.Label,
        rewardIcon:cc.Sprite,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.GuideDiamondBoxBg());
        ResourceManager.LoadRemoteSprite(this.btnShare, ResConfig.BigBtn());
        ResourceManager.LoadRemoteSprite(this.btnClose, ResConfig.CloseBtn());
        ResourceManager.LoadRemoteSprite(this.costIcon, ResConfig.DiamondIcon());
        ResourceManager.LoadRemoteSprite(this.rewardIcon, ResConfig.DiamondIcon());
        //if(databus.cfgData != null && databus.cfgData.audit == 1)
        //{
            this.btnShare.node.active = true
        //}
        //else
        //{
        //    this.btnShare.node.active = false
        //}
    },

    start(){
        this.lbCostNum.string = this.diamondNum.toString();
        this.lbRewardNum.string = "+" + databus.shareRewardDiamond.toString();
    },

    update() {

    },

    onDestroy() {
        EventUtil.GetInstance().RemoveEventListener("ShareSuccess", this.ShareSuccessHandler);
        EventUtil.GetInstance().DispatchEvent("FreeTouch");
    },


    Init(diamondNum) {
        this.diamondNum = diamondNum;
    },

    onShare(){
        this.ShareSuccessHandler = this.onShareSucess.bind(this);
        EventUtil.GetInstance().AddEventListener("ShareSuccess", this.ShareSuccessHandler);
        InterfaceManager.GetInstance().ShareWithImg();
    },

    onClose(){
        ModuleManager.GetInstance().HideModule("GuideDiamondBox");
    },

    onShareSucess(){
        ModuleManager.GetInstance().HideModule("GuideDiamondBox");
        var moneyType = 1;
        var moneyNum = databus.shareRewardDiamond;
        databus.AddMoney(moneyType, moneyNum);
        UIUtil.ShowMoneyNotice(moneyType, moneyNum, SceneManager.GetInstance().rootCanvas(), cc.v2(0, 250))
    }
})    