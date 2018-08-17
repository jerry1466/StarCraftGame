/**
 * AffairConstant
 * @auhor clairli
 */
let instance
let affairEnum = {
    NONE:"none",
    REWARD: "reward",
    BACK_ORIGIN: "back_origin",
    GAME: "game",
}

let affairRate = {
    NONE:0,
    REWARD:65,
    BACK_ORIGIN:10,
    GAME:25,
}

export default class AffairConstant {
    constructor() {

    }

    static AffairEnum(){
        return affairEnum
    }

    static AffairRate(){
        return affairRate
    }
}