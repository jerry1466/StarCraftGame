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
        console.warn("onSwitchBgMusic", databus.bgMusic, musicName, databus.soundChnl);
        if(databus.bgMusic == musicName)
        {
            return;
        }
        if(CC_WECHATGAME){
            if(databus.soundChnl) databus.soundChnl.stop();
        } else{
            if(databus.soundChnl != null){
                cc.audioEngine.stop(databus.soundChnl);
            }
        }
        databus.bgMusic = musicName;
        setTimeout(function() {
            databus.soundChnl = BGMConfig.BgmInit(musicName, true);
            BGMConfig.BgmPlay(databus.soundChnl, true);
        }, 100);
    }
})    