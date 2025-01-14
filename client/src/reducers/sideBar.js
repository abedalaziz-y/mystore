

export const sidebarReducer = (state = false, action) => {
    switch (action.type) {
        case "SET_SIDE":
            return action.payload
        default:
            return state
    }
}
