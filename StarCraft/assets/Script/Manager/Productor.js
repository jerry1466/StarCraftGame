import Databus from "Databus";

let instance
let databus = new Databus()
export default class Productor{
    constructor(){

    }

    static GetInstance(){
        if (instance == null) {
            instance = new Productor()
            instance._produce = false;
        }
        return instance
    }

    Start(){
        this._produce = true;
    }

    Stop(){
        this._produce = false;
    }

    Update(){
        if(this._produce)
        {
            databus.AddMoney(2, this.GetTotalProductivity())
        }
    }

    GetTotalProductivity(){
        return 10;
    }

    GetStarProductivity(config, brokeFixIndex){
        return config["singleProduct"] * (brokeFixIndex + 1);
    }
}