import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Metropolis from "./Categories/Metropolis";
import Beach from "./Categories/Beach";
import Relax from "./Categories/Relax";
import {BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Flat from "./components/Flat";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";

function Home() {
    
    return (
    <div>
        <Router>
        <Header />
        <Switch>
            <PrivateRoute exact path="/home/Metropolis" component={Metropolis} />
            <PrivateRoute exact path="/home/Beach" component={Beach} />
            <PrivateRoute exact path="/home/Relax" component={Relax} />
            <PrivateRoute exact path="/home/Metropolis/:param" component={Flat} />
            <PrivateRoute exact path="/home/Relax/:param" component={Flat} />
            <PrivateRoute exact path="/home/Beach/:param" component={Flat} />
            <PrivateRoute exact path="/home" component={Content} />
        </Switch>
        </Router>
    </div>
    );
}

export default Home;