/**
 * Player
 * @author lijun
 **/
import CD from 'Cd'
import Databus from 'Databus'
let databus = new Databus()

cc.Class({
    extends: cc.Component,
    properties: {
        sp: {
            default: null,
            type: cc.Sprite,
        }
    },

    onLoad(){
        this.sp.node.active = false
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


    Init(){

    },

    EnterIdle()
    {
        let avatarUrl = databus.userInfo.avatarUrl;
        let image = wx.createImage();
        var that = this
        image.onload = () => {
            try {
                let texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                this.sp.node.active = true
                that.sp.spriteFrame = new cc.SpriteFrame(texture);
            } catch (e) {
                cc.log(e);
                this.sp.node.active = true
                that.setSprite("player_1")
            }
        };
        image.src = avatarUrl;
    },

    EnterWin()
    {
        //this.setSprite("player_2")
    },

    EnterFail()
    {
        //this.setSprite("player_3")
    },

    EnterIdleWait()
    {
        //this.setSprite("player_4")
    },

    setSprite(url){
        this.sp.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/AnimClip/' + url + '.png'));
    }
})    