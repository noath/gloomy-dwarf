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
import setSelected from "../../actions/actionCalendarSelected";
import {connect} from "react-redux";

const formStyle = {
    position:"absolute", 
    right:"1%", 
    top:"127px", 
    width:"29%",
    padding: "20px", /* Поля вокруг текста */
    marginRight: "10px", /* Отступ справа */
    marginBottom: "10px", /* Отступ снизу */
    outline: "2px solid #666", /* Параметры рамки */
    background: "#f0f0f0", /* Цвет фона */
    fontFamily: "sans-serif",
    textAlign: "left",
}

class App extends Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    

    handleCancel() {
        return this.props.setSelectedAction({...this.props.selected, flag: 0});
    }

    handleDelete() {
        axios
            .delete('http://localhost:8000/api/event/' + this.props.selected.event.id)
            .then(response => {
                window.location.reload(); 
                return this.props.setSelectedAction({flag: 0, event: {}});
            })
            .catch(err => {
                console.log(err.response);
                alert('ERROR! Check log for detailes');
            })
    }

    render() {
        if (this.props.selected) {
            if (this.props.selected.flag === 1) {
                return (
                    <div>
                        <Form className="form" style={formStyle}>
                            <div style = {{position: 'absolute', top: '10px', right: '10px'}}>
                                <Button btnStyle="secondary" 
                                    onClick={this.handleCancel} 
                                    style={{transform: "scale(0.9,0.7)", fontSize: 25}}>
                                    x
                                </Button>
                            </div>
                            <h5>
                                <b> Title: </b> 
                                {this.props.selected.event.title}
                            </h5>
                            <h5>
                                <b> Start: </b> 
                                {moment(this.props.selected.event.start).toString()}
                            </h5>
                            <h5>
                                <b> End: </b>
                                {moment(this.props.selected.event.end).toString()}
                            </h5>
                            <h5>
                                <b> Description: </b>
                            </h5>
                            <h5>
                                {this.props.selected.event.description}
                            </h5>
                            <Button btnStyle="danger" 
                                onClick={this.handleDelete}> 
                                Delete
                            </Button>
                        </Form>
                    </div>
                );
            }
        }
        return (
            <Form className="form" style={{...formStyle, fontStyle: 'italic'}}>
                <it>Choose any event too see details</it>
            </Form>
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