export const  userReducer=(state=null,action)=>{
    switch(action.type){
        case"LOGED_IN_USER":
        return action.payload
        case "LOGE_OUT":
            return action.payload          
        case "UPDATEDUSER":
            return action.payload
        default:
            return state
    }
}