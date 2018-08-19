/**
 * BuffBase
 * @author lijun
 **/

cc.Class({
    onLoad() {
    	this.buffList = new array()
    },

    update() {

    },

    start() {
    },

   	static AddBuff(instance) {
		this.buffList.push(instance)
   	},

   	static DelBuff(instance) {
		this.buffList.splice(this.buffList.indexOf(instance), 1)
   	}

   	static DelAllBuff() {
		for(var i = this.buffList.length - 1; i >= 0; i--)
		{
			this.DelBuff(this.buffList[i]);
		}
   	}
})

