/**
 * Player
 * @author lijun
 **/
import CD from 'Cd'
import Databus from 'Databus'
import TweenPosition from 'TweenPosition'

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        head:cc.Sprite,
        row:-1,
        column:-1,
    },

    onLoad(){

    },

    update() {
    },

    onDestroy() {

    },

    Init(){

    },

    Move(tarCell, callback){
        this.row = tarCell.row;
        this.column = tarCell.column;
        var tweenPos = TweenPosition.begin(this.node, this.node.position, tarCell.node.position, 0.2);
        tweenPos.onFinishCallBack = callback;
    }
})    