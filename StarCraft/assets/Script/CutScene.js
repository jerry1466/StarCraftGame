/**
 * CutScene
 * @author lijun
 **/
import Scene from 'Scene'
import ResourceManager from 'ResourceManager'
import Databus from 'Databus'
import SceneManager from 'SceneManager'
import ResConfig from "ResConfig";
import EffectUtil from 'EffectUtil';
import LevelManager from "LevelManager";

let databus = new Databus()
cc.Class({
    extends: Scene,
    properties: {
        spBg:cc.Sprite,
    },

    onDestroy() {

    },

    onLoad() {
        SceneManager.GetInstance().rootCanvas = this.node;
        ResourceManager.LoadRemoteSprite(this.spBg, ResConfig.CutSceneBg());
        EffectUtil.PlayFullScreenEffect("CutScene", "default", this.node, cc.v2(0, 0), function(){
            LevelManager.GetInstance().SwitchNextLevel()
        });
    },

    update() {
        super.update();
    }
})