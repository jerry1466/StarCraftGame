/**
 * StarListPanel
 * @author lijun
 **/
import EventUtil from 'EventUtil'
import Databus from 'Databus'
import TweenAlpha from 'TweenAlpha'
import ModuleManager from "ModuleManager";

let databus = new Databus()

cc.Class({
    extends: cc.Component,
    properties: {
        spIcon:cc.Sprite,
        spIntro:cc.Sprite,
        lbName:"",
        lbIntro:"",
        lbProductivity:cc.RichText,
        lbStatus:cc.Label,
        btnView:cc.Button
    },

    update() {

    },

    start(){

    },

    onDestroy() {

    },
})