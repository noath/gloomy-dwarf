import React, {Component} from "react";
import {Button} from 'react-bootstrap-buttons';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';

import { connect } from "react-redux";

// reactstrap components
import {
    FormGroup,
    Form,
    Input,
    Col,
    Label
} from "reactstrap";
import setStateAction from "../../actions/actionStage";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
};
const insideStyles = {
    height: '50%',
    width: '50%',
    transform: "translate(50%, 200px)",
};
const formStyle = {
    fontWeight: 'bold',
    color: 'rgb(60,0,8)',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: '7px',
    opacity: 0.93
};
const buttonStyle = {
    transform: "translate(0, -10%)"
};

class Forms extends Component {
    constructor(props) {
        super(props);
        this.toRegister = this.toRegister.bind(this);
        this.toStart = this.toStart.bind(this);
        this.toCalendar = this.toCalendar.bind(this);
    }

    toRegister() {
        return this.props.setStage("register");
    }

    toCalendar(){
        return this.props.setStage("calendar");
    }

    toStart() {
        return this.props.setStage("hello");
    }

    render() {
        return (
            <div style={formStyle}>
                <h1>Log in</h1>
                <Form className="form">
                    <Col>
                        <FormGroup>
                            <Label>Nickname</Label>
                            <Input
                                type="text"
                                name="nick"
                                id="nick"
                                placeholder="Your nickname"
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="*****************"
                            />
                        </FormGroup>
                    </Col>

                <Button style = {buttonStyle} btnStyle="warning" onClick={this.toStart}>Back</Button>
                <Button style = {buttonStyle} btnStyle="warning" onClick={this.toCalendar} >Submit</Button>
                <Button style = {buttonStyle} btnStyle="warning" onClick={this.toRegister}>Create new account</Button>
                </Form>
            </div>
        );
    }
}

class SignUp extends React.Component {
    render() {
        return (
            <div style={styles}>
                <div style={insideStyles}>
                    <Forms setStage={this.props.setStateFunction}/>
                </div>
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

function mapDispatchToProps(dispatch) {
    return {
        setStateFunction: stage => {
            dispatch(setStateAction(stage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);