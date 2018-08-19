import BuffBase from "BuffBase"

export default class Harvest {
	extends: BasePanel,

	onLoad() {
		this.lastTime = 30 * 60
		this.active = false
    },

    Active() {
		this.active = true
		this.endTime = getTime() + this.lastTime
		BuffBase.AddBuff(this)
    },

    Timeout() {
		if (getTime() >= this.endTime) {
			this.active = false
			BuffBase.DelBuff(this)
		}
    }

    Buffing(param) {
		if (this.active) {
			return param * 20 / 100
		}

		return param	
    }
}
