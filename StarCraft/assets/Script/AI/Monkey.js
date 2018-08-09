/**
 * MonkeyAI
 * @author lijun
 **/
import UnitManager from "UnitManager";
import Databus from 'Databus'
import MissionConfig from "MissionConfig"
import GameInfo from "GameInfo"
import Cd from "Cd"
import EventUtil from "EventUtil"

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        monkey: {
            default: null,
            type: cc.Node
        }
    },

    onLoad(){
        var _this = this
        EventUtil.GetInstance().AddEventListener("MissionEnd", function(){
            _this._cd = null
        })
    },

    update() {
        if(databus.gamePause != true && (databus.freezeTimeStamp <= 0 || databus.freezeTimeStamp + databus.freezeDuration <= Date.now()))
        {
            EventUtil.GetInstance().DispatchEvent("StopFreezeEffect");
            databus.freezeTimeStamp = 0
            if(databus.passGuide == true && databus.gameStart && !databus.gameOver && (this._cd == null || this._cd.Tick()))
            {
                var bricks = UnitManager.GetInstance().bricks
                var enemyWood = UnitManager.GetInstance().enemyWood
                var aiJudgeDis = new MissionConfig().GetMissionEnemyWoodAIJudgeDis(databus.mission)
                var aiSeed = new MissionConfig().GetMissionEnemyWoodAISeed(databus.mission)
                var aiTimeDelta = new MissionConfig().GetMissionEnemyWoodAITimeDelta(databus.mission)
                for(var i = 0; i < bricks.length; i++)
                {
                    var brick = bricks[i]
                    if(Math.abs(enemyWood.y - brick.node.y) <= aiJudgeDis)
                    {
                        if(brick.targetSlot < 0)
                        {
                            aiSeed += Math.abs(brick.targetSlot) * databus.externalSeed
                        }
                        var randomValue = Math.random()
                        if(randomValue <= aiSeed)
                        {
                            var comEnemyWood = enemyWood.getComponent("Wood")
                            if(comEnemyWood.hitting != true)
                            {
                                GameInfo.GetInstance().Hit(false)
                                this._cd = new Cd(aiTimeDelta * 500, true)
                            }
                        }
                        break
                    }
                }
            }
        }
    },

    onDestroy() {

    },
})    