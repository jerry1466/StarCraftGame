import Databus from "Databus"
import UIUtil from "UIUtil"

let databus = new Databus()
export default class MoneyUtil{
    static Spend(moneyType, num, tip, callback){
        if(moneyType == 1)
        {
            UIUtil.ConfirmCancel("确定花费" + num + databus.GetMoneyName(moneyType) + tip, function(){
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
            }
        }
    }
}