import React from "react";
import { Button } from "react-bootstrap-buttons";
import Register from "../../components/RegisterForm";
import SignUp from "../../components/LoginForm";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

const insideStyles = {
    transform: "scale(2,2)translate(0, 190px)",
    textAlign: "center",
};

class LoginWindow extends React.Component {
    constructor(props) {
        super(props);
        this.toSignUp = this.toSignUp.bind(this)
    }

    toSignUp() {
        return this.props.setStage("signup");
    }
    render() {
        switch (this.props.stage){
            case 'hello' :
                return <div style={insideStyles}>
                    <Button onClick={this.toSignUp} lg btnStyle="warning">
                        <h1> Get started </h1>
                    </Button>
                </div>;
            case 'signup':
                return <div>
                    <SignUp/>
                </div>;
            case 'register':
                return <div>
                    <Register/>
                </div>;
            case 'calendar':
                this.toSignUp();
                return <div>
                    <Redirect to="/calendar" />
                    </div >;
            default:
                return null
        }
    }
}

function mapStateToProps(state) {
    return {
        stage: state.startStageInfo.stage,
        user: state.startStageInfo.user,
    }
}

export default connect(mapStateToProps)(LoginWindow);