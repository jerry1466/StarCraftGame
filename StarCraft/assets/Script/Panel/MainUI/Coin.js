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
        btnAdd:cc.Button
    },

    onLoad(){
        this._coinNum = 0;
        this._coinType = 0;
    },

    UpdateCoin(coinNum){
        this.lbNum.string = coinNum;
        if(coinNum > this._coinNum)
        {
            TweenScale.begin(this.lbNum, cc.v2(1, 1), cc.v2(1.2, 1.2), 0.2, 1);
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