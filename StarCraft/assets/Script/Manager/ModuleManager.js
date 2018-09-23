/**
 * ModuleManager
 * @auhor lijun
 */
import ModuleConstant from 'ModuleConstant'
import PrefabUtil from 'PrefabUtil'
import SceneManager from 'SceneManager'
import TweenScale from 'TweenScale'
import TweenPosition from 'TweenPosition'
import EventUtil from "EventUtil";

let instance
let maskPrefab
let mask
export default class ModuleManager {
    constructor() {

    }

    static GetInstance() {
        if (instance == null) {
            instance = new ModuleManager()
            instance.moduleMap = {}
        }
        return instance
    }

    SetMask(prefab){
        maskPrefab = prefab;
    }

    GetMask(){
        if(mask == null)
        {
            mask = cc.instantiate(maskPrefab);
        }
        return mask;
    }

    ShowModule(moduleName, param){
        if(this.moduleMap[moduleName] != null)
        {
            instance = this.moduleMap[moduleName]
            instance.getComponent('BasePanel').Init(param)
        }
        else
        {
            this.loadModule(this, moduleName, param)
        }
    }

    loadModule(object, moduleName, param){
        this.GetMask().parent = SceneManager.GetInstance().rootCanvas()
        this.GetMask().width = SceneManager.GetInstance().rootCanvas().width
        this.GetMask().height = SceneManager.GetInstance().rootCanvas().height
        this.GetMask().x = this.GetMask().y = 0
        var panelMask = mask.getComponent("PanelMask")
        panelMask.Init(moduleName)
        var prefabUrl = ModuleConstant.GetInstance().GetModuleUrl(moduleName)
        PrefabUtil.GetPrefabInstance(prefabUrl, function(success, instance){
            if(success)
            {
                object.moduleMap[moduleName] = instance
                instance.parent = SceneManager.GetInstance().rootCanvas()
                instance.x = 0
                instance.y = 0
                var basePanel = instance.getComponent('BasePanel')
                basePanel.Init(param)
                if(basePanel.openAnim == 1)
                {
                    var tweenScale = TweenScale.begin(instance,cc.v2(0, 0), cc.v2(1, 1), 0.2, 1)
                    tweenScale.onFinishCallBack = function(){
                        instance.setScale(cc.v2(1, 1))
                    }
                }
                else if(basePanel.openAnim == 2)
                {
                    var tweenPos = TweenPosition.begin(instance,cc.v2(0, 1000), cc.v2(0, 0), 0.2, 1)
                    tweenPos.onFinishCallBack = function(){
                        instance.setPosition(cc.v2(0, 0))
                    }
                }
                panelMask.RegisterBlankClose(basePanel.blankClose)
            }
        })
    }

    HideModule(moduleName){
        var instance = this.moduleMap[moduleName]
        if(instance)
        {
            instance.removeFromParent();
            instance.destroy();
            instance = null
            delete this.moduleMap[moduleName];
            this.GetMask().removeFromParent();
            EventUtil.GetInstance().DispatchEvent("HidePanel", moduleName)
        }
    }

    PopAllModule(){
        for(var moduleName in this.moduleMap){
            this.HideModule(moduleName);
        }
    }

    IsModuleShow(moduleName){
        return this.moduleMap[moduleName] != null
    }
}