export const searchReducer = (state = {text:""}, action) => {
    switch (action.type) {
        case "SEARCH_QUERY":
            //when we send dispatch with name of search_Query this will apdate the state of text
            return {...state,...action.payload}
        default:
            return state
    }
}