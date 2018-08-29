import Databus from 'Databus'
import ModuleManager from "ModuleManager";

let databus = new Databus()

let instance
export default class LevelManager {
    constructor(){
        if(instance)
            return instance
        instance = this
    }

    SwitchLevel(lvName, levelParam){
        ModuleManager.GetInstance().PopAllModule();
        this.CurrentLevelName = lvName;
        this.CurrentLevelParam = levelParam
        console.log("SwitchLevel:" + lvName)
        cc.director.loadScene(lvName)
    }

    SwitchNextLevel(){
        if(this.nextLvName)
        {
            this.SwitchLevel(this.nextLvName, this.nextLevelParam)
            this.nextLvName = null
        }
    }

    PushNextLevel(nextLvName, nextLevelParam){
        this.nextLvName = nextLvName
        this.nextLevelParam = nextLevelParam
    }

    ResizeLevelCanvas(canvasNode){
        canvasNode.width = databus.screenWidth;
        canvasNode.height = databus.screenHeight;
        console.log(canvasNode.width, canvasNode.height)
    }

    IsBattleLevel(){
        return this.CurrentLevelName == "battle"
    }
}