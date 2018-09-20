/**
 * Player
 * @author lijun
 **/
import CD from 'Cd'
import Databus from 'Databus'
import TweenPosition from 'TweenPosition'
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
import MazeManager from "MazeManager";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        head:cc.Sprite,
        row:-1,
        column:-1,
    },

    onLoad(){
        // ResourceManager.LoadRemoteSprite(this.head, ResConfig.GetStarIcon(databus.userInfo.curStarId));
        if(CC_WECHATGAME)
        {
            let avatarUrl = databus.wxUserInfo.avatarUrl;
            let image = wx.createImage();
            var that = this
            image.onload = () => {
                try {
                    let texture = new cc.Texture2D();
                    texture.initWithElement(image);
                    texture.handleLoadedTexture();
                    that.head.spriteFrame = new cc.SpriteFrame(texture);
                } catch (e) {
                }
            };
            image.src = avatarUrl;
        }
    },

    update() {
        if(MazeManager.GetInstance().mapScale)
        {
            this.head.node.scaleX = MazeManager.GetInstance().mapScale.x;
            this.head.node.scaleY = MazeManager.GetInstance().mapScale.y;
        }
    },

    onDestroy() {

    },

    Init(){

    },

    Move(tarCell, callback){
        this.row = tarCell.row;
        this.column = tarCell.column;
        var tweenPos = TweenPosition.begin(this.node, this.node.position, tarCell.node.position, 0.15);
        var that = this;
        tweenPos.onFinishCallBack = function(){
            that.node.setPosition(tarCell.node.position);
            that.node.y -= 4;
            callback();
        };
    },

    JumpTo(tarCell, callback){
        this.row = tarCell.row;
        this.column = tarCell.column;
        this.node.setPosition(tarCell.node.position);
        this.node.y -= 4;
        if(callback){
            callback();
        }
    }
})    