import Databus from "Databus";
import UIUtil from "UIUtil";
import SceneManager from "SceneManager"

let instance
let databus = new Databus()
export default class Productor{
    constructor(){

    }

    static GetInstance(){
        if (instance == null) {
            instance = new Productor()
            instance._produce = false;
        }
        return instance
    }

    Start(){
        this._produce = true;
    }

    Stop(){
        this._produce = false;
    }

    Update(){
        if(this._produce)
        {
            var moneyType = 2
            var moneyNum = this.GetTotalProductivity()
            databus.AddMoney(moneyType, moneyNum)
            UIUtil.ShowMoneyNotice(moneyType, moneyNum, SceneManager.GetInstance().rootCanvas, cc.v2(0, 300))
        }
    }

    GetTotalProductivity(){
        return 10;
    }

    GetStarProductivity(config, brokeFixIndex){
        return config["singleProduct"] * (brokeFixIndex + 1);
    }
}