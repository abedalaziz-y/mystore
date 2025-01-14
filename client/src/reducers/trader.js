let initialState = []
//load cart from local storeage
if (typeof window !== 'undefined') {
    if (localStorage.getItem("trader")) {
        initialState = JSON.parse(localStorage.getItem("trader"))
    } else {
        initialState = []
    }
}

export const traderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TRADER":
            return action.payload
        default:
            return state
    }
} 