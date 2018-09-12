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
		"findmeteor":"gamePanel_bg.png",
        "messagebox":"window_bg1.png",
        "starListItemBg":"starListItem_bg.png",
        "mazeBg":"battle_bg.jpg",
        "preloadBg":"battle_bg.jpg",
        "cutscene":"battle_bg.jpg",
        "starListPanel":"myStar_bg.png",
        "guideDiamondBox":"window_bg3.png",
        "fixCompleteBox":"window_bg2.png",
        "gameResultPanel":"window_bg4.png",
        "mazePanel":"mazePanel_bg2.png",
        "frame":"frame.png",
        "line":"mazeLine.png",
        "loginPanel":"loginPanel_bg.png",
        "guideCircle":"select.png",
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
        "star":"Star.png",
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
        "star_1013":"star/star_1013.png",
        "star_1014":"star/star_1014.png",
        "star_1015":"star/star_1015.png",
        "star_1016":"star/star_1016.png",
        "star_1017":"star/star_1017.png",
        "star_1018":"star/star_1018.png",
        "star_1019":"star/star_1019.png",
        "star_1020":"star/star_1020.png",
        "star_1021":"star/star_1021.png",
        "star_1022":"star/star_1022.png",
        "star_1023":"star/star_1023.png",
        "star_1024":"star/star_1024.png",
        "star_1025":"star/star_1025.png",
        "star_1026":"star/star_1026.png",
        "star_1027":"star/star_1027.png",
        "star_1028":"star/star_1028.png",
        "star_1029":"star/star_1029.png",
        "star_1030":"star/star_1030.png",
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
        "broke_1013":"broke/broke_1013.png",
        "broke_1014":"broke/broke_1014.png",
        "broke_1015":"broke/broke_1015.png",
        "broke_1016":"broke/broke_1016.png",
        "broke_1017":"broke/broke_1017.png",
        "broke_1018":"broke/broke_1018.png",
        "broke_1019":"broke/broke_1019.png",
        "broke_1020":"broke/broke_1020.png",
        "broke_1021":"broke/broke_1021.png",
        "broke_1022":"broke/broke_1022.png",
        "broke_1023":"broke/broke_1023.png",
        "broke_1024":"broke/broke_1024.png",
        "broke_1025":"broke/broke_1025.png",
        "broke_1026":"broke/broke_1026.png",
        "broke_1027":"broke/broke_1027.png",
        "broke_1028":"broke/broke_1028.png",
        "broke_1029":"broke/broke_1029.png",
        "broke_1030":"broke/broke_1030.png",
        "affair_1":"affair/affair_1.png",
        "affair_2":"affair/affair_2.png",
        "affair_11":"affair/affair_11.png",
        "affair_12":"affair/affair_12.png",
        "affair_13":"affair/affair_13.png",
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
        "bigBtn":"bigBtn_bg.png",
        "myStarList":"myStarList_btn.png",
        "exit":"exit_btn.png",
        "fix":"fix_btn.png",
        "close":"close_btn.png",
        "bubble":"bubble.png",
        "bar_rank":"1.png",
        "bar_aiwan":"2.png",
        "bar_more":"3.png",
        "bar_audio":"4.png",
        "ad":"moreGameBox.png",
    },
    "item":
    {
        "unFreeze":"unfreeze_icon.png",
    }
}

let wxBaseUrl = "https://cdn-game.2zhuji.cn/uploads/wdxq/";//微信环境下用这个
let baseUrl = "Texture/";

export default class ResConfig{
    static GetBaseUrl(){
        if(CC_WECHATGAME)
        {
            return wxBaseUrl;
        }
        else
        {
            return baseUrl;
        }
    }

    static GetAllRes(){
        var resList = [];
        for(var mainKey in res){
            for(var subKey in res[mainKey]){
                resList.push(this.GetBaseUrl() + res[mainKey][subKey])
            }
        }
        return resList;
    }

    static MainBg(){
        return this.GetBaseUrl() + res["bg"]["main"]
    }

    static ConBg(){
        return this.GetBaseUrl() + res["bg"]["con"]
    }

    static DiamondConBg(){
        return this.GetBaseUrl() + res["bg"]["diamondCon"]
    }

    static ProductivityConBg(){
        return this.GetBaseUrl() + res["bg"]["productivityCon"]
    }

    static MeteorConBg(){
        return this.GetBaseUrl() + res["bg"]["meteorCon"]
    }

    static FixConBg(){
        return this.GetBaseUrl() + res["bg"]["fixCon"]
    }

    static GameHpConBg(){
        return this.GetBaseUrl() + res["bg"]["gameHpCon"]
    }

    static FrameBg(){
        return this.GetBaseUrl() + res["bg"]["frame"]
    }
    
    static DiamondIcon(){
        return this.GetBaseUrl() + res["icon"]["diamond"]
    }

