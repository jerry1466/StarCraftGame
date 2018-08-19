import BasicBuff from "BasicBuff"
import BuffBase from "BuffBase";
import Productor from "Productor";

export default class Harvest extends BasicBuff {
	constructor(buffId) {
		super(buffId);
    }

    Active(startTime){
		super.Active();
        Productor.GetInstance().accerlate *= 1.2;
	}

    UnActive() {
        Productor.GetInstance().accerlate /= 1.2;
        super.UnActive();
    }
}

BuffBase.RegisterBuff(1, new Harvest(1));
