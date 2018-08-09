/**
 * Brick
 * @author lijun
 **/
import Databus from 'Databus'
import GameInfo from "GameInfo"
import TweenAlpha from "TweenAlpha"
import MissionConfig from "MissionConfig";
import ModuleManager from "ModuleManager";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        id:0
    },

    onLoad(){
        this.targetSlot = 0
        this.xDirection = 0
        this.dropping = false
        this.xMoving = false
        this.heightChangeInterval = new MissionConfig().GetMissionBrickDyncHeightInterval(databus.mission)
        this.originalHeight = new MissionConfig().GetMissionBrickHeight(databus.mission)
        this.dyncHeightEnable = this.heightChangeInterval > 0
        if(this.dyncHeightEnable)
        {
            this.heightChangeStep = this.originalHeight / (this.heightChangeInterval * 48)
            this.heightChangeDirection = -1
        }

    },

    update() {
        if (this.dropping)
        {
            var deltaTime = (Date.now() - this.dropStartTime) * 0.001
            this.node.x = this.startX + this.xDirection * (databus.wallWidth * 0.5 + 40 * deltaTime)
            this.node.y = this.originalY - 0.5 * databus.gravity * Math.pow(deltaTime, 2)
            var hit = GameInfo.GetInstance().HitAvatar(this.node, this.xDirection)
            if(hit == true)
            {
                this.dropping = false
                var win = this.xDirection < 0
                var tweenAlpha = TweenAlpha.begin(this.node, 1, 0, 0.4, 1)
                tweenAlpha.onFinishCallBack = function() {
                    GameInfo.GetInstance().ShowResult(win)
                }
            }
        }
        else if(!databus.gamePause && !databus.gameOver && this.xMoving)
        {
            this.node.x += this.xDirection * databus.brickMoveSpeed

            if(this.xDirection < 0)
            {
                if(this.targetSlot == 0 && this.node.x <= 0)
                {
                    this.xDirection = 0
                    this.xMoving = false
                    this.node.x = 0
                }
                else if(this.targetSlot != 0 && this.node.x <= (this.targetSlot * databus.wallWidth * databus.brickMoveStep))
                {
                    this.xDirection = 0
                    this.xMoving = false
                    this.node.x = this.targetSlot * databus.wallWidth * databus.brickMoveStep
                }
            }
            else if(this.xDirection > 0)
            {
                if(this.targetSlot == 0 && this.node.x >= 0)
                {
                    this.xDirection = 0
                    this.xMoving = false
                    this.node.x = 0
                }
                else if(this.targetSlot != 0 && this.node.x >= (this.targetSlot * databus.wallWidth * databus.brickMoveStep))
                {
                    this.xDirection = 0
                    this.xMoving = false
                    this.node.x = this.targetSlot * databus.wallWidth * databus.brickMoveStep
                    if(this.targetSlot == 2)
                    {
                        if(databus.guide3)
                        {
                            databus.guide3 = false;
                            databus.gamePause = true
                            ModuleManager.GetInstance().ShowModule("Guide", 3);
                        }
                    }
                }
            }
        }

        if(databus.gameStart && !databus.gamePause && !databus.gameOver)
        {
            if(this.dyncHeightEnable)
            {
                if(this.heightChangeDirection < 0)
                {
                    if(this.node.height >= 0)
                    {
                        this.node.height += this.heightChangeDirection * this.heightChangeStep
                    }
                    else
                    {
                        this.heightChangeDirection *= -1
                    }
                }
                else if(this.heightChangeDirection > 0)
                {
                    if(this.node.height <= this.originalHeight)
                    {
                        this.node.height += this.heightChangeDirection * this.heightChangeStep
                    }
                    else
                    {
                        this.heightChangeDirection *= -1
                    }
                }
            }
        }
    },

    onDestroy() {

    },


    Init() {
        this.originalY = this.node.y
    },

    Drop() {
        this.dropping = true
        this.dropStartTime = Date.now()
    },

    MoveStep(direction){
        if(this.xDirection != direction)
        {
            this.targetSlot += direction / Math.abs(direction)
            console.log("targetSlot:", this.id, this.targetSlot)
            if(Math.abs(this.targetSlot) - 1 > 0.5 / databus.brickMoveStep)
            {
                console.log("drop begin")
                databus.gameOver = true
                this.xDirection = direction
                this.startX = this.node.x
                this.Drop()
            }
            else
            {
                console.log("move begin")
                this.xDirection = direction
                this.xMoving = true
            }
        }
    }
})    