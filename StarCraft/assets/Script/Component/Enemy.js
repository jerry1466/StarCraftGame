/**
 * Enemy
 * @author lijun
 **/
import CD from 'Cd'
import Databus from 'Databus'
import ResourceManager from 'ResourceManager'
let databus = new Databus()

cc.Class({
    extends: cc.Component,
    properties: {
        sp: {
            default: null,
            type: cc.Sprite
        }
    },

    onLoad(){
        this.statueCd = new CD(3000, false)
    },

    update() {
        if(databus.gameStart && !databus.gamePause && !databus.gameOver)
        {
            if(this.statueCd.Tick())
            {
                if(Math.random() < 0.5)
                {
                    this.EnterIdleWait()
                }
                else
                {
                    this.EnterIdle()
                }
            }
        }
    },

    onDestroy() {

    },


    Init() {

    },

    EnterIdle()
    {
        //this.setSprite("monkey_1")
        ResourceManager.LoadRemoteSprite(this.sp, "https://cdn-game.2zhuji.cn/uploads/yxhzbzk/head/" + databus.mission + ".png")
    },

    EnterWin()
    {
        //this.setSprite("monkey_4")
    },

    EnterFail()
    {
        //this.setSprite("monkey_3")
    },

    EnterIdleWait()
    {
        //this.setSprite("monkey_2")
    },

    setSprite(url){
        console.log("monkey setSprite", url)
        this.sp.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/AnimClip/' + url + '.png'));
    }
})    