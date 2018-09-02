let data =
{
     "1001":
     {
        "row":5,
        "rate":[70, 30, 0]
        "column":5,
     },
    "1002":
    {
        "row":6,
        "column":6,
        "rate":[60, 40, 0]
    },
    "1003":
    {
        "row":7,
        "column":7,
        "rate":[50, 35, 15]
    }
}

export default class MazeConfig{
    static GetConfig(starId){
        return data[starId.toString()]
    }
}