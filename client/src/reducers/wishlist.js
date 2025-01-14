// export const wishlistReducer = (state = null, action) => {
//     switch (action.type) {
//         case "WISHLIST":
//             return action.payload
//         default:
//             return state
//     }
// } 


let initialState = []
//load cart from local storeage
if (typeof window !== 'undefined') {
    if (localStorage.getItem("wishlist")) {
        initialState = JSON.parse(localStorage.getItem("wishlist"))
    } else {
        initialState = []
    }
}

export const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case "WISHLIST":
            return action.payload
        default:
            return state
    }
} 