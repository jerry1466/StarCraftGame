let data =
{
     "1":
     {
        "row":5,
        "column":5,
        "rate":[70, 30]
     },
    "2":
    {
        "row":6,
        "column":6,
        "rate":[60, 40]
    },
    "3":
    {
        "row":7,
        "column":7,
        "rate":[50, 35, 15]
    }
}

export default class MazeConfig{
    static GetConfig(mazeId){
        return data[mazeId.toString()]
    }
}