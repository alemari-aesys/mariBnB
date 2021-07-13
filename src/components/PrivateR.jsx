import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, isLogged, ...rest}) => {
    // console.log("CIAO");
    console.log(isLogged);
    return (
        <Route {...rest} render={
            (props) => isLogged ? 
            <Component {...props} />
            :
            <Redirect to="/Landing" />
        } />
    )
}

export default PrivateRoute;