/**
 * 主星球场景
 * @author lijun
 **/
import GameInfo from 'GameInfo'
import EventUtil from 'EventUtil'
import MoneyUtil from 'MoneyUtil'
import Databus from 'Databus'
import SceneManager from 'SceneManager'
import TweenScale from 'TweenScale'
import TweenPosition from 'TweenPosition'
import AffairConstant from "AffairConstant";
import PrefabUtil from 'PrefabUtil'
import ModuleManager from 'ModuleManager'
import LevelManager from "LevelManager";
import HUD from 'HUD'
import ButtonEx from 'ButtonEx'
import LeftBar from 'LeftBar';
import BottomBar from 'BottomBar';
import StarModel from 'StarModel';
import UnitManager from "UnitManager";
import ResourceManager from "ResourceManager";
import ResConfig from 'ResConfig';
import StarConfig from "./Data/StarConfig";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        bgm: cc.AudioSource,
        btnMyStars: ButtonEx,
        btnFix: ButtonEx,
        btnSearch: ButtonEx,
        hud: HUD,
        leftBar: LeftBar,
        bottomBar: BottomBar,
        star: StarModel,
        tex: cc.Texture2D,
        subFieldView: cc.Sprite
    },

    onLoad () {
        SceneManager.GetInstance().rootCanvas = this.node
        this.tex = new cc.Texture2D();
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.MainBg())

        this.registerEventHandler();
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
        if(databus.showNextGoal)
        {
            this.subFieldView.node.active = true;
            this._updateSubDomainCanvas();
        }
        else {
            this.subFieldView.node.active = false;
        }
    },

    onDestroy() {
        this.unRegisterEventHandler();
    },

    start() {
        if(databus.soundEnable) this.bgm.play()
    },

    registerEventHandler(){
        EventUtil.GetInstance().AddEventListener("RefreshStar", this.refreshStar)
        EventUtil.GetInstance().AddEventListener("SwitchStar", this.switchStar)
    },
    
    unRegisterEventHandler(){
        EventUtil.GetInstance().RemoveEventListener("RefreshStar", this.refreshStar)
        EventUtil.GetInstance().RemoveEventListener("SwitchStar", this.switchStar)
    },

    onMyStarList(){
        ModuleManager.GetInstance().ShowModule("StarListPanel")
    },

    onSearchClick(){
        LevelManager.GetInstance().SwitchLevel("Maze")
    },

    onFixClick(){
        var fixCost = StarConfig.GetStarBrokeList(databus.userInfo.brokeFixIndex + 1);
        var moneyType = 2;
        MoneyUtil.Spend(moneyType, fixCost, "修复该星球破损吗？", function(success){
            if(success){
                databus.AddMoney(moneyType, 0-fixCost);
            }
        })
    },

    refreshStar(){
        this.star.Refresh()
    },

    switchStar(){
        this.star.Switch()
    }
})    