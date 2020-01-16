import React, { Component } from "react";
import {
    Calendar,
    momentLocalizer,
} from 'react-big-calendar';
import moment from "moment";
import axios from 'axios';
import "react-big-calendar/lib/css/react-big-calendar.css";
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
import DescriptionWindow from '../DescriptionWindow'
import setSelected from "../../actions/actionCalendarSelected";
import setFlag from "../../actions/actionCalendarFlag"
import {connect} from "react-redux";

const localizer = momentLocalizer(moment)

class App extends Component {
    constructor(props) {
        super(props);
        this.refreshEvents = this.refreshEvents.bind(this);
        this.selectEvent = this.selectEvent.bind(this);
        this.state = {
            events: [],
        };//state
        this.refreshEvents();
    }
    
    refreshEvents() {
        axios
            .get('http://localhost:8000/api/event')
            .then(response => {
                var data = response.data;
                for (var i = 0; i < data.length; i++){
                    data[i].start = new Date(data[i].start);
                    data[i].end = new Date(data[i].end);
                }
                this.setState({
                    events: data,
                })
                return this.props.setSelectedAction({flag: 0, event: {}});
            })
            .catch(err => {
                console.log(err.response);
                alert('ERROR: Attempt to refresh events failed!');
            })
    }

    selectEvent(event) {
        return this.props.setSelectedAction({event: event, flag:1});
    }

    render() {
        return (
            <div className="Calendar">
                <Calendar
                    resizable
                    selectable
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={this.state.events}
                    onSelectEvent={this.selectEvent}
                    style={{ height: "80vh", width : "69%"}}
                />
                <div style = {{position: 'fixed', bottom: '10px', left: '135px'}}>
                    <Button btnStyle="primary" 
                        onClick={this.refreshEvents}>
                        Refresh
                    </Button>
                </div>
                <DescriptionWindow/>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
      user: store.calendarPageInfo.user,
    //   flag: store.calendarPageInfo.flag,
      selected: store.calendarPageInfo.selected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // setFlagAction: flag => dispatch(setFlag(flag)),
        setSelectedAction: (selected) => dispatch(setSelected(selected)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
