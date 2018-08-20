import BasicBuff from "BasicBuff"
import Productor from "Productor";

export default class HarvestBuff extends BasicBuff {
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
