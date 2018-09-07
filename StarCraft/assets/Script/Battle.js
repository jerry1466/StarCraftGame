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
import LeftBar from 'LeftBar';
import BottomBar from 'BottomBar';
import StarModel from 'StarModel';
import UnitManager from "UnitManager";
import ResourceManager from "ResourceManager";
import ResConfig from 'ResConfig';
import StarConfig from "StarConfig";
import Coin from 'Coin'
import UIUtil from "UIUtil";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        bgm: cc.AudioSource,
        bg:cc.Sprite,
        meteorCon:Coin,
        fixCon:cc.Node,
        fixCostCon: Coin,
        btnFix:cc.Button,
        btnMyStars: cc.Button,
        btnSearch: cc.Button,
        btnExit: cc.Button,
        hud: HUD,
        leftBar: LeftBar,
        bottomBar: BottomBar,
        star: StarModel,
        tex: cc.Texture2D,
        subFieldView: cc.Sprite
    },

    onLoad () {
        SceneManager.GetInstance().SetRoot(this.node);
        this.tex = new cc.Texture2D();
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.MainBg())
        ResourceManager.LoadRemoteSprite(this.btnSearch, ResConfig.SearchMeteorBtn());
        ResourceManager.LoadRemoteSprite(this.btnMyStars, ResConfig.MyStarListBtn());
        ResourceManager.LoadRemoteSprite(this.btnExit, ResConfig.ExitBtn());
        ResourceManager.LoadRemoteSprite(this.btnFix, ResConfig.FixBtn());
        this.meteorCon.Init(ResConfig.ConBg());
        this.meteorCon.SetCoinType(2);
        this.fixCostCon.Init(ResConfig.FixConBg());
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
        this.meteorCon.UpdateCoin(databus.userInfo.meteor, true);
        if(this._broke){
            this.fixCostCon.UpdateCoin(this._broke.cost);
            if(databus.userInfo.meteor < this._broke.cost)
            {
                this.btnSearch.node.active = true;
                this.btnFix.node.active = false;
            }
            else
            {
                this.btnSearch.node.active = false;
                this.btnFix.node.active = true;
            }
        }
        else
        {
            this.btnSearch.node.active = true;
            this.btnFix.node.active = false;
        }
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
        this._broke = null;
    },

    start() {
        // if(databus.soundEnable) this.bgm.play();
        this.bgm.stop();
        this.refreshStar();
    },

    registerEventHandler(){
        this.refreshStarHandler = this.refreshStar.bind(this);
        EventUtil.GetInstance().AddEventListener("RefreshStar", this.refreshStarHandler);
        this.setFixRelatedBrokeHandler = this.setFixRelatedBroke.bind(this);
        EventUtil.GetInstance().AddEventListener("SetFixRelatedBroke", this.setFixRelatedBrokeHandler);
    },
    
    unRegisterEventHandler(){
        EventUtil.GetInstance().RemoveEventListener("RefreshStar", this.refreshStarHandler);
        EventUtil.GetInstance().RemoveEventListener("SetFixRelatedBroke", this.setFixRelatedBrokeHandler);
    },

    onMyStarList(){
        ModuleManager.GetInstance().ShowModule("StarListPanel")
    },

    onSearchClick(){
        new LevelManager().SwitchLevel("maze");
    },

    onExitClick(){
        new LevelManager().SwitchLevel("preload");
    },

    onFixClick(){
        if(this._broke.fixed == false)
        {
            var moneyType = 2;
            var that = this;
            MoneyUtil.Spend(moneyType, this._broke.cost, "修复该星球破损吗？", function(success){
                if(success){
                    that.star.StepNextBroke();
                }
            })
        }
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

    refreshStar(){
        this.star.Switch()
    },

    setFixRelatedBroke(broke){
        this._broke = broke;
    }
})    