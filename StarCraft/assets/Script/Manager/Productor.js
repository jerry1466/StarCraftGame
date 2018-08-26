import Databus from "Databus";
import UIUtil from "UIUtil";
import SceneManager from "SceneManager"
import LevelManager from "LevelManager";
import Cd from "Cd";

let instance
let databus = new Databus()
export default class Productor{
    constructor(){
        this.accerlate = 1;
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
        this._cd = new Cd(1000, false);
    }

    Stop(){
        this._produce = false;
    }

    Update(){
        if(this._produce)
        {
            if(this._cd.Tick())
            {
                var moneyType = 2
                var moneyNum = this.GetTotalProductivity() * this.accerlate;
                databus.AddMoney(moneyType, moneyNum)
                if(new LevelManager().IsBattleLevel())
                {
                    UIUtil.ShowMoneyNotice(moneyType, moneyNum, SceneManager.GetInstance().rootCanvas, cc.v2(0, 300))
                }
            }
        }
    }

    GetTotalProductivity(){
        return 10;
    }

    GetStarProductivity(config, brokeFixIndex){
        return config["singleProduct"] * (brokeFixIndex + 1);
    }
}