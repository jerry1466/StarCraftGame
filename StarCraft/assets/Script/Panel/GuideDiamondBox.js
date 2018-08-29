/**
 * GuideMeteorBox
 * @author lijun
 **/
import ModuleManager from "ModuleManager";
import ResourceManager from "ResourceManager";
import BasePanel from "BasePanel"
import ResConfig from "ResConfig"
import InterfaceManager from "InterfaceManager";
import ArrayUtil from "ArrayUtil"
import Databus from "Databus"

let databus = new Databus();
cc.Class({
    extends: BasePanel,
    properties: {
        bg: cc.Sprite,
        btnVideo:cc.Button,
        spVideo:cc.Sprite,
        lbNum:cc.Label,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.GuideDiamondBoxBg());
        ResourceManager.LoadRemoteSprite(this.spVideo, ResConfig.VideoBtn());
        if(databus.cfgData != null && databus.cfgData.set.wx_video != null && databus.cfgData.set.wx_video.length > 0)
        {
            this.btnVideo.node.active = true
        }
        else
        {
            this.btnVideo.node.active = false
        }
    },

    start(){
        this.lbNum.string = this.diamondNum.toString();
    },

    update() {

    },

    onDestroy() {

    },


    Init(diamondNum) {
        this.diamondNum = diamondNum;
    },

    onVideo(){
        ModuleManager.GetInstance().HideModule("GuideDiamondBox");
        InterfaceManager.GetInstance().CreateAdViedo(ArrayUtil.GetRandomValue(databus.cfgData.set.wx_video), function(){
            databus.AddMoney(1, 1000);
        });
    },

    onClose(){
        ModuleManager.GetInstance().HideModule("GuideDiamondBox");
    },
})    