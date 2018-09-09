import BasicBuff from "BasicBuff"
import MazeManager from "MazeManager";

export default class FrozenBuff extends BasicBuff {
    constructor() {
		super("frozen");
    }

    Active(startTime){
		super.Active(startTime);
	}

    UnActive() {
        super.UnActive();
    }
}

