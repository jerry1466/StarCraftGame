/**
 * AffairConstant
 * @auhor clairli
 */
let instance
let affairEnum = {
    NONE:0,
    REWARD:1,
    ROB:2,
    GAME:11,
    FREEZE:111
}

let affairHardLevel = {
    Easy:10,
    Common:100,
    Hard:1000,
}

export default class AffairConstant {
    constructor() {

    }

    static AffairEnum(){
        return affairEnum
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
}