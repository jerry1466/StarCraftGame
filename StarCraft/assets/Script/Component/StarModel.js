/**
 * StarModel
 * @author lijun
 **/
import Databus from 'Databus'
import ResourceManager from "ResourceManager";
import UnitManager from "UnitManager";
import TweenAlpha from 'TweenAlpha';
import ResConfig from "ResConfig";
import StarConfig from 'StarConfig';
import EventUtil from "EventUtil";
import ModuleManager from "ModuleManager";

let databus = new Databus()
let rotation = 0.05;
cc.Class({
    extends: cc.Component,
    properties: {
        star:cc.Sprite
    },

    onLoad(){
        this.SetFixRelatedBrokeHandler = this.OnSetFixRelatedBroke.bind(this);
        EventUtil.GetInstance().AddEventListener("SetFixRelatedBroke", this.SetFixRelatedBrokeHandler);
        this._curStarId = -1;
        this._brokeSpList = [];
        this.rotation = 2.5;
    },

    start(){

    },

    update(dt) {
        this.node.rotation += this.rotation * dt;
    },

    onDestroy() {
        this._brokeSpList = [];
        EventUtil.GetInstance().RemoveEventListener("SetFixRelatedBroke", this.SetFixRelatedBrokeHandler);
    },

    refresh(){
        var curStarId = databus.userInfo.curStarId;
        var brokeList = StarConfig.GetStarBrokeList(curStarId);
        ResourceManager.LoadRemoteSprite(this.star, ResConfig.GetStarIcon(curStarId));
        if(this._brokeSpList.length == 0){
            for(var i = 0; i < brokeList.length; i++)
            {
                this._brokeSpList[i] = UnitManager.GetInstance().FetchBrokeInst();
            }
        }
        for(var i = 0; i < brokeList.length; i++)
        {
            var broke = this._brokeSpList[i].getComponent("Broke");
            if(i <= databus.userInfo.brokeFixIndex){
                broke.SetFixed(true);
            }
            else{
                var brokeCfg = brokeList[i];
                if(this._brokeSpList[i] != null)
                {
                    this._brokeSpList[i].parent = this.node;
                    this._brokeSpList[i].name = "Broke" + i;
                    this._brokeSpList[i].setPosition(cc.v2(brokeCfg[0], brokeCfg[1]));
                    this._brokeSpList[i].active = true;
                    this._brokeSpList[i].opacity = 255;
                    this._brokeSpList[i].zIndex = 50 - i;
                    broke.Init(i, brokeCfg[2]);
                    broke.SetFixed(false);
                }
            }
        }

        if(this._curStarId != curStarId)
        {
            this.node.rotation = 0;
            this.selectBroke(databus.userInfo.brokeFixIndex + 1);
        }
        this._curStarId = curStarId;
    },

    Switch(){
        this.refresh();
    },

    StepNextBroke(){
        var curFixIndex = databus.userInfo.brokeFixIndex + 1;
        var broke = this._brokeSpList[curFixIndex].getComponent("Broke");
        broke.Select(false);
        broke.SetFixed(true);
        var tweenAlpha = TweenAlpha.begin(this._brokeSpList[curFixIndex], 255, 0, 1, 1);
        var that = this
        tweenAlpha.onFinishCallBack = function(){
            databus.AddMoney(2, 0 - broke.cost);
            that._brokeSpList[curFixIndex].removeFromParent();
            var curStarId = databus.userInfo.curStarId;
            var brokeList = StarConfig.GetStarBrokeList(curStarId);
            if(databus.userInfo.brokeFixIndex < brokeList.length - 2)
            {
                databus.userInfo.brokeFixIndex += 1;
                that.selectBroke(databus.userInfo.brokeFixIndex + 1);
            }
            else
            {
                databus.userInfo.brokeFixIndex += 1;
                EventUtil.GetInstance().DispatchEvent("SetFixRelatedBroke", null);
                if(!StarConfig.IsMaxStarId(curStarId))
                {
                    databus.userInfo.maxStarId = curStarId + 1;
                }
                ModuleManager.GetInstance().ShowModule("FixCompleteBox", curStarId);
            }
        }

    },

    selectBroke(brokeIndex){
        if(brokeIndex >= this._brokeSpList.length)
        {
            return;
        }
        for(var i = 0; i < this._brokeSpList.length; i++)
        {
            this._brokeSpList[i].getComponent("Broke").Select(i == brokeIndex);
        }
        this._brokeSpList[brokeIndex].zIndex = 10000;
        this._brokeSpList[brokeIndex].parent.sortAllChildren();
    },

    OnSetFixRelatedBroke(broke){
        if(broke)
        {
            for(var i = 0; i < this._brokeSpList.length; i++)
            {
                if(i != broke.index)
                {
                    this._brokeSpList[i].getComponent("Broke").Select(false);
                }
            }
        }
    },
})