/**
 * Coin
 * @author lijun
 **/
import Databus from 'Databus'
import TweenScale from 'TweenScale'
import ResourceManager from 'ResourceManager'
import ResConfig from 'ResConfig'

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        spBg:cc.Sprite,
        spIcon:cc.Node,
        lbNum:cc.Label,
        btnAdd:cc.Button,
        lbTitle:cc.Label,
    },

    onLoad(){
        this._coinNum = 0;
        this._coinType = 0;
    },

    Init(resBg, measureName, titleName){
        ResourceManager.LoadRemoteSprite(this.spBg, resBg);
        this.tweening = false;
        this.measureName = measureName || "";
        this.titleName = titleName || "";
    },

    InitIcon(resIcon){
        ResourceManager.LoadRemoteSprite(this.spIcon, resIcon);
    },

    UpdateCoin(coinNum, doTween){
        this.lbNum.string = coinNum + this.measureName;
        if(this.lbTitle)
        {
            this.lbTitle.string = this.titleName;
        }
        if(doTween && this._coinNum > 0 && coinNum > this._coinNum && !this.tweening)
        {
            this.tweening = true;
            var that = this;
            var large = cc.v2(0.6, 0.6);
            var normal = cc.v2(0.5, 0.5);
            var tweenScale1 = TweenScale.begin(this.lbNum.node, normal, large, 0.35, 1);
            tweenScale1.onFinishCallBack = function(){
                var tweenScale2 = TweenScale.begin(that.lbNum.node, large, normal, 0.35, 1);
                tweenScale2.onFinishCallBack = function(){
                    that.tweening = false;
                }
            }
        }
        this._coinNum = coinNum;
    },

    SetCoinType(coinType){
        this._coinType = coinType
        if(coinType == 1)
        {
            ResourceManager.LoadRemoteSprite(this.spIcon, ResConfig.DiamondIcon())
        }
        else
        {
            ResourceManager.LoadRemoteSprite(this.spIcon, ResConfig.MeteorIcon())
        }
    },

    OnAddClick(){
        if(this._coinType == 1)
        {
            wx.showToast({title:"钻石充值暂未开放"})
        }
        else
        {
            wx.showToast({title:"流星充值暂未开放"})
        }
    }
})