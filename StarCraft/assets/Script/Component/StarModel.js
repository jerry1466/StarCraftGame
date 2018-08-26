/**
 * StarModel
 * @author lijun
 **/
import Databus from 'Databus'
import ResourceManager from "ResourceManager";
import UnitManager from "UnitManager";
import TweenAlpha from 'TweenAlpha';
import StarConfig from 'StarConfig';

let databus = new Databus()
let rotation = 0.05;
cc.Class({
    extends: cc.Component,
    properties: {
        star:cc.Sprite
    },

    onLoad(){
        this._curStarId = -1;
        this._brokeFixIndex = databus.userInfo.brokeFixIndex;
        this._brokeSpList = UnitManager.GetInstance().BrokeSpList;
        this.rotation = 2.5;
    },

    update(dt) {
        this.node.rotation += this.rotation * dt;
    },

    onDestroy() {
    },

    Refresh(){
        var curStarId = databus.userInfo.curStarId;
        var brokeList = StarConfig.GetStarBrokeList(curStarId);
        ResourceManager.LoadRemoteSprite(this.star, StarConfig.GetStarAppearance(curStarId));
        for(var i = databus.userInfo.brokeFixIndex + 1; i < brokeList.length; i++)
        {
            var brokeCfg = brokeList[i];
            if(this._brokeSpList[i] != null)
            {
                this.node.addChild(this._brokeSpList[i]);
                this._brokeSpList[i].name = "Broke" + i;
                this._brokeSpList[i].setPosition(cc.v2(brokeCfg[0], brokeCfg[1]));
                this._brokeSpList[i].active = true;
                var broke = this._brokeSpList[i].getComponent("Broke");
                broke.index = i;
                broke.cost = brokeCfg[2];
            }
        }
        for(var i = 0; i < databus.userInfo.brokeFixIndex; i++)
        {
            this._brokeSpList[i].removeFromParent();
        }
        if(databus.userInfo.brokeFixIndex >= 0)
        {
            if(this._brokeFixIndex == databus.userInfo.brokeFixIndex)
            {
                this._brokeSpList[i].removeFromParent();
            }
            else
            {
                this._brokeFixIndex = databus.userInfo.brokeFixIndex;
                TweenAlpha.begin(this._brokeSpList[databus.userInfo.brokeFixIndex], 1, 0, 0.5, 1);
            }
        }
        if(this._curStarId != curStarId)
        {
            for(var i = 0; i < this._brokeSpList.length; i++)
            {
                this._brokeSpList[i].getComponent("Broke").Select(i == (databus.userInfo.brokeFixIndex + 1));
            }
        }
        this._curStarId = curStarId;
    },

    Switch(){
        this.Refresh();
    }
})