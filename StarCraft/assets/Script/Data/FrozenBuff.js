import BasicBuff from "BasicBuff"
import MazeManager from "MazeManager";

export default class FrozenBuff extends BasicBuff {
    constructor(buffId) {
		super(buffId);
    }

    Active(startTime){
		super.Active();
        MazeManager.GetInstance().frozen = true
	}

    UnActive() {
        MazeManager.GetInstance().frozen = false
        super.UnActive();
    }

}

