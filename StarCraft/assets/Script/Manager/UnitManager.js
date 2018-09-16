/**
 * UnitManager
 * @auhor clairli
 */

let instance
export default class UnitManager {
    constructor() {
        this.BrokePrefab = null;
    }
    
    static GetInstance() {
        if (instance == null) {
            instance = new UnitManager()
        }
        return instance
    }

    RemoveAll(){

    }

    FetchBrokeInst(){
        return cc.instantiate(this.BrokePrefab);
    }

    SetMazeMapCellPrefab(prefab){
        this.mapCellPrefab = prefab;
    }

    GetMazeMapCellInst(){
        return cc.instantiate(this.mapCellPrefab);
    }
}