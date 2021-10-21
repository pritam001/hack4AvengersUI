import './App.css';
import * as React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import EventForm from "./pages/EventForm";
import EventList from "./pages/EventList";
import Login from "./pages/Login";
import MiniDrawer from "./components/NavBar";

function App() {
    return (
        <Router>
            <div>
                <MiniDrawer />


                <Switch>
                    <Route path="/eventform">
                        <EventForm />
                    </Route>
                    <Route path="/eventlist">
                        <EventList />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
