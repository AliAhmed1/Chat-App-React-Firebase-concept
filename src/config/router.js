import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from '../container/Home'
import Chat from '../container/Chat'

export default function App() {
    return (
        <div>
            <Router>
                <Route path="/" exact component={Home} />
                <Route path="/chat" exact component={Chat}/>
            </Router>
        </div>
    )
}
