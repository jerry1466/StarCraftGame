let instance
export default class ModuleConstant {
    constructor() {

    }

    static GetInstance(){
        if(instance)
        {
            return instance
        }
        instance = new ModuleConstant();
        instance.moduleNames = {};
        instance.register();
        return instance
    }

    register(){
        this.moduleNames["PanelMask"] = "Panel/PanelMask";
        this.moduleNames["StarListPanel"] = "Panel/StarListPanel";
        this.moduleNames["RankPanel"] = "Panel/RankPanel";
        this.moduleNames["SimpleRankPanel"] = "Panel/SimpleRankPanel";
        this.moduleNames["AdPanel"] = "Panel/AdPanel";
        this.moduleNames["LoginPanel"] = "Panel/LoginPanel";
        this.moduleNames["CheatPanel"] = "Panel/CheatPanel";
        this.moduleNames["Guide"] = "Panel/Guide";
        this.moduleNames["IntroducePanel"] = "Panel/IntroducePanel";
        this.moduleNames["DiamondRewardBox"] = "Panel/DiamondRewardBox";
        this.moduleNames["MeteorRewardBox"] = "Panel/MeteorRewardBox";
        this.moduleNames["RobBox"] = "Panel/RobBox";
        this.moduleNames["MessageBox"] = "Panel/MessageBox";
        this.moduleNames["GuideMeteorBox"] = "Panel/GuideMeteorBox";
        this.moduleNames["GuideDiamondBox"] = "Panel/GuideDiamondBox";
        this.moduleNames["FixCompleteBox"] = "Panel/FixCompleteBox";
        this.moduleNames["GameResultPanel"] = "Panel/GameResultPanel";
    }

    GetModuleUrl(moduleName){
        return this.moduleNames[moduleName];
    }
}