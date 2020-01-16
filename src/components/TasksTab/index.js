import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import {Button} from 'react-bootstrap-buttons';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import {
    FormGroup,
    Form,
    Input,
    Col,
    Label
} from "reactstrap";
import setStateAction from "../../actions/actionTab";
import {connect} from "react-redux";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
};
const insideStyles = {
    height: '50%',
    width: '50%',
    transform: "translate(50%, 20px)",
};
const formStyle = {
    'fontWeight': 'bold',
    color: 'rgb(60,0,8)',
    backgroundColor: 'rgb(255,255,255)',
    'borderRadius': '7px',
    opacity: 0.83
};

const buttonStyle1 = {
    transform: "translateY(-5px)"
};


class Forms extends Component {
    constructor(props) {
        super(props);
        this.toCalendar = this.toCalendar.bind(this)
        this.toTasks = this.toTasks.bind(this)
        this.addEvent = this.addEvent.bind(this)
        this.state = {
            title : "",
            start : "",
            end : "",
            description : "",
        }
        this.handleTitleInput = this.handleTitleInput.bind(this)
        this.handleStartInput = this.handleStartInput.bind(this)
        this.handleEndInput = this.handleEndInput.bind(this)
        this.handleDescrInput = this.handleDescrInput.bind(this)
        this.addEvent = this.addEvent.bind(this)
    }

    addEvent() {
        var data = {
            "title" : this.state.title,
            "author" : '1',
            "start" : this.state.start,
            "end" : this.state.end,
            "description" : this.state.description,
        }
        var start = moment(this.state.start);
        var end = moment(this.state.end);
        var now = moment();
        var lower_bound = moment(this.state.start).subtract(1, 'years').subtract(1, 'months');
        var upper_bound = moment(this.state.end).add(1, 'years').add(1, 'months');
        if (this.state.title === "") {
            alert('Please, enter new event title!')
        }
        else if (this.state.start === "") {
            alert('Please, enter new event start date and time both!')
        }
        else if (moment.min(start, lower_bound) === start || moment.min(start, upper_bound) === upper_bound){
            alert('The new event start time is too different from the current time!\n(The difference should not be more than 1 year)')
        }
        else if (this.state.end === "") {
            alert('Please, enter new event end date and time both!')
        }
        else if (moment.min(start, end) === end) {
            alert('The start time of the event should be less than the end time!');
        }
        else if (moment.min(end, lower_bound) === end || moment.min(end, upper_bound) === upper_bound){
            alert('The new event end time is too different from the current time!\n(The difference should not be more than 1 year)')
        }
        else if (this.state.description === "") {
            alert('Please, enter new event description!')
        }
        else {
            axios
                .post("http://localhost:8000/api/event", data)
                .then(response => {
                    console.log(response.status.toString()[0]);
                    if (response.status.toString()[0] === '2') {
                        alert("Event created!")
                        this.toCalendar();
                    }
                    else {
                        alert("ERROR: Event didn't create!")
                    }
                })
                .catch(err => {
                    console.log(err.response);
                    alert("ERROR: Something went wrong :( \nEvent didn't create!");
                });
        }
    }

    handleTitleInput(event) {
        this.setState({
            title: event.target.value
        })
    }

    handleStartInput(event) {
        this.setState({
            start: event.target.value
        })
    }

    handleEndInput(event) {
        this.setState({
            end: event.target.value
        })
    }

    handleDescrInput(event) {
        this.setState({
            description: event.target.value
        })
    }

    toCalendar() {
        return this.props.setTab("calendar");
    }

    toTasks() {
        return this.props.setTab("task");
    }

    render() {
        return (
            <div>
                <div>
                    <div style={formStyle}>
                        <h1>Add a new event</h1>
                        <Form className="form">
                            <Col>
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input
                                        type="textarea"
                                        name="text"
                                        id="TaskName"
                                        placeholder="Event title"
                                        onChange={this.handleTitleInput}
                                    />
                                </FormGroup>
                            </Col>
                            {/* <h1>HERE: {this.state.title}</h1> */}
                            <Col>
                                <FormGroup>
                                    <Label>Start time</Label>
                                    <Input
                                        type="datetime-local"
                                        name="datetime"
                                        id="TaskDate"
                                        placeholder="date placeholder"
                                        onChange={this.handleStartInput}
                                    />
                                </FormGroup>
                            </Col>
                            {/* <h1>HERE: {this.state.start}</h1> */}
                            <Col>
                                <FormGroup>
                                    <Label>End time</Label>
                                    <Input
                                        type="datetime-local"
                                        name="datetime"
                                        id="TaskDate"
                                        placeholder="date placeholder"
                                        onChange={this.handleEndInput}
                                    />
                                </FormGroup>
                            </Col>
                            {/* <h1>HERE: {this.state.end}</h1> */}
                            <Col>
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input
                                        type="textarea"
                                        name="text"
                                        id="TaskNotes"
                                        placeholder="Description"
                                        onChange={this.handleDescrInput}
                                    />
                                </FormGroup>
                            </Col>
                            {/* <h1>HERE: {this.state.description}</h1> */}
                            <Button btnStyle="primary"  
                                style = {buttonStyle1} 
                                onClick={this.toCalendar}>
                                Back
                            </Button>
                            <Button btnStyle="primary"  
                                style = {buttonStyle1} 
                                onClick={this.addEvent}
                                >Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

class Tasks extends Component{
    render(){
        return(
            <div style={styles}>
                <div style={insideStyles}>
                    <Forms setTab={this.props.setStateFunction}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);