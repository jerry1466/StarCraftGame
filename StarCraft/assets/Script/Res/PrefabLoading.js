import BasicResLoading from 'BasicResLoading'
import UnitManager from 'UnitManager';
import UIUtil from "UIUtil";

let PrefabInitNum = 2
cc.Class({
    extends:BasicResLoading,
    Load(){
        this._loadedIndex = 0;
        var that = this;
        this.loadRes("Broke", function(errMsg, loadRes){
            that._loadedIndex++;
            UnitManager.GetInstance().BrokePrefab = loadRes;
        })
        this.loadRes("Notice", function(errMsg, loadRes){
            that._loadedIndex++;
            UIUtil.SetNoticePrefab(loadRes);
        })
    },
    GetProgress(){return this._loadedIndex / PrefabInitNum},
    IsComplete(){return this._loadedIndex >= PrefabInitNum},

    loadRes(res, callback){
        cc.loader.loadRes("Prefab/" + res, function(errMsg, loadRes){
            callback(errMsg, loadRes);
        });
    }
})