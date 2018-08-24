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
    FREEZE:111
}

let affairHardLevel = {
    Easy:10,
    Common:100,
    Hard:1000,
}

export default class AffairConstant {
    static AffairEnum(){
        return affairEnum
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

    static CreateAffairTypeByLevel(level){
        if(this.affairMap == null){
            this.GenerateAffairMap();
        }
        return ArrayUtil.GetRandomValue(this.affairMap[level - 1])
    }
}