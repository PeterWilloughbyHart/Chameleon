import React from 'react';
import {Switch, Route} from 'react-router-dom';
import App from './App';
import Gallery from './components/Gallery';

export default (
    <Switch>
        <Route path="/" exact component={App}></Route>
        <Route path="/Gallery" component={Gallery}></Route>
    </Switch>
)