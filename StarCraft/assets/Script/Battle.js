/**
 * 主星球场景
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
import HUD from 'HUD'
import ButtonEx from 'ButtonEx'
import LeftBar from 'LeftBar';
import BottomBar from 'BottomBar';
import StarModel from 'StarModel';
import UnitManager from "UnitManager";
import ResourceManager from "ResourceManager";
import ResConfig from 'ResConfig';

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
    },
    
    unRegisterEventHandler(){
        EventUtil.GetInstance().RemoveEventListener("RefreshStar", this.refreshStar)
    },

    onSearchClick(){
        ModuleManager.GetInstance().ShowModule("StarListPanel")
    },

    onFixClick(){

    },

    refreshStar(){
        this.star.Refresh()
    }
})    