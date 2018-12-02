/**
 * Scene
 * @author lijun
 **/
import BuffBase from "BuffBase";
import Productor from "Productor";
import EventUtil from "EventUtil";
import BGMConfig from "BGMConfig";
import Databus from "Databus"

let databus = new Databus();
cc.Class({
    extends: cc.Component,
    properties: {
    },

    onLoad(){
        this.SwitchBgMusicHandler = this.onSwitchBgMusic.bind(this);
        EventUtil.GetInstance().AddEventListener("SwitchBgMusic", this.SwitchBgMusicHandler);
    },

    update() {
        BuffBase.Update();
        Productor.GetInstance().Update();
    },

    onDestroy() {
        EventUtil.GetInstance().RemoveEventListener("SwitchBgMusic", this.SwitchBgMusicHandler);
    },

    onSwitchBgMusic(musicName){
        if(databus.bgMusic == musicName)
        {
            return;
        }
        if(this.soundChnl) this.soundChnl.stop();
        databus.bgMusic = musicName;
        this.soundChnl = BGMConfig.BgmInit(musicName, true);
        BGMConfig.BgmPlay(this.soundChnl, true);
    }
})    