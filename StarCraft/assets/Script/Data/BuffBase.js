/**
 * BuffBase
 * @author lijun
 **/
import Dictionary from "Dictionary";
import HarvestBuff from "HarvestBuff";
import FrozenBuff from "FrozenBuff";

let buffList = new Array();
let buffDic;
export default class BuffBase{
	static Init(){
	    if(buffDic == null)
        {
            buffDic = new Dictionary()
        }
        var newBuff = new HarvestBuff()
	    buffDic.add(newBuff.name, newBuff)
	    newBuff = new FrozenBuff()
	    buffDic.add(newBuff.name, newBuff)
	}

	static Update(){
		var nowTime = Date.now();
		for(var i = buffList.length - 1; i >= 0; i--)
		{
			console.log("xut buff update ", buffList[i].name)
			if(buffList[i].Timeout(nowTime))
			{
				console.log("xut buff update timeout", buffList[i].name, buffList[i].endTime, nowTime)
				buffList[i].timeOutHandler()
				this.DelBuff(buffList[i]);
			}
		}
	}

    static AddBuff(buffName, timeOutHandler) {
    	var buffInstance = buffDic.find(buffName)
    	buffInstance.timeOutHandler = timeOutHandler
    	if(buffInstance)
		{
            var nowTime = Date.now();
            buffList.push(buffInstance);
            buffInstance.Active(nowTime);
		}
		console.log("xut addbuff ", buffInstance.name)
    }

    static DelBuff(buffInstance) {
        buffInstance.UnActive();
        buffList.splice(buffList.indexOf(buffInstance), 1)
    }

    static DelAllBuff() {
        for(var i = buffList.length - 1; i >= 0; i--)
        {
            this.DelBuff(buffList[i]);
        }
    }
}

