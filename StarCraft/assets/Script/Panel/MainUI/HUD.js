/**
 * HUD
 * @author lijun
 **/
import Databus from 'Databus'
import BaseFrame from 'BaseFrame'
import Coin from 'Coin'
import ResConfig from 'ResConfig'
import Productor from "Productor";

let databus = new Databus()
cc.Class({
    extends: BaseFrame,
    properties: {
        DiamondCon:Coin,
        ProductivityCon:Coin,
    },

    onLoad(){
        this.DiamondCon.Init(ResConfig.DiamondConBg());
        this.ProductivityCon.Init(ResConfig.ProductivityConBg());
    },

    update(dt) {
        this.DiamondCon.UpdateCoin(databus.userInfo.diamond);
        this.ProductivityCon.UpdateCoin(Productor.GetInstance().GetTotalProductivity());
    },

    onDestroy() {
    },
})