import Databus from "Databus"
import UIUtil from "UIUtil"
import ModuleManager from "ModuleManager";

let databus = new Databus()
export default class MoneyUtil{
    static Spend(moneyType, num, tip, callback){
        if(moneyType == 1)
        {
            UIUtil.ConfirmCancel("确定花费 " + num + " " + databus.GetMoneyName(moneyType) + tip, function(){
                doSpend()
            }, function(){
                callback(false)
            })
        }
        else
        {
            doSpend()
        }

        function doSpend(){
            if(databus.GetMoneyNum(moneyType) >= num){
                callback(true)
            }
            else{
                callback(false)
                Guide(moneyType);
            }
        }

        function Guide(moneyType){
            if(moneyType == 1){
                ModuleManager.GetInstance().ShowModule("GuideDiamondBox", num);
            }
            else if(moneyType == 2){
                ModuleManager.GetInstance().ShowModule("GuideMeteorBox");
            }
        }
    }
}