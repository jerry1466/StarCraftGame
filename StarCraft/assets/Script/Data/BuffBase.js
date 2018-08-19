/**
 * BuffBase
 * @author lijun
 **/
import Dictionary from "Dictionary";

let buffDic = new Dictionary();
let buffList = new Array();
export default class BuffBase{
	static RegisterBuff(buffId, buffInstance){
		buffDic.add(buffId, buffInstance)
	}

	static Update(){
		var nowTime = Date.now();
		for(var i = buffList.length - 1; i >= 0; i--)
		{
			buffList[i].Update();
			if(buffList[i].Timeout(nowTime))
			{
				this.DelBuff(buffList[i]);
			}
		}
	}

    static AddBuff(buffId) {
    	var buffInstance = buffDic.find(buffId);
    	if(buffInstance)
		{
            var nowTime = Date.now();
            buffList.push(buffInstance);
            buffInstance.Active(nowTime);
		}
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

