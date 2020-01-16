import React, { Component } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer"
import Main from "../../components/CalendarPage";

import {connect} from "react-redux"


class Calendar extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Main/>
                {/* <Footer/> */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.calendarPageInfo.user,
        tab: state.calendarPageInfo.tab
    }
}

export default connect(mapStateToProps)(Calendar);