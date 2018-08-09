/**
 * 游戏场景
 * @author lijun
 **/
import GameInfo from 'GameInfo'
import EventUtil from 'EventUtil'
import Databus from 'Databus'
import SceneManager from 'SceneManager'
import TweenScale from 'TweenScale'
import TweenPosition from 'TweenPosition'
import AffairConstant from "AffairConstant";
import PrefabUtil from 'PrefabUtil'
import ModuleManager from 'ModuleManager'
import LevelManager from "LevelManager";
import Player from 'Player'
import Enemy from 'Enemy'
import UnitManager from "UnitManager";
import ResourceManager from "ResourceManager";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        bgm: {
            default: null,
            type: cc.AudioSource
        },
        bgmSelectSound: {
            default: null,
            type: cc.AudioSource
        },
        bgmWipeOff: {
            default: null,
            type: cc.AudioSource
        },
        bgmWin: {
            default: null,
            type: cc.AudioSource
        },
        bgmLose: {
            default: null,
            type: cc.AudioSource
        },
        bgmExplod: {
            default: null,
            type: cc.AudioSource
        },
        bg: {
            default: null,
            type: cc.Sprite,
        },
        borderTop:{
            default: null,
            type: cc.Sprite,
        },
        borderBottom:{
            default: null,
            type: cc.Sprite,
        },
        borderLeft:{
            default: null,
            type: cc.Sprite,
        },
        borderRight:{
            default: null,
            type: cc.Sprite,
        },
        player:{
            default: null,
            type: Player,
        },
        enemy:{
            default: null,
            type: Enemy,
        },
        itemBar:cc.Node,
        clickArea:cc.Node,
        subFieldView:cc.Sprite,
        cutScene:{
            default: null,
            type: cc.Sprite,
        },
    },

    onLoad () {
        this.tex = new cc.Texture2D();
        ResourceManager.LoadRemoteSprite(this.bg, "https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png")
        databus.mission = new LevelManager().CurrentLevelParam
        databus.screenRatio = databus.screenWidth / 960
        this.borderTop.node.width = databus.screenWidth
        this.borderBottom.node.width = databus.screenWidth
        this.borderTop.node.height = (databus.screenHeight - databus.gameRegion.y - databus.adHeight) * 0.5
        this.borderBottom.node.height = (databus.screenHeight - databus.gameRegion.y + databus.adHeight) * 0.5
        this.borderLeft.node.height = databus.screenHeight
        this.borderRight.node.height = databus.screenHeight
        this.borderLeft.node.width = this.borderRight.node.width = (databus.screenWidth - databus.gameRegion.x) * 0.5;
        this.bg.node.width = databus.gameRegion.x
        this.bg.node.height = databus.gameRegion.y
        this.bg.node.y = 0.5 * databus.adHeight
        this.player.node.x = databus.gameRegion.x * 0.25
        this.player.node.y = -(databus.gameRegion.y - databus.adHeight) * 0.5 + this.player.node.height * 0.5
        this.enemy.node.x = -databus.gameRegion.x * 0.25
        this.enemy.node.y = -(databus.gameRegion.y - databus.adHeight) * 0.5 + this.enemy.node.height * 0.5
        this.itemBar.x = databus.gameRegion.x * 0.4
        this.itemBar.y = databus.gameRegion.y * 0.5
        this.clickArea.x = this.clickArea.y = 0;
        this.clickArea.width = databus.gameRegion.x;
        this.clickArea.height = databus.gameRegion.y;
        this.subFieldView.x = this.subFieldView.y = 0;
        this.subFieldView.width = databus.gameRegion.x;
        this.subFieldView.height = databus.gameRegion.y;
        UnitManager.GetInstance().player = this.player.node
        UnitManager.GetInstance().enemy = this.enemy.node
    },

    // 刷新子域的纹理
    _updateSubDomainCanvas() {
        if (window.sharedCanvas != undefined) {
            this.tex.initWithElement(window.sharedCanvas);
            this.tex.handleLoadedTexture();
            this.subFieldView.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },

    update() {
        if(!ModuleManager.GetInstance().IsModuleShow("RankPanel"))
        {
            this.subFieldView.node.active = true;
            this._updateSubDomainCanvas();
        }
        else {
            this.subFieldView.node.active = false;
        }
    },

    onDestroy() {

    },

    start() {
        console.log("enter battle start this:", this)
        this.bgmWin.stop()
        this.bgmLose.stop()
        this.bgmExplod.stop()
        this.bgmWipeOff.stop()
        this.bgmSelectSound.stop()
        databus.battleInstance = this
        console.log("enter battle start temp:", databus.battleInstance)
        var _this = this
        EventUtil.GetInstance().AddEventListener("PlaySelectSound", function(){
                if(databus.soundEnable)
                    databus.battleInstance.bgmSelectSound.play()
            }
        )
        EventUtil.GetInstance().AddEventListener("PlayWinSound", function(){
                _this.player.EnterWin()
                _this.enemy.EnterFail()
                if(databus.soundEnable)
                    databus.battleInstance.bgmWipeOff.play()
            }
        )
        EventUtil.GetInstance().AddEventListener("PlayLoseSound", function() {
                _this.player.EnterFail()
                _this.enemy.EnterWin()
                if(databus.soundEnable)
                    databus.battleInstance.bgmExplod.play()
            }
        )
        EventUtil.GetInstance().AddEventListener("ResetCountDown", function(){
            databus.battleInstance.resetCountDown(databus.battleInstance)
            }
        )
        EventUtil.GetInstance().AddEventListener("GameOver", function(){
            databus.battleInstance.gameOver(databus.battleInstance)
            }
        )
        EventUtil.GetInstance().AddEventListener("GameRestart", function(){
            databus.battleInstance.gameRestart(databus.battleInstance)
            }
        )
        EventUtil.GetInstance().AddEventListener("UpdateScore", function(param){
            databus.battleInstance.updateScore(databus.battleInstance, param)
            }
        )
        EventUtil.GetInstance().AddEventListener("CreateAffair", function(affair){
                console.log("enter create affair", databus.battleInstance)
            databus.battleInstance.createAffair(databus.battleInstance, affair)
            }
        )
        EventUtil.GetInstance().AddEventListener("Reborn", function() {
                databus.battleInstance.reborn(databus.battleInstance)
            }
        )
        EventUtil.GetInstance().AddEventListener("PlayCutScene", function(){
                _this.cutScene.node.active = true
                var tweenScale = TweenScale.begin(_this.cutScene.node, cc.v2(0.1, 0.1), cc.v2(1, 1), 0.5, 1)
                tweenScale.onFinishCallBack = function(){
                    _this.cutScene.node.active = false
                }
            }
        )
        EventUtil.GetInstance().AddEventListener("GameStart", function() {
                _this.player.EnterIdle()
                _this.enemy.EnterIdle()
            }
        )
        EventUtil.GetInstance().AddEventListener("PlayFreezeEffect", function() {
            PrefabUtil.GetPrefabInstance("FreezeEffect1", function(success, instance){
                if(success)
                {
                    instance.parent = _this.node;
                    var tweenPos = TweenPosition.begin(instance, cc.v2(_this.enemy.node.x, _this.enemy.node.y + 300), cc.v2(_this.enemy.node.x, _this.enemy.node.y), 0.5)
                    tweenPos.onFinishCallBack = function(){
                        instance.removeFromParent();
                        instance.destroy();
                        PrefabUtil.GetPrefabInstance("FreezeEffect2", function(success, instance) {
                            if(success)
                            {
                                _this.freezeIcy = instance;
                                instance.parent = _this.node;
                                instance.x = _this.enemy.node.x;
                                instance.y = _this.enemy.node.y - _this.enemy.node.height * 0.5;
                                TweenScale.begin(instance, cc.v2(1, 0), cc.v2(1, 1), 0.3, 1);
                            }
                        })
                    }
                }
            })
        })

        EventUtil.GetInstance().AddEventListener("StopFreezeEffect", function() {
                if(_this.freezeIcy)
                {
                    _this.freezeIcy.removeFromParent();
                    _this.freezeIcy.destroy();
                    _this.freezeIcy = null;
                }
            }
        )

        EventUtil.GetInstance().AddEventListener("ReturnToPreload", function() {
            EventUtil.GetInstance().RemoveEventKey("PlaySelectSound")
            EventUtil.GetInstance().RemoveEventKey("PlayWinSound")
            EventUtil.GetInstance().RemoveEventKey("PlayLoseSound")
            EventUtil.GetInstance().RemoveEventKey("ResetCountDown")
            EventUtil.GetInstance().RemoveEventKey("GameOver")
            EventUtil.GetInstance().RemoveEventKey("GameRestart")
            EventUtil.GetInstance().RemoveEventKey("UpdateScore")
            EventUtil.GetInstance().RemoveEventKey("CreateAffair")
            EventUtil.GetInstance().RemoveEventKey("Reborn")
            EventUtil.GetInstance().RemoveEventKey("PlayCutScene")
            EventUtil.GetInstance().RemoveEventKey("GameStart")
            EventUtil.GetInstance().RemoveEventKey("PlayFreezeEffect")
            EventUtil.GetInstance().RemoveEventKey("StopFreezeEffect")
                setTimeout(function(){
                    new LevelManager().SwitchLevel("preload", 1)
                }, 100)
            }
        )

        if(databus.soundEnable) this.bgm.play()
        SceneManager.GetInstance().rootCanvas = this.node
        GameInfo.GetInstance().Start()
    },

    gameRestart(temp){
        temp.start()
    },

    onPlayClick(){
        if(databus.gameStart && !databus.gameOver)
        {
            console.log("Hit happened")
            GameInfo.GetInstance().Hit(true)
        }
    },

    onPauseClick(){
        this.enterPause()
    },

    onQuestionClick(){
        ModuleManager.GetInstance().ShowModule("RuleTipPanel")
    },

    enterPlay(){
        this.btnPlay.active = false
        this.btnPause.active = true
    },

    enterPause(){
        this.btnPlay.active = true
        this.btnPause.active = false
    },

    resetCountDown(temp){
    },

    gameOver(temp){
        temp.bgm.stop()
        if(databus.win){
            if(databus.soundEnable)
            {
                temp.bgmWin.play()
            }
        }else{
            if(databus.soundEnable)
            {
                temp.bgmLose.play()
            }
        }
    },

    reborn(temp){
        temp.bgm.play()
        temp.resetCountDown(temp)
    },

    updateScore(temp, param){
        temp.lbScore.string = databus.score
        if(param == true){
            var tweenScale = TweenScale.begin(temp.lbScore.node, cc.v2(1, 1), cc.v2(1.75, 1.75), 0.15, 1)
            tweenScale.onFinishCallBack = function() {
                TweenScale.begin(temp.lbScore.node, cc.v2(1.75, 1.75), cc.v2(1, 1), 0.15, 1)
            }
        }
    },

    createAffair(temp, affair){
        var affairText = null
        if(affair == AffairConstant.AffairEnum().UP_MOVE){
            affairText = "↑"
        }
        else if(affair == AffairConstant.AffairEnum().DOWN_MOVE){
            affairText = "↓"
        }
        else if(affair == AffairConstant.AffairEnum().LEFT_MOVE){
            affairText = "←"
        }
        else if(affair == AffairConstant.AffairEnum().RIGHT_MOVE){
            affairText = "→"
        }
        if(affairText != null)
        {
            console.log("temp:", temp)
            temp.lbAffair.node.active = true
            temp.lbAffair.string = affairText
            temp.conAffairFill.active = false
        }
        else
        {
            temp.lbAffair.node.active = false
            temp.conAffairFill.active = true
            temp.conAffairFill.removeAllChildren()
            var fillTypeArr = databus.GetNextFillType(false)
            var fillType1 = fillTypeArr[0]
            var fillType2 = fillTypeArr[1]
            PrefabUtil.GetPrefabInstance("Prefab/CellPic_" + fillType2, function(success, instance){
                if(success)
                {
                    instance.parent = temp.conAffairFill
                    instance.y = 0
                    PrefabUtil.GetPrefabInstance("Prefab/CellPic_" + fillType1, function(success, instance){
                        if(success)
                        {
                            instance.parent = temp.conAffairFill
                            instance.y = 0
                            console.log("conAffairFill childCount:", temp.conAffairFill.childrenCount)
                        }
                    })
                }
            })
        }
    },
})    