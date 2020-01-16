import React, { Component } from "react";
import { Button } from "react-bootstrap-buttons";
import Tasks from "../../components/TasksTab";
import CustomCalendar from "../../components/CustomCalendar"
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';


class LoginWindow extends Component {
    constructor(props) {
        super(props);
        this.toCalendar = this.toCalendar.bind(this);
        this.toTasks = this.toTasks.bind(this);
        this.toStart = this.toStart.bind(this);
    }

    toCalendar() {
        return this.props.setTab("calendar");
    }

    toTasks() {
        return this.props.setTab("task");
    }

    toStart() {
        return this.props.setTab("start");
    }

    render() {
        switch (this.props.tab){
            case 'calendar' :
                return <div>
                    <div style = {{position: 'absolute', top: '10px', right: '1%'}}>
                        <Button btnStyle="primary" onClick={this.toStart}>Log out</Button>
                    </div>
                    <CustomCalendar />
                    <div style = {{position: 'fixed', bottom: '10px', left: '10px'}}>
                        <Button btnStyle="primary" onClick={this.toTasks}><b>+ </b>New Event</Button>
                    </div>
                </div>
            case 'task':
                return <div>
                    <div style = {{position: 'absolute', top: '10px', right: '10px'}}>
                        <Button btnStyle="primary" onClick={this.toStart}>Log out</Button>
                    </div>
                    <Tasks />
                </div>
            case 'start':
                this.toCalendar();
                return <div>
                    <Redirect to="/" />
                </div >
            default:
                return null
        }
    }
}

function mapStateToProps(state) {
    return {
        tab: state.calendarPageInfo.tab,
        user: state.calendarPageInfo.user,
    }
}

export default connect(mapStateToProps)(LoginWindow);