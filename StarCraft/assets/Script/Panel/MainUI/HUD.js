/**
 * HUD
 * @author lijun
 **/
import Databus from 'Databus'
import BaseFrame from 'BaseFrame'
import Coin from 'Coin'
import PrefabUtil from 'PrefabUtil'

let databus = new Databus()
cc.Class({
    extends: BaseFrame,
    properties: {
        DiamondCon:Coin,
        MeteorCon:Coin
    },

    onLoad(){
        var that = this
        PrefabUtil.GetPrefabInstance("Coin", function(instance){
            if(instance){
                that.DiamondCon = instance.getComponent("Coin");
                that.InitDiamond()
            }
        })
        PrefabUtil.GetPrefabInstance("Coin", function(instance){
            if(instance){
                that.MeteorCon = instance.getComponent("Coin");
                that.InitMeteor()
            }
        })
    },

    update(dt) {
        this.DiamondCon.UpdateCoin(databus.userInfo.diamond);
        this.MeteorCon.UpdateCoin(databus.userInfo.meteor);
    },

    onDestroy() {
    },

    InitDiamond(){
        this.DiamondCon.SetCoinType(1);
    },

    InitMeteor(){
        this.MeteorCon.SetCoinType(2);
    }
})