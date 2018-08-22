/**
 * GameAffair
 * @auhor clairli
 */
import Databus from 'Databus'
import AffairConstant from 'AffairConstant'
import GameInfo from "GameInfo";

let instance
let databus = new Databus()

export default class GameAffair {
    constructor() {

    }

    static GetInstance() {
        if (instance == null) {
            instance = new GameAffair()
        }
        return instance
    }

    InitMap(){
        for(var i = 0; i < databus.mazeRow; i++)
            for(var j = 0; j < databus.mazeColumn; j++)
            {

            }
    }

    AffairHappen(row, column){

    }
}