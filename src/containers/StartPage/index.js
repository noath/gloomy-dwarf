import React, { Component } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer"
import StartPage from "../../components/StartPage";

import {connect} from "react-redux"

class GetStarted extends Component {
    render() {
        return (
            <div>
                <Header/>
                <StartPage/>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.startStageInfo.user,
        stage: state.startStageInfo.stage
    }
}

export default connect(mapStateToProps)(GetStarted);