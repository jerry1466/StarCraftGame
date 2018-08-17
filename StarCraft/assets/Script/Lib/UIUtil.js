import ModuleManager from "ModuleManager"

export default class UIUtil {

    static Confirm(tip, confirmHandler){
        ModuleManager.GetInstance().ShowModule("MessageBox",
            {"mode":"confirm", content:tip, confirm:confirmHandler})
    }

    static ConfirmCancel(tip, confirmHandler, cancelHandler){
        ModuleManager.GetInstance().ShowModule("MessageBox",
            {"mode":"confirmCancel", content:tip, confirm:confirmHandler, cancel:cancelHandler})
    }
}