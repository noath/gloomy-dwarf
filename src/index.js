import React from 'react';
import ReactDOM from 'react-dom';
import Start from './containers/StartPage'
import Calendar from './containers/Calendar/Calendar'
import Custom from './components/CustomCalendar'
import LoginWindow from './containers/loginWindow'
import './index.css';

import {Route, Switch, BrowserRouter} from 'react-router-dom';

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/index";

import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Start}  />
                <Route exact path="/home" component={Start}  />
                <Route exact path="/login" component={LoginWindow}  />
                <Route exact path="/calendar" component={Calendar} />
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);


