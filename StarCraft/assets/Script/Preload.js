import Scene from 'Scene'
import LevelManager from 'LevelManager'
import SceneManager from "SceneManager";
import InterfaceManager from "InterfaceManager";
import ModuleManager from "ModuleManager";
import Databus from 'Databus'
import ArrayUtil from "ArrayUtil"
import EventUtil from "EventUtil";
import StatisticManager from "StatisticManager";
import TweenPosition from "TweenPosition"
import BuffBase from "BuffBase";

let databus = new Databus()

cc.Class({
    extends: cc.Component,
    properties: {
        bg:{
            default: null,
            type: cc.Sprite,
        },
        btnEnter:{
            default: null,
            type:cc.Button,
        },

        btnShare: {
            default: null,
            type:cc.Button
        },

        lbSubscribe:{
            default: null,
            type:cc.Label
        },

        infer:cc.Node,
    },

    onLoad:function(){
        var temp = this
        SceneManager.GetInstance().SetRoot(this.node);
        if(CC_WECHATGAME)
        {
            wx.getSystemInfo({
                success:function(res){
                    databus.screenWidth = res.windowWidth
                    databus.screenHeight = res.windowHeight
                    databus.screenTop = databus.screenHeight
                    databus.screenButtom = 0
                    databus.screeLeft = 0 - databus.screenWidth / 2
                    databus.screeRight = databus.screenWidth / 2
                    databus.isIphoneX = (databus.screenWidth == 375) && (databus.screenHeight == 812)
                    //temp.bg.node.width = res.windowWidth
                    //temp.bg.node.height = res.windowHeight
                    console.log("设备分辨率:", databus.screenWidth, databus.screenHeight, databus.screenRatio, databus.isIphoneX)

                }
            })
            EventUtil.GetInstance().AddEventListener("EnterBattle", function(){
                ModuleManager.GetInstance().HideModule("LoginPanel")
            })
            this.lbSubscribe.label = databus.cfgData.set.subscribe_text
            if(databus.cfgData.audit == 1)
            {
                this.btnShare.node.active = false
            }
            else
            {
                this.btnShare.node.active = true
            }
            if(databus.cfgData.set.wx_bannner != null && databus.cfgData.set.wx_bannner.length > 0)
            {
                InterfaceManager.GetInstance().CreateAdBanner(ArrayUtil.GetRandomValue(databus.cfgData.set.wx_bannner))
            }
            if(databus.userInfo == null)
            {
                StatisticManager.getInstance().statistics()
            }
        }
        else{
            databus.screenWidth = 375;
            databus.screenHeight = 850;
            databus.screenTop = databus.screenHeight;
            databus.screenButtom = 0;
            databus.screeLeft = 0 - databus.screenWidth / 2;
            databus.screeRight = databus.screenWidth / 2;
            databus.isIphoneX = false;
            this.lbSubscribe.label = "";
            this.btnShare.node.active = false;
        }
        //ResourceManager.LoadRemoteSprite(this.bg, "https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png")
        this.tweenStage1()
    },

    update(){
    },

    tweenStage1(){
        var tweenPos = TweenPosition.begin(this.infer, cc.v2(91, 12), cc.v2(91, 7), 0.25, 1)
        var that = this
        tweenPos.onFinishCallBack = function(){
            that.tweenStage2()
        }
    },

    tweenStage2(){
        var tweenPos = TweenPosition.begin(this.infer, cc.v2(91, 7), cc.v2(91, 12), 0.25, 1)
        var that = this
        tweenPos.onFinishCallBack = function(){
            that.tweenStage1()
        }
    },

    onDestroy(){
    },

    start(){
        if(CC_WECHATGAME)
        {
            setTimeout(function(){
                InterfaceManager.GetInstance().RegisterShareAppMessageHandler()
            }, 300)
        }
    },

    onEnterClick(){
        new LevelManager().SwitchLevel("battle", databus.startMission)
    },

    onShareClick(){
        InterfaceManager.GetInstance().ShareWithImg()
    },

    onRankClick(){
        ModuleManager.GetInstance().ShowModule("SimpleRankPanel")
    },

    onAiWanClick(){
        this.onAdClick()
    },

    onMoreGameClick(){
        ModuleManager.GetInstance().ShowModule("AdPanel")
    },

    onSoundClick(){
        databus.soundEnable = !databus.soundEnable
        var title = databus.soundEnable? "开启音效":"关闭音效"
        wx.showToast({title:title})
    },

    onAdClick(){
        //new LevelManager().SwitchLevel("ad", "0")
        wx.previewImage({
            urls:[ArrayUtil.GetRandomValue(databus.cfgData.set.more_game_ad.poster).img],
            success:function(res){
                console.log(res)
            }
        })
    },
});