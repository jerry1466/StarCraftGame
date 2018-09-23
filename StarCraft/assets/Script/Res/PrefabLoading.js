import BasicResLoading from 'BasicResLoading'
import UIUtil from "UIUtil";
import GuideManager from "GuideManager";
import UnitManager from "UnitManager";
import ModuleManager from "../Manager/ModuleManager";

let PrefabInitNum = 5
cc.Class({
    extends:BasicResLoading,
    Load(){
        this._loadedIndex = 0;
        var that = this;
        this.loadRes("Broke", function(errMsg, loadRes){
            that._loadedIndex++;
            UnitManager.GetInstance().BrokePrefab = loadRes;
            console.log("Broke Loaded");
        });
        this.loadRes("Notice", function(errMsg, loadRes){
            that._loadedIndex++;
            UIUtil.SetNoticePrefab(loadRes);
            console.log("Notice Loaded");
        });
        this.loadRes("Panel/Guide", function(errMsg, loadRes){
            that._loadedIndex++;
            GuideManager.SetGuidePrefab(loadRes);
            console.log("Guide Loaded");
        });
        this.loadRes("MazeMapCell", function(errMsg, loadRes){
            that._loadedIndex++;
            UnitManager.GetInstance().SetMazeMapCellPrefab(loadRes);
            console.log("MazeMapCell Loaded");
        });
        this.loadRes("Panel/PanelMask", function(errMsg, loadRes){
            that._loadedIndex++;
            ModuleManager.GetInstance().SetMask(loadRes);
            console.log("PanelMask Loaded");
        });
    },
    GetProgress(){return this._loadedIndex / PrefabInitNum},
    IsComplete(){return this._loadedIndex >= PrefabInitNum},

    loadRes(res, callback){
        cc.loader.loadRes("Prefab/" + res, function(errMsg, loadRes){
            callback(errMsg, loadRes);
        });
    }
})