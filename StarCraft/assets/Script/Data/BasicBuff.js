export default class BasicBuff{
    constructor(buffId){
        this.buffId = buffId;
        this.buffConfig = null; // TODO 通过读表赋值对应的buffConfig
        this.active = false;
    }

    Active(startTime){
        this.active = true;
        this.endTime = startTime + this.buffConfig.lastTime;
    }

    Update() {

    }

    Timeout(time){
        return time >= this.endTime;
    }

    UnActive(){
        this.active = false
    }
}
