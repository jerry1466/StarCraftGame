/**
 * StarListPanel
 * @author lijun
 **/
import BasePanel from 'BasePanel'
import Coin from 'Coin'
import ModuleManager from 'ModuleManager'
import Productor from "Productor";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
import StarConfig from "StarConfig";

cc.Class({
    extends: BasePanel,
    properties: {
        bg:cc.Sprite,
        productivityCon:Coin,
        scrollView:cc.ScrollView,
        scrollViewContent:cc.Node,
        listItemPrefab:cc.Prefab,
        btnClose:cc.Button
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.StarListPanelBg());
        ResourceManager.LoadRemoteSprite(this.btnClose, ResConfig.CloseBtn());
    },

    update() {
        this.productivityCon.UpdateCoin(Productor.GetInstance().GetTotalProductivity(), true);
    },

    start(){
        this.productivityCon.Init(ResConfig.ProductivityConBg(), "/秒");
        this.productivityCon.InitIcon(ResConfig.DiamondIcon());
        this.refreshList();
        var that = this;
        setTimeout(function(){
            that.scrollView.scrollToTop();
        }, 100)
    },

    onDestroy() {
    },

    onClose(){
        ModuleManager.GetInstance().HideModule("StarListPanel")
    },

    refreshList(){
        this.scrollViewContent.removeAllChildren();
        var ids = StarConfig.GetStarIds();
        for(let i = 0; i < ids.length; i++)
        {
            var listItem = this.fetchListItem();
            var starListItemCom = listItem.getComponent("StarListItem");
            starListItemCom.Init(StarConfig.GetStarConfig(ids[i]));
            this.scrollViewContent.addChild(listItem);
        }
    },

    fetchListItem(){
        var listItem = cc.instantiate(this.listItemPrefab);
        return listItem;
    }
})