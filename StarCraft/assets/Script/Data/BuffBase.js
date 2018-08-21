/**
 * BuffBase
 * @author lijun
 **/
import Dictionary from "Dictionary";
import HarvestBuff from "HarvestBuff";

let buffList = new Array();
let buffDic;
export default class BuffBase{
	static Init(){
	    if(buffDic == null)
        {
            buffDic = new Dictionary();
        }
	    buffDic.add(1, new HarvestBuff(1));
	    buffDic.add(2, new FrozenBuff(2));
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

