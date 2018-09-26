/**
 * CardScene
 * @author lijun
 **/
import GuideManager from "GuideManager";
import PrefabUtil from "PrefabUtil";
import SceneManager from "SceneManager";
import ArrayUtil from "ArrayUtil";
import EventUtil from "EventUtil";
import AnimationManager from "AnimationManager";
import ModuleManager from "ModuleManager";
import LevelManager from "LevelManager";
import MathUtil from "./Lib/MathUtil";

let STANDARD_NUMBER = 9;
let CARD_NUM = 5;
let layPos =
    [
        [-130, 0],
        [-65, 0],
        [0, 0],
        [65, 0],
        [130, 0],
    ];
let swapPos = [[0, 115], [0, -115]];
cc.Class({
    extends: cc.Component,
    properties: {
        cardContainer:cc.Node,
        lbNum:cc.Label,
    },

    onLoad(){
        this.lbNum.string = "0";
        this.registerEventHandler();
        this.cardList = [];
        this.numList = [];
        var curNum = Math.floor(Math.random() * 10);
        while(this.numList.length < CARD_NUM)
        {
            this.numList.push(curNum);
            curNum = Math.floor(Math.random() * 10);
        }
        this.loadCard(this, 0);
    },

    update() {

    },

    onDestroy() {
        this.unRegisterEventHandler();
    },

    registerEventHandler(){
        this.onCardSummaryHandler = this.onCardSummary.bind(this);
        EventUtil.GetInstance().AddEventListener("CardSummary", this.onCardSummaryHandler);
    },

    unRegisterEventHandler(){
        EventUtil.GetInstance().RemoveEventListener("CardSummary", this.onCardSummaryHandler);
    },

    Init() {

    },

    loadCard(temp, index){
        PrefabUtil.GetPrefabInstance("Card", function(success, instance){
            if(success)
            {
                instance.parent = temp.cardContainer;
                instance.setPosition(cc.v2(layPos[index][0], layPos[index][1]));
                var card = instance.getComponent("Card");
                card.SetSide(0);
                card.Init(temp.numList[index]);
                card.SetTouchEnable(false);
                temp.cardList.push(card);
                index++;
                if(index < CARD_NUM)
                {
                    temp.loadCard(temp, index);
                }
                else
                {
                    GuideManager.AddGuide("card", SceneManager.GetInstance().rootCanvas());
                    temp.showSomeCard();
                }
            }
        });
    },

    shuffle(){
         var combineList = [];
         for(let i = 0; i < layPos.length + swapPos.length; i++)
         {
             if(i < layPos.length)
             {
                 combineList.push(layPos[i]);
             }
             else
             {
                 combineList.push(swapPos[i - layPos.length]);
             }
         }
         let finalPosList = MathUtil.Shuffle(layPos);
         for(let i = 0; i < CARD_NUM; i++)
         {
             var card = this.cardList[i];
             card.SetTargetPos(finalPosList[i]);
             if(i == CARD_NUM - 1)
             {
                 card.Wash(combineList, this.onShuffleEnd.bind(this));
             }
             else
             {
                 card.Wash(combineList);
             }
         }
    },

    onShuffleEnd(){
        GuideManager.AddGuide("pickCard", SceneManager.GetInstance().rootCanvas());
        for(let i = 0; i < CARD_NUM; i++)
        {
            var card = this.cardList[i];
            card.SetTouchEnable(true);
        }
    },

    showSomeCard(){
        this.cardList[0].showNum();
        this.cardList[1].showNum();
        var that = this;
        setTimeout(function(){
            that.cardList[0].hideNum();
            that.cardList[1].hideNum();
            setTimeout(function(){
                that.shuffle();
            }, 1000);
        }, 2000);
    },

    gameEnd(success, perfect){
        var animName = null;
        if(success)
        {
            if(perfect)
            {
                animName = "cardPerfect";
            }
            else
            {
                animName = "cardSuccess";
            }
        }
        else
        {
            animName = "cardFail";
        }
        AnimationManager.PlayAnim(animName, SceneManager.GetInstance().rootCanvas(), cc.v2(0, 0), this.settle, false);
    },

    settle(){
        var total = parseInt(this.lbNum.string);
        ModuleManager.GetInstance().ShowModule("MeteorSettleBox", {title:"游戏结束", meteorNum:total, function(){
            new LevelManager().SwitchLevel("maze");
        }});
    },

    onCardSummary(){
        var total = 0;
        for(let i = 0; i < CARD_NUM; i++)
        {
            var card = this.cardList[i];
            if(card.side == 1)
            {
                total += card.num;
            }
        }
        this.lbNum.string = total.toString();
        if(total < STANDARD_NUMBER)
        {
            this.lbNum.node.color = new cc.Color(255, 255, 255);
        }
        else if(total == STANDARD_NUMBER)
        {
            this.lbNum.node.color = new cc.Color(0, 255, 0);
            this.gameEnd(true, true);
        }
        else
        {
            this.lbNum.node.color = new cc.Color(255, 0, 0);
            this.gameEnd(false, false);
        }
    },

    onEndClick(){
        this.gameEnd(true, false);
    },
})    