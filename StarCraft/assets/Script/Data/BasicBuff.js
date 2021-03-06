let buffconfig = {
	"harvest":{
		"lastTime":100 * 1000,
	},

	"frozen":{
		"lastTime":3 * 1000,
	},
}

export default class BasicBuff{
    constructor(buffName){
        this.name = buffName;
        this.config = buffconfig[buffName]; // TODO 通过读表赋值对应的buffConfig
        this.active = false;
    }

    Active(startTime){
        this.active = true
        this.endTime = startTime + this.config["lastTime"]
    }

    Update() {

    }

    Timeout(time){
        return time >= this.endTime
    }

    UnActive(){
        this.active = false
    }
}
