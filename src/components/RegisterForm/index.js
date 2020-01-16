import React from "react";
import {Button} from 'react-bootstrap-buttons';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';

// reactstrap components
import {
    FormGroup,
    Form,
    Input,
    Col,
    Label
} from "reactstrap";
import setStateAction from "../../actions/actionStage";
import {connect} from "react-redux";

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
    'fontWeight': 'bold',
    color: 'rgb(60,0,8)',
    backgroundColor: 'rgb(255,255,255)',
    'borderRadius': '7px',
    opacity: 0.93
};
const buttonStyle = {
    transform: "translate(0, -10%)"
};

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.toSignUp = this.toSignUp.bind(this);
        this.toCalendar= this.toCalendar.bind(this);
    }

    toSignUp() {
        return this.props.setStage("signup");
    }

    toCalendar(){
        return this.props.setStage("calendar");
    }

    render() {
        return (
            <div style={formStyle}>
                <h1>Create an account</h1>
                <Form className="form">
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="name@mail.com"
                            />
                        </FormGroup>
                    </Col>
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
                <Button style = {buttonStyle} btnStyle="warning" onClick={this.toSignUp}>Back</Button>
                <Button style = {buttonStyle} btnStyle="warning" onClick={this.toCalendar}>Submit</Button>
                </Form>
            </div>
        );
    }
}

class Register extends React.Component{
    render(){
        return(
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);