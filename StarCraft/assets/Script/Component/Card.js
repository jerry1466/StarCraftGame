/**
 * Card
 * @author lijun
 **/
import ArrayUtil from "ArrayUtil";
import TweenPosition from "TweenPosition";
import TweenScale from "TweenScale";
import EventUtil from "EventUtil";

cc.Class({
    extends: cc.Component,
    properties: {
        side_0:cc.Node,
        side_1:cc.Node,
        lbNum:cc.Label,
    },

    update() {

    },

    onDestroy() {

    },


    Init(num) {
        this.num = num;
        this.lbNum.string = num.toString();
    },

    SetSide(side){
        this.side = side;
        if(side == 0)
        {
            this.side_0.active = true;
            this.side_1.active = false;
        }
        else
        {
            this.side_0.active = false;
            this.side_1.active = true;
        }
    },

    SetTouchEnable(value){
        this.touchEnable = value;
    },

    SetTargetPos(targetPos){
        this.targetPos = targetPos;
    },

    Wash(posList, callback){
        this.posList = posList;
        this.washIndex = 0;
        this.doMove(this, callback);
    },

    doMove(temp, callback){
        var pos = ArrayUtil.GetRandomValue(temp.posList);
        var targetPos = cc.v2(pos[0], pos[1]);
        if(temp.washIndex == 12)
        {
            targetPos = cc.v2(temp.targetPos[0], temp.targetPos[1]);
        }
        var tweenPos = TweenPosition.begin(temp.node, temp.node.position, targetPos, 0.35);
        tweenPos.onFinishCallBack = function(){
            if(temp.washIndex <= 12)
            {
                temp.doMove(temp, callback);
            }
            else
            {
                if(callback)
                {
                    callback();
                }
            }
        }
        temp.washIndex++;
    },

    showNum(){
        this.reverseSide(1, true);
    },

    hideNum(){
        this.reverseSide(0, true);
    },

    reverseSide(side, preview){
        var tweenScale = TweenScale.begin(this.node, cc.v2(1, 1), cc.v2(0, 1), 0.5, 1);
        var that = this;
        tweenScale.onFinishCallBack = function(){
            that.SetSide(side);
            var tweenScale2 = TweenScale.begin(that.node, cc.v2(0, 1), cc.v2(1, 1), 0.5, 1);
            tweenScale2.onFinishCallBack = function(){
                if(!preview)
                {
                    EventUtil.GetInstance().DispatchEvent("CardSummary");
                }
            }
        }
    },

    onClick(){
        if(this.side == 0 && this.touchEnable)
        {
            this.reverseSide(1, false);
        }
    }


})    