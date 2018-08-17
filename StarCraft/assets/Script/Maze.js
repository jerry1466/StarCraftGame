/**
 * Maze
 * @author lijun
 **/
import HUD from 'HUD'
import LevelManager from "LevelManager";
cc.Class({
    extends: cc.Component,
    properties: {
        hud: HUD,
        btnExit:cc.Button
    },

    update() {

    },

    onDestroy() {

    },


    Init() {

    },

    onExit(){
        LevelManager.GetInstance().SwitchLevel("Battle")
    }
})    