/**
 * MissionPanel
 * @author lijun
 **/
import BasePanel from 'BasePanel'
import EventUtil from 'EventUtil'
import Databus from 'Databus'
import ResourceManager from 'ResourceManager'
import ModuleManager from "ModuleManager";

let databus = new Databus()

let intro = {
    "mission_1":
        {
            "name":"施诗",
            "favor":"化妆",
            "three":"33，25，35"
        },
    "mission_2":
        {
            "name":"瑶瑶",
            "favor":"干净的水",
            "three":"34，23，34"
        },
    "mission_3":
        {
            "name":"家琪",
            "favor":"健身",
            "three":"38，29，39"
        },
    "mission_4":
        {
            "name":"熙蕾",
            "favor":"写作，花艺",
            "three":"35，23，35"
        },
    "mission_5":
        {
            "name":"芝玟",
            "favor":"吃遍美食",
            "three":"30，26，38"
        },
    "mission_6":
        {
            "name":"心心",
            "favor":"绘画",
            "three":"27，22，34"
        },
    "mission_7":
        {
            "name":"甜恬",
            "favor":"厨艺，健身",
            "three":"34，22，36"
        },
    "mission_8":
        {
            "name":"棠研",
            "favor":"小点心，养猫",
            "three":"30，24，32"
        },
    "mission_9":
        {
            "name":"田丽莉",
            "favor":"看书，种植",
            "three":"35，24，34"
        },
    "mission_10":
        {
            "name":"美缇",
            "favor":"音乐，运动",
            "three":"30，27，37"
        },
    "mission_11":
        {
            "name":"卓恩",
            "favor":"唱歌，交朋友",
            "three":"27，23，33"
        },
    "mission_12":
        {
            "name":"安吉拉",
            "favor":"养各种小动物",
            "three":"24，22，29"
        },
    "mission_13":
        {
            "name":"蜜蜜",
            "favor":"打榜封面人物",
            "three":"33，25，30"
        },
    "mission_14":
        {
            "name":"古娜",
            "favor":"美容，收集",
            "three":"34，23，34"
        },
    "mission_15":
        {
            "name":"佳欣",
            "favor":"制作唐彩",
            "three":"32，21，37"
        },
}

cc.Class({
    extends: BasePanel,
    properties: {
        spHead:cc.Sprite,
        lbName: {
            default: null,
            type: cc.Label,
        },
        lbFavor: {
            default: null,
            type: cc.Label,
        },
        lbThree: {
            default: null,
            type: cc.Label,
        },
    },

    update() {

    },

    start(){

    },

    onDestroy() {

    },

    Init(mission) {
        ResourceManager.LoadRemoteSprite(this.spHead, "https://cdn-game.2zhuji.cn/uploads/yxhzbzk/head/" + mission + "-h.png")
        this.lbName.string = intro["mission_" + mission]["name"]
        this.lbFavor.string = intro["mission_" + mission]["favor"]
        this.lbThree.string = intro["mission_" + mission]["three"]
    },

    onClose(){
        ModuleManager.GetInstance().HideModule("IntroducePanel")
        ModuleManager.GetInstance().ShowModule("MissionSelectPanel")
    }
})