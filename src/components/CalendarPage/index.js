import React, { Component } from "react";
import { Parallax } from "react-parallax";
import TabsWindow from "../../containers/TabsWindow"
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import setStateAction from "../../actions/actionTab";

import { connect } from "react-redux"


const styles = {
    margin: "35px",
    fontFamily: "sans-serif",
    textAlign: "center",
};

// const image = require('../../util/calendar-back.jpg');

class Main extends Component{
    render() {
        return (
        <div>
            <div style={styles}>
                <div>
                    <TabsWindow setTab={this.props.setStateFunction}/>
                </div>
            </div>
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

function mapDispatchToProps(dispatch) {
    return {
        setStateFunction: tab => {
            dispatch(setStateAction(tab))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);