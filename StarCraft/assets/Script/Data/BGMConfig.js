let res =
{
	"hitBlackHole":"hitBlackHole.mp3",
	"collectMeteor":"collectMeteor.mp3",
	"star_1001":"bgMusic_1.mp3",
    "star_1002":"bgMusic_1.mp3",
    "star_1003":"bgMusic_1.mp3",
    "star_1004":"bgMusic_1.mp3",
    "star_1005":"bgMusic_1.mp3",
    "star_1006":"bgMusic_1.mp3",
    "star_1007":"bgMusic_1.mp3",
    "star_1008":"bgMusic_1.mp3",
    "star_1009":"bgMusic_1.mp3",
    "star_1010":"bgMusic_1.mp3",
    "star_1011":"bgMusic_1.mp3",
    "star_1012":"bgMusic_1.mp3",
    "star_1013":"bgMusic_1.mp3",
    "star_1014":"bgMusic_1.mp3",
    "star_1015":"bgMusic_1.mp3",
    "star_1016":"bgMusic_1.mp3",
    "star_1017":"bgMusic_1.mp3",
    "star_1018":"bgMusic_1.mp3",
    "star_1019":"bgMusic_1.mp3",
    "star_1020":"bgMusic_1.mp3",
    "star_1021":"bgMusic_1.mp3",
    "star_1022":"bgMusic_1.mp3",
    "star_1023":"bgMusic_1.mp3",
    "star_1024":"bgMusic_1.mp3",
    "star_1025":"bgMusic_1.mp3",
    "star_1026":"bgMusic_1.mp3",
    "star_1027":"bgMusic_1.mp3",
    "star_1028":"bgMusic_1.mp3",
    "star_1029":"bgMusic_1.mp3",
    "star_1030":"bgMusic_1.mp3"
}

let wxBaseUrl = "https://cdn-game.2zhuji.cn/uploads/wdxq/audio/";//微信环境下用这个
let baseUrl = "Audio/";
let curBgm;
export default class BGMConfig{
    static GetBgm(name) {
		return res[name]
    }

    static GetStarBgm(id){
        return res["star_" + id.toString()];
    }

    static BgmRegister() {
		if (CC_WECHATGAME) {
			wx.onShow(function () {
				if (curBgm) {
					curBgm.play();
				}
			});
		}
    }

	static BgmInit(bgm, loop) {
        if(loop == null) loop = false;
		var sound
		if (CC_WECHATGAME) {
			sound = wx.createInnerAudioContext()
    		sound.src = wxBaseUrl + bgm;
            sound.loop = loop;
		} else {
			sound = baseUrl + bgm
		}
		if(loop)
        {
            curBgm = sound;
        }
		return sound;
	}

	static BgmPlay(sound) {
		if (CC_WECHATGAME) {
			sound.play();
			sound.autoplay = true;
		} else {
			cc.loader.loadRes(sound, function (err, audio) {
				cc.audioEngine.play(audio, false, 1);
			})
		}
	}
}

