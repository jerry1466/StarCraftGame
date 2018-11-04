import ResourceManager from 'ResourceManager'
import LevelManager from 'LevelManager'
import SceneManager from "SceneManager";
import InterfaceManager from "InterfaceManager";
import ModuleManager from "ModuleManager";
import Databus from 'Databus'
import ArrayUtil from "ArrayUtil"
import EventUtil from "EventUtil";
import StatisticManager from "StatisticManager";
import TweenPosition from "TweenPosition"
import ResConfig from "ResConfig";
import ImageLoading from 'ImageLoading'
import PrefabLoading from "PrefabLoading"
import BuffBase from "BuffBase";
import NetUtil from "NetUtil";
import Productor from "Productor";
import StarConfig from "StarConfig";
import AysncImageLoading from "AysncImageLoading";
import BGMConfig from "BGMConfig"

let databus = new Databus()

cc.Class({
    extends: cc.Component,
    properties: {
        bg:{
            default: null,
            type: cc.Sprite,
        },

        index:cc.Node,
        barloading:cc.ProgressBar,
        lbTip:cc.Label,

        preload:cc.Node,
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
        star:cc.Sprite,
        btnRank:cc.Button,
        btnAiWan:cc.Button,
        btnMoreGame:cc.Button,
        btnSound:cc.Button,
        btnAd:cc.Button,
    },

    onLoad:function(){
        cc.view.enableRetina(true);
        this.index.active = true;
        this.preload.active = false;
        SceneManager.GetInstance().SetRoot(this.node);
        //ResourceManager.LoadRemoteSprite(this.spBg, "https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png")
        var that = this;
        this.barloading.progress = 0;
        NetUtil.Request(databus.cfgUrl, {}, function(data){
    	    databus.cfgData = data;
    	    databus.Reset();
    	    that.startLoad();
            if(CC_WECHATGAME)
            {
                InterfaceManager.GetInstance().RegisterShareAppMessageHandler();
            }
        });
        databus.userInfo.curStarId = parseInt(StarConfig.GetStarIds()[0]);
        BuffBase.Init();
        BGMConfig.BgmRegister();
    },

    start(){
        Productor.GetInstance().Start();
    },

    update(){
        if(databus.cfgData)
        {
            var nowTime = new Date();
            var lbTipStr = "精彩即将呈现";
            var dotCnt = Math.floor(nowTime.getSeconds() % 3) + 1;
            for(var i = 0; i < dotCnt; i++)
            {
                lbTipStr = lbTipStr + ".";
            }
            this.lbTip.string = lbTipStr;

            if(this.loadList && this.loadList.length > 0)
            {
                var blockPercent = 1 / this.loadList.length;
                if(this.loadIndex < this.loadList.length){
                    var currentResLoading = this.loadList[this.loadIndex];
                    var totalPerent = (this.loadIndex - 1) * blockPercent + currentResLoading.GetProgress();
                    this.barloading.progress = totalPerent < 0? 0 : totalPerent;

                    if(currentResLoading.IsComplete())
                    {
                        this.loadIndex++;
                        this.doLoad();
                    }
                }
                else{
                    if(this.loadIndex != 0)
                    {
                        this.barloading.progress = 1
                    }
                    else
                    {
                        this.barloading.progress = 0
                    }
                }
            }
        }
    },

    startLoad(){
        this.loadList = [new ImageLoading(), new PrefabLoading()]
        this.loadIndex = 0;
        this.doLoad();
    },

    doLoad(){
        if(this.loadIndex >= this.loadList.length){
            this.onLoadComplete();
            AysncImageLoading.Load();
        }
        else{
            this.loadList[this.loadIndex].Load()
        }
    },

    onLoadComplete(){
        if(CC_WECHATGAME)
        {
            wx.getSystemInfo({
                success:function(res){
                    databus.screenWidth = res.windowWidth
                    databus.screenHeight = res.windowHeight
                    databus.screenTop = databus.screenHeight / 2
                    databus.screenButtom = 0 - databus.screenHeight / 2
                    databus.screenLeft = 0 - databus.screenWidth / 2
                    databus.screenRight = databus.screenWidth / 2
                    databus.isIphoneX = (databus.screenWidth == 375) && (databus.screenHeight == 812)
                    //that.bg.node.width = res.windowWidth
                    //that.bg.node.height = res.windowHeight
                    console.log("设备分辨率:", databus.screenWidth, databus.screenHeight, databus.screenRatio, databus.isIphoneX)

                }
            })
            EventUtil.GetInstance().AddEventListener("EnterBattle", function(){
                ModuleManager.GetInstance().HideModule("LoginPanel")
            })
            this.lbSubscribe.label = databus.cfgData.set.subscribe_text;
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
            databus.screenTop = databus.screenHeight / 2;
            databus.screenButtom = 0 - databus.screenHeight / 2;
            databus.screenLeft = 0 - databus.screenWidth / 2;
            databus.screenRight = databus.screenWidth / 2;
            databus.isIphoneX = false;
            this.lbSubscribe.label = "";
            this.btnShare.node.active = false;
        }
        this.index.active = false;
        this.preload.active = true;
        ResourceManager.LoadRemoteSprite(this.btnEnter, ResConfig.BigBtn());
        ResourceManager.LoadRemoteSprite(this.btnShare, ResConfig.BigBtn());
        ResourceManager.LoadRemoteSprite(this.infer, ResConfig.BubbleBtn());
        // ResourceManager.LoadRemoteSprite(this.star, ResConfig.FatalStarIcon());
        ResourceManager.LoadRemoteSprite(this.btnRank, ResConfig.RankBtn());
        ResourceManager.LoadRemoteSprite(this.btnMoreGame, ResConfig.MoreGameBtn());
        ResourceManager.LoadRemoteSprite(this.btnAiWan, ResConfig.AiwanBtn());
        ResourceManager.LoadRemoteSprite(this.btnSound, ResConfig.AudioBtn());
        ResourceManager.LoadRemoteSprite(this.btnAd, ResConfig.AdBtn());
        this.tweenStage1()
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

    onGmClick(){
        if(this._gmClickCount == null)
        {
            this._gmClickCount = 1;
        }
        else
        {
            this._gmClickCount++;
        }
        if(this._gmClickCount >= 3)
        {
            ModuleManager.GetInstance().ShowModule("CheatPanel");
            this._gmClickCount = 0;
        }
    },

    onEnterClick(){
        new LevelManager().SwitchLevel("battle")
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