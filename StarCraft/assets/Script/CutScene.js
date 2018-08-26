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
    extends: cc.Component,
    properties: {
        spBg:cc.Sprite,
    },

    onDestroy() {

    },

    onLoad() {
        SceneManager.GetInstance().SetRoot(this.node);
        ResourceManager.LoadRemoteSprite(this.spBg, ResConfig.CutSceneBg());
        EffectUtil.PlayFullScreenEffect("CutScene", "default", this.node, cc.v2(0, 0), function(){
            new LevelManager().SwitchNextLevel()
        });
    },

    update() {
        super.update();
    }
})