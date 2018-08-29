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

    },

    start(){
        this.DiamondCon.Init(ResConfig.DiamondConBg());
        this.ProductivityCon.Init(ResConfig.ProductivityConBg(), "/秒");
        this.ProductivityCon.InitIcon(ResConfig.DiamondIcon());
    },

    update(dt) {
        this.DiamondCon.UpdateCoin(databus.userInfo.diamond, true);
        this.ProductivityCon.UpdateCoin(Productor.GetInstance().GetTotalProductivity(), true);
    },

    onDestroy() {
    },
})