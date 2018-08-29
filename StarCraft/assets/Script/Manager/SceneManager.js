/**
 * SceneManager
 * @auhor clairli
 */
import Databus from 'Databus'

let instance
let rootCanvas
let databus = new Databus()
export default class SceneManager {
    constructor() {

    }

    static GetInstance() {
        if (instance == null) {
            instance = new SceneManager()
        }
        return instance
    }

    SetRoot(sceneNode){
        if(sceneNode.getComponent("Scene") == null){
            sceneNode.addComponent("Scene");
        }
        rootCanvas = sceneNode;
        console.log("SceneManager SetRoot", rootCanvas)
    }

    rootCanvas(){
        return rootCanvas;
    }
    /*
    static ResizeRootCanvas(canvasNode){
        this.GetInstance().rootCanvas = canvasNode
        var canvas = this.GetInstance().rootCanvas.getComponent(cc.Canvas)
        canvas.designResolution =
    }
    */
}