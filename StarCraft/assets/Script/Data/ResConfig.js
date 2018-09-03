let res=
{
    "bg":
    {
        "main":"battle_bg.jpg",
        "con":"coin_bg.png",
        "diamondCon":"diamondCon_bg.png",
        "productivityCon":"productivityCon_bg.png",
        "meteorCon":"gameMeteor_bg.png",
        "fixCon":"costCon_bg.png",
        "gameHpCon":"gameHpCon_bg.png",
		"findmeteor":"battle_bg.png",
        "messagebox":"window_bg1.png",
        "starListItemBg":"starListItem_bg.png",
        "mazeBg":"battle_bg.png",
        "preloadBg":"battle_bg.png",
        "cutscene":"battle_bg.png",
        "starListPanel":"myStar_bg.png",
        "guideDiamondBox":"window_bg3.png",
        "fixCompleteBox":"window_bg2.png",
        "gameResultPanel":"window_bg4.png",
        "mazePanel":"mazePanel_bg2.png",
    },
    "icon":
    {
        "diamond":"diamond_icon.png",
        "meteor":"meteor_icon.png",
        "hp":"gameHp_bg.png",
        "blackhole":"Broke.png",
        "planet":"Star.png",
        "mazeCell":"mazeCell_bg.png",
        "fog":"fog.png",
        "broke":"Broke.png",
        "newStar_1":"newStar_icon1.png",
        "newStar_2":"newStar_icon2.png",
        "star_1001":"star/star_1001.png",
        "star_1002":"star/star_1002.png",
        "star_1003":"star/star_1003.png",
        "star_1004":"star/star_1004.png",
        "star_1005":"star/star_1005.png",
        "star_1006":"star/star_1006.png",
        "star_1007":"star/star_1007.png",
        "star_1008":"star/star_1008.png",
        "star_1009":"star/star_1009.png",
        "star_1010":"star/star_1010.png",
        "star_1011":"star/star_1011.png",
        "star_1012":"star/star_1012.png",
        "broke_1001":"broke/broke_1001.png",
        "broke_1002":"broke/broke_1002.png",
        "broke_1003":"broke/broke_1003.png",
        "broke_1004":"broke/broke_1004.png",
        "broke_1005":"broke/broke_1005.png",
        "broke_1006":"broke/broke_1006.png",
        "broke_1007":"broke/broke_1007.png",
        "broke_1008":"broke/broke_1008.png",
        "broke_1009":"broke/broke_1009.png",
        "broke_1010":"broke/broke_1010.png",
        "broke_1011":"broke/broke_1011.png",
        "broke_1012":"broke/broke_1012.png",
        "affair_1":"et_icon.png",
        "affair_2":"affair_2.png",
        "affair_3":"affair_3.png",
        "affair_4":"affair_4.png",
    },
    "btn":
    {
        "viewStar":"view_btn.png",
        "gameSearchMeteor":"game_search_btn.png",
        "searchMeteor":"search_btn.png",
        "video":"video_btn.png",
        "nextStar":"nextStar_btn.png",
        "wellDone":"wellDone_btn.png",
        "unlock":"bigBtn_bg.png",
        "normal":"btn_bg.png",
        "myStarList":"myStarList_btn.png",
        "exit":"exit_btn.png",
        "fix":"fix_btn.png",
    },
    "item":
    {
        "unFreeze":"unfreeze_icon.png",
    }
}

//let baseUrl = "https://cdn-game.2zhuji.cn/uploads/wdxq/";//微信环境下用这个
let baseUrl = "Texture/";

export default class ResConfig{
    static GetAllRes(){
        var resList = [];
        for(var mainKey in res){
            for(var subKey in res[mainKey]){
                resList.push(baseUrl + res[mainKey][subKey])
            }
        }
        console.log("resList:",resList);
        return resList;
    }

    static MainBg(){
        return baseUrl + res["bg"]["main"]
    }

    static ConBg(){
        return baseUrl + res["bg"]["con"]
    }

    static DiamondConBg(){
        return baseUrl + res["bg"]["diamondCon"]
    }

    static ProductivityConBg(){
        return baseUrl + res["bg"]["productivityCon"]
    }

    static MeteorConBg(){
        return baseUrl + res["bg"]["meteorCon"]
    }

    static FixConBg(){
        return baseUrl + res["bg"]["fixCon"]
    }

    static GameHpConBg(){
        return baseUrl + res["bg"]["gameHpCon"]
    }
    
    static DiamondIcon(){
        return baseUrl + res["icon"]["diamond"]
    }

    static MeteorIcon(){
        return baseUrl + res["icon"]["meteor"]
    }

    static HpIcon(){
        return baseUrl + res["icon"]["hp"]
    }

    static FindMeteorBg() {
		return baseUrl + res["bg"]["findmeteor"]
    }

    static MessageBoxBg() {
        return baseUrl + res["bg"]["messagebox"]
    }

    static StarListItemBg(){
        return baseUrl + res["bg"]["starListItemBg"]
    }

    static MazeBg(){
        return baseUrl + res["bg"]["mazeBg"]
    }

    static PreloadBg(){
        return baseUrl + res["bg"]["preloadBg"]
    }

    static CutSceneBg(){
        return baseUrl + res["bg"]["cutscene"]
    }

    static StarListPanelBg(){
        return baseUrl + res["bg"]["starListPanel"]
    }

    static GuideDiamondBoxBg(){
        return baseUrl + res["bg"]["guideDiamondBox"]
    }

    static FixCompleteBoxBg(){
        return baseUrl + res["bg"]["fixCompleteBox"]
    }

    static GameResultPanelBg(){
        return baseUrl + res["bg"]["GameResultPanel"]
    }

    static MazePanelBg(){
        return baseUrl + res["bg"]["MazePanel"]
    }

    static NewStarIcon(index){
        return baseUrl + res["icon"]["newStar_" + index]
    }

    static GetStarIcon(id){
        return baseUrl + res["icon"]["star_" + id]
    }

    static BlackHoleIcon() {
		return baseUrl + res["icon"]["blackhole"]
    }

    static PlanetIcon() {
		return baseUrl + res["icon"]["planet"]
    }

    static MazeCellIcon(){
        return baseUrl + res["icon"]["mazeCell"]
    }

    static FogIcon(){
        return baseUrl + res["icon"]["fog"]
    }

    static BrokeIcon(id){
        return baseUrl + res["icon"]["broke_" + id]
    }

    static AffairIcon(index){
        return baseUrl + res["icon"]["affair_" + index];
    }

    static ViewStarBtn(){
        return baseUrl + res["icon"]["viewStar"]
    }

    static GameSearchMeteorBtn(){
        return baseUrl + res["icon"]["gameSearchMeteor"]
    }

    static SearchMeteorBtn(){
        return baseUrl + res["btn"]["searchMeteor"]
    }

    static VideoBtn(){
        return baseUrl + res["btn"]["video"]
    }

    static NextStarBtn(){
        return baseUrl + res["btn"]["nextStar"]
    }

    static WellDoneBtn(){
        return baseUrl + res["btn"]["wellDone"]
    }

    static UnlockBtn(){
        return baseUrl + res["btn"]["unlock"]
    }

    static NormalBtn(){
        return baseUrl + res["btn"]["normal"]
    }

    static MyStarListBtn()
    {
        return baseUrl + res["btn"]["myStarList"]
    }

    static ExitBtn() {
        return baseUrl + res["btn"]["exit"]
    }

    static FixBtn(){
        return baseUrl + res["btn"]["fix"]
    }
}