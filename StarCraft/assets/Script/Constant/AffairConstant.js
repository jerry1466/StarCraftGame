/**
 * AffairConstant
 * @auhor clairli
 */
import ArrayUtil from 'ArrayUtil'

let instance
let affairEnum = {
    NONE:0,
    REWARD:1,
    ROB:2,
    GAME:11,
    CARD:12,
    FREEZE:13,
}

let affairHardLevel = {
    Easy:10,
    Common:100,
    Hard:1000,
}

let AFFAIR_EVENT_NAMES = ["get star", "star game", "ice game", "card"];

export default class AffairConstant {
    static AffairEnum(){
        return affairEnum
    }

    static GetEventNames(){
        return AFFAIR_EVENT_NAMES;
    }

    static GenerateAffairMap(){
        this.affairMap = [[], [], []]
        for(var key in affairEnum)
        {
            if(key != affairEnum.NONE)
            {
                var index = this.AffairLevelIndex(affairEnum[key]);
                this.affairMap[index - 1].push(key);
            }
        }
    }

    static AffairLevelIndex(affairType){
        if(affairType <= affairHardLevel.Easy)
        {
            return 1;
        }
        else if(affairType <= affairHardLevel.Common)
        {
            return 2;
        }
        else if(affairType <= affairHardLevel.Hard)
        {
            return 3;
        }
        return 0;
    }

    static CreateAffairTypeByName(eventName){
        switch(eventName)
        {
            case "get star":
                return affairEnum.REWARD;
                break;
            case "star game":
                return affairEnum.GAME;
                break;
            case "ice game":
                return affairEnum.FREEZE;
                break;
            case "card":
                return affairEnum.CARD;
                break;
            default:
                return affairEnum.NONE;
                break;
        }
    }
}