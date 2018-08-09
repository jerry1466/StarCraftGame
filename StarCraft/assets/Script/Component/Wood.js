/**
 * Wood
 * @author lijun
 **/
import Databus from 'Databus'
import GameInfo from "GameInfo"
import ModuleManager from "ModuleManager";
import EventUtil from "EventUtil";
import Cd from "Cd"
import MissionConfig from "MissionConfig";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        xDirection:1,
    },

    onLoad(){
        this.hitting = false
        this.changeSpeedCD = new Cd(500, false)
        this.orignalMoveSpeed = new MissionConfig().GetMissionMoveSpeed(databus.mission)
        this.additionMoveSpeed = this.orignalMoveSpeed * 1.3
        this.moveSpeed = this.orignalMoveSpeed
    },

    update() {
        if(!this.isMe && (databus.freezeTimeStamp > 0 || databus.freezeTimeStamp + databus.freezeDuration > Date.now()))
        {
            return;
        }
        if(databus.gameStart && !databus.gamePause && !databus.gameOver)
        {
            if(this.hitting)
            {
                this.node.x += databus.hitSpeed * this.xDirection
                if(this.check && GameInfo.GetInstance().CheckHitWall(this.node))
                {
                    this.xDirection *= -1
                    this.check = false
                }
                else if(this.check && GameInfo.GetInstance().CheckHitBrick(this.node))
                {
                    this.xDirection *= -1
                    this.check = false
                    EventUtil.GetInstance().DispatchEvent("PlaySelectSound")
                }
                else if(this.check && ((this.xDirection < 0 && this.node.x <= -databus.wallWidth * 0.5) || (this.xDirection > 0 && this.node.x >= databus.wallWidth * 0.5)))
                {
                    this.xDirection *= -1
                    this.check = false
                }
                else if(this.node.x <= databus.xLeftWood || this.node.x >= databus.xRightWood)
                {
                    this.xDirection *= -1
                    this.hitting = false
                    if(databus.guide2 == true)
                    {
                        databus.guide2 = false
                        databus.gamePause = true
                        ModuleManager.GetInstance().ShowModule("Guide", 2)
                        databus.passGuide = true
                    }
                }
            }
            else
            {
                this.node.y += this.moveSpeed * this.yDirection
                if((this.node.y + this.node.height * 0.5 + 5 >= (databus.gameRegion.y + databus.adHeight) * 0.5) || (this.node.y - this.node.height * 0.5 - 5 <= 0 - (databus.gameRegion.y - databus.adHeight) * 0.5))
                {
                    this.yDirection *= -1;
                }
                if(databus.guide1 == true && this.isMe && GameInfo.GetInstance().CheckBrickAlignWood(this.node))
                {
                    databus.gamePause = true
                    ModuleManager.GetInstance().ShowModule("Guide", 1)
                    EventUtil.GetInstance().AddEventListener("HidePanel", function(moduleName){
                        if(moduleName == "Guide" && databus.guide1)
                        {
                            databus.guide1 = false
                            GameInfo.GetInstance().Hit(true)
                        }
                    })
                }
            }
            if(this.changeSpeedCD.Tick())
            {
                if(this.moveSpeed == this.additionMoveSpeed)
                {
                    this.moveSpeed = this.orignalMoveSpeed
                }
                else
                {
                    this.moveSpeed = this.additionMoveSpeed
                }
            }
        }
    },

    onDestroy() {

    },


    Init(isMe, xDirection, yDirection) {
        this.isMe = isMe
        this.xDirection = xDirection
        this.yDirection = yDirection
        if(isMe)
        {
            this.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/Image/wood_player.png'));
        }
        else
        {
            this.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/Image/wood_enemy.png'));
        }
    },

    TryHit(){
        if(!this.hitting)
        {
            this.check = true
        }
        this.hitting = true
    }
})    