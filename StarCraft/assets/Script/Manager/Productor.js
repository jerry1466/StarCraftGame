import Databus from "Databus";
import UIUtil from "UIUtil";
import SceneManager from "SceneManager"
import LevelManager from "LevelManager";
import Cd from "Cd";
import StarConfig from "StarConfig";

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
                var moneyType = 1
                var moneyNum = this.GetTotalProductivity() * this.accerlate;
                if(moneyNum > 0)
                {
                    databus.AddMoney(moneyType, moneyNum)
                    if(new LevelManager().IsBattleLevel())
                    {
                        UIUtil.ShowMoneyNotice(moneyType, moneyNum, SceneManager.GetInstance().rootCanvas(), cc.v2(0, 250))
                    }
                }
            }
        }
    }

    GetTotalProductivity(){
        var total = 0;
        var ids = StarConfig.GetStarIds();
        for(var i = 0; i < ids.length; i++)
        {
            var id = parseInt(ids[i]);
            var config = StarConfig.GetStarConfig(id);
            if(id < databus.userInfo.maxStarId){
                total += config["singleProduct"] * config["broke"].length;
            }
            else if(id == databus.userInfo.maxStarId)
            {
                total += this.GetStarProductivity(config, databus.userInfo.brokeFixIndex);
            }
        }
        return total;
    }

    GetStarProductivity(config, brokeFixIndex){
        return config["singleProduct"] * (brokeFixIndex + 1);
    }
}