import React, { Component } from "react";
import {Parallax} from "react-parallax";
import LoginButton from "../../containers/loginWindow"
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import setStateAction from "../../actions/actionStage";

import { connect } from "react-redux"

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    background: "rgba(145,79,91,0.46)",
};
const insideStyles = {
    height: 900,
};
const image1 = require('../../util/dwarf.jpg');

class Main extends Component{
    render() {
        return (
        <div>
            <div style={styles}>
                <Parallax bgImage={image1} strength={500} blur={2}>
                    <div style={insideStyles}>
                        <LoginButton setStage={this.props.setStateFunction}/>
                    </div>
                </Parallax>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        user: state.startStageInfo.user,
        stage: state.startStageInfo.stage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setStateFunction: stage => {
            dispatch(setStateAction(stage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);