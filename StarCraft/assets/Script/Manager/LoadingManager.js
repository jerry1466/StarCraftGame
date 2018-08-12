let instance
export default class LoadingManager{
    constructor(){

    }

    static GetInstance(){
        if(instance == null){
            instance = new LoadingManager()
        }
        return instance
    }

    static DoLoad(resList){
        
    }
}