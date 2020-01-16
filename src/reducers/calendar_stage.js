const initialState = {
    user: "unknown user",
    tab: "calendar",
}

export default function calendarPageInfo (state = initialState, action) {
    switch (action.type) {
        case "SET_TAB":
            return {...state, tab: action.payload};
        case "SET_SELECTED":
            return {...state, selected: action.payload};
        case "SET_FLAG":
            return {...state, flag: action.payload};
        default:
            return state;
    }
};