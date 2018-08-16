/**
 * 寻找流星游戏场景
 * @author lijun
 **/
import GameInfo from 'GameInfo'
import EventUtil from 'EventUtil'
import Databus from 'Databus'
import SceneManager from 'SceneManager'
import AffairConstant from "AffairConstant";
import PrefabUtil from 'PrefabUtil'
import ModuleManager from 'ModuleManager'
import LevelManager from "LevelManager";
import UnitManager from "UnitManager";
import ResourceManager from "ResourceManager";
import FindMeteor from "FindMeteor";
import ResConfig from 'ResConfig';


let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        bgm: {
            default: null,
            type: cc.AudioSource
        }
    },

    onLoad() {
    	//加载流星平原背景
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.FindMeteorBg())
        this.findMeteor = FindMeteor.GetInstance()
        this.findMeteor.CreatePlanet()
        this.findMeteor.CreateMeteor()
        this.findMeteor.CreateBlackHole()
    },

    update() {
    },

    onDestroy() {

    },

    start() {
    }
})    

