let data = 
{
    "1001":
    {
        "id":1001,
        "name":"水星",
        "intro":"",
        "appearance":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "broke":
        [
            [30, 80, 300],
            [-50, -20, 500],
            [10, 40, 700],
            [60, -30, 1000]
        ],
        "singleProduct":5,
        "unlock":0,
        "mazeCellCost":20,
        "num_scale_duration":[1, 1.1],
        "game_meteor_income":10,
    },
    "1002":
    {
        "id":1002,
        "name":"金星",
        "intro":"",
        "appearance":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "broke":
        [
            [30, 80, 300],
            [-50, -20, 500],
            [10, 40, 700],
            [60, -30, 1000]
        ],
        "singleProduct":8,
        "unlock":3000,
        "mazeCellCost":20,
        "num_scale_duration":[1.15, 1.3],
        "game_meteor_income":15,
    },
    "1003":
    {
        "id":1003,
        "name":"地球",
        "intro":"",
        "appearance":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "broke":
        [
            [30, 80, 300],
            [-50, -20, 500],
            [10, 40, 700],
            [60, -30, 1000]
        ],
        "singleProduct":11,
        "unlock":10000,
        "mazeCellCost":20,
        "num_scale_duration":[1.3, 1.6],
        "game_meteor_income":25,
    }
}

let star_base_data =
{
    "affair_reward":100,
    "affair_rob":30,
}

export default class StarConfig{
    static GetStarIds(){
        var ids = [];
        for(var id in data){
            ids.push(id);
        }
        return ids;
    }

    static GetStarConfig(id){
        return data[id.toString()];
    }

    static GetStarName(id){
        return data[id.toString()]["name"]
    }

    static GetStarAppearance(id){
        return data[id.toString()]["appearance"]
    }

    static GetStarBrokeList(id){
        return data[id.toString()]["broke"]
    }

    static GetStarUnlock(id){
        return data[id.toString()]["unlock"]
    }

    static GetStarAffairRate(id){
        return data[id.toString()]["affairRate"]
    }

    static GetMazeCellCost(id){
        return data[id.toString()]["mazeCellCost"]
    }

    static GetStarNumScaleDuration(id){
        return data[id.toString()]["num_scale_duration"]
    }

    static GetBaseAffairReward(){
        return this.star_base_data["affair_reward"]
    }

    static GetBaseAffairRob(){
        return this.star_base_data["affair_rob"]
    }

    static GetGameMeteorIncome(id){
        return data[id.toString()]["game_meteor_income"]
    }
}