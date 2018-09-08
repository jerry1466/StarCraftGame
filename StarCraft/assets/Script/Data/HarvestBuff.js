import BasicBuff from "BasicBuff"
import Productor from "Productor";

export default class HarvestBuff extends BasicBuff {
    constructor() {
		super("harvest");
    }

    Active(startTime){
		super.Active(startTime);
        Productor.GetInstance().accerlate *= 1.2;
	}

    UnActive() {
        Productor.GetInstance().accerlate /= 1.2;
        super.UnActive();
    }

}
