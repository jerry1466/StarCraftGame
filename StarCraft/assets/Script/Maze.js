/**
 * Maze
 * @author lijun
 **/
import HUD from 'HUD'
import LevelManager from "LevelManager";
import SceneManager from "SceneManager";

cc.Class({
    extends: cc.Component,
    properties: {
        hud: HUD,
        btnExit:cc.Button
    },

    onLoad(){
        SceneManager.GetInstance().rootCanvas = this.node
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