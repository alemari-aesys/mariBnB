import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import Landing from "./Landing";
import {Redirect} from "react-router-dom";
import { useState, useEffect } from "react";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import Signup from "./components/Signup";
// export const context = createContext();

//ID progetto su Google dev console = just-charger-307215
//API key AIzaSyA8Xvpwd_Ux3ycmkDGIDjE31J2XlgCkZfM
//ID Client OAuth 448898835160-o3qff60nn1rbjcvqsojud08run08243j.apps.googleusercontent.com
//CLIENT SECRET 8AK4FzcVohFkhry2v_6eP9Mo

function App() {

    const [logged, setLogged] = useState(sessionStorage.getItem("logged") ? true : false);

    useEffect(() => {
        console.log(logged);
    }, [logged])

    return (
        <div>
            <AuthProvider>
                <Switch>
                {/* {logged ? <Home /> : <Landing setLogged={setLogged} />} */}
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route path="/signup">
                    <Signup setLogged={setLogged}/>
                </Route>
                {logged ? <Home /> : <Landing setLogged={setLogged}/>}
                </Switch>
            </AuthProvider>
        </div>
    );
}

export default App;