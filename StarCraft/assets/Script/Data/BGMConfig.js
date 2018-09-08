let res =
{
	"hitBlackHole":"hitBlackHole.mp3",
	"collectMeteor":"collectMeteor.mp3",
}

let wxBaseUrl = "https://cdn-game.2zhuji.cn/uploads/wdxq/";//微信环境下用这个
let baseUrl = "Audio/";

export default class BGMConfig{
    static GetBgm(name) {
		return res[name]
    }

	static BgmInit(bgm) {
		var sound
		if (CC_WECHATGAME) {
			sound = wx.createInnerAudioContext()
    		sound.src = wxBaseUrl + bgm
    		sound.autoplay = true
		} else {
			sound = baseUrl + bgm
		}
		return sound
	}

	static BgmPlay(sound) {
		if (CC_WECHATGAME) {
			sound.play()
		} else {
			cc.loader.loadRes(sound, function (err, audio) {
				cc.audioEngine.play(audio, false, 1)
			})
		}
	}
}

