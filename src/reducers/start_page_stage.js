const initialState = {
    user: "unknown user",
    stage: "hello",
};


export default function startStageInfo (state = initialState, action) {
    switch (action.type) {
        case "SET_STAGE":
            return {...state, stage: action.payload};
        default:
            return state
    }
};