/**
 * 寻找流星游戏场景
 * @author lijun
 **/
import Scene from 'Scene'
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
    extends: Scene,
    properties: {
        bgm: {
            default: null,
            type: cc.AudioSource
        }
    },

    onLoad() {
    	//加载流星平原背景
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.FindMeteorBg())
        var param = new LevelManager().CurrentLevelParam
        this.findMeteor = FindMeteor.GetInstance()
        this.findMeteor.CreatePlanet()
        this.findMeteor.CreateMeteor(10)
        var blackholeNum = para["level"] * 2 + 3
        if (blackholeNum > 9) {
			blackholeNum = 9
        }
        this.findMeteor.CreateBlackHole(blackholeNum)
    },

    update() {
        super.update();
    },

    onDestroy() {

    },

    start() {
    }
})    

