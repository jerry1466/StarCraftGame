import BasicResLoading from 'BasicResLoading'
import UnitManager from 'UnitManager';
import PrefabUtil from 'PrefabUtil';

let PrefabInitNum = 4
cc.Class({
    extends:BasicResLoading,
    Load(){
        this._loadedIndex = 0;
        var that = this;
        for(var i = 0; i < PrefabInitNum; i++)
        {
            PrefabUtil.GetPrefabInstance("Broke", function(_, instance){
                if(instance){
                    that._loadedIndex++;
                    instance.addComponent("Broke");
                    UnitManager.GetInstance().BrokeSpList.push(instance);
                }
            })
        }
    },
    GetProgress(){return this._loadedIndex / PrefabInitNum},
    IsComplete(){return this._loadedIndex >= PrefabInitNum}
})