import BasicBuff from "BasicBuff"
import MazeManager from "MazeManager";

export default class FrozenBuff extends BasicBuff {
    constructor() {
		super("frozen");
    }

    Active(startTime){
		super.Active(startTime);
        MazeManager.GetInstance().frozen = true
	}

    UnActive() {
        MazeManager.GetInstance().frozen = false
        super.UnActive();
    }
}

