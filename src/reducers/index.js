import { combineReducers } from "redux"
import startStageInfo from "./start_page_stage"
import calendarPageInfo from "./calendar_stage";

const rootReducer = combineReducers({
    startStageInfo,
    calendarPageInfo
});

export default rootReducer;