    static MeteorIcon(){
        return this.GetBaseUrl() + res["icon"]["meteor"]
    }

    static HpIcon(){
        return this.GetBaseUrl() + res["icon"]["hp"]
    }

    static FindMeteorBg() {
		return this.GetBaseUrl() + res["bg"]["findmeteor"]
    }

    static MessageBoxBg() {
        return this.GetBaseUrl() + res["bg"]["messagebox"]
    }

    static StarListItemBg(){
        return this.GetBaseUrl() + res["bg"]["starListItemBg"]
    }

    static MazeBg(){
        return this.GetBaseUrl() + res["bg"]["mazeBg"]
    }

    static PreloadBg(){
        return this.GetBaseUrl() + res["bg"]["preloadBg"]
    }

    static CutSceneBg(){
        return this.GetBaseUrl() + res["bg"]["cutscene"]
    }

    static StarListPanelBg(){
        return this.GetBaseUrl() + res["bg"]["starListPanel"]
    }

    static GuideDiamondBoxBg(){
        return this.GetBaseUrl() + res["bg"]["guideDiamondBox"]
    }

    static FixCompleteBoxBg(){
        return this.GetBaseUrl() + res["bg"]["fixCompleteBox"]
    }

    static GameResultPanelBg(){
        return this.GetBaseUrl() + res["bg"]["gameResultPanel"]
    }

    static MazeCellLine(){
        return this.GetBaseUrl() + res["bg"]["line"]
    }

    static MazePanelBg(){
        return this.GetBaseUrl() + res["bg"]["mazePanel"]
    }

    static LoginPanelBg(){
        return this.GetBaseUrl() + res["bg"]["loginPanel"]
    }

    static GuideCircle(){
        return this.GetBaseUrl() + res["bg"]["guideCircle"]
    }

    static NewStarIcon(index){
        return this.GetBaseUrl() + res["icon"]["newStar_" + index]
    }

    static FatalStarIcon(){
        return this.GetBaseUrl() + res["icon"]["star"]
    }

    static GetStarIcon(id){
        return this.GetBaseUrl() + res["icon"]["star_" + id]
    }

    static BlackHoleIcon() {
		return this.GetBaseUrl() + res["icon"]["blackhole"]
    }

    static PlanetIcon() {
		return this.GetBaseUrl() + res["icon"]["planet"]
    }

    static MazeCellIcon(){
        return this.GetBaseUrl() + res["icon"]["mazeCell"]
    }

    static FogIcon(){
        return this.GetBaseUrl() + res["icon"]["fog"]
    }

    static BrokeIcon(id){
        return this.GetBaseUrl() + res["icon"]["broke_" + id]
    }

    static AffairIcon(type){
        return this.GetBaseUrl() + res["icon"]["affair_" + type];
    }

    static ViewStarBtn(){
        return this.GetBaseUrl() + res["icon"]["viewStar"]
    }

    static GameSearchMeteorBtn(){
        return this.GetBaseUrl() + res["icon"]["gameSearchMeteor"]
    }

    static SearchMeteorBtn(){
        return this.GetBaseUrl() + res["btn"]["searchMeteor"]
    }

    static VideoBtn(){
        return this.GetBaseUrl() + res["btn"]["video"]
    }

    static NextStarBtn(){
        return this.GetBaseUrl() + res["btn"]["nextStar"]
    }

    static WellDoneBtn(){
        return this.GetBaseUrl() + res["btn"]["wellDone"]
    }

    static UnlockBtn(){
        return this.GetBaseUrl() + res["btn"]["unlock"]
    }

    static NormalBtn(){
        return this.GetBaseUrl() + res["btn"]["normal"]
    }

    static BigBtn(){
        return this.GetBaseUrl() + res["btn"]["bigBtn"]
    }

    static MyStarListBtn()
    {
        return this.GetBaseUrl() + res["btn"]["myStarList"]
    }

    static ExitBtn() {
        return this.GetBaseUrl() + res["btn"]["exit"]
    }

    static FixBtn(){
        return this.GetBaseUrl() + res["btn"]["fix"]
    }

    static CloseBtn(){
        return this.GetBaseUrl() + res["btn"]["close"]
    }

    static BubbleBtn(){
        return this.GetBaseUrl() + res["btn"]["bubble"]
    }

    static RankBtn(){
        return this.GetBaseUrl() + res["btn"]["bar_rank"]
    }

    static AiwanBtn(){
        return this.GetBaseUrl() + res["btn"]["bar_aiwan"]
    }

    static MoreGameBtn(){
        return this.GetBaseUrl() + res["btn"]["bar_more"]
    }

    static AudioBtn(){
        return this.GetBaseUrl() + res["btn"]["bar_audio"]
    }

    static AdBtn(){
        return this.GetBaseUrl() + res["btn"]["ad"]
    }
}