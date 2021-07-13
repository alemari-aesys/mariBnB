import React, { useContext, useState, useEffect, useRef } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Header from "./components/Header";
import Content from "./components/Content";
import { Route, Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

// import { context } from "./App";

import { useAuth } from "./contexts/AuthContext";
import { useHistory } from "react-router";

function Landing({ setLogged }) {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
    }));

    const classes = useStyles();

    const logMe = () => {
        const f = () => {
            return new Promise((resolve) => {
                const f = login(emailRef.current.value, passwordRef.current.value);
                resolve(f)
            })
        }

        f()
        .then((res) => {
            setLogged(true);
            sessionStorage.setItem("logged", true);
        })
        .catch((g) => {
            if (g.code === "auth/wrong-password") {
                setError("Wrong password")
            } else {
                setError(g.code)
            }
        });
    }

    const validationSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });

    return (
        <Grid style={{ padding: 50}} container>
            <Grid item xs={12} sm={12}>
                <h1>MariBnB</h1>
                <h3>Enter your username and password</h3>
            </Grid>
            <Grid item xs={12} sm={12}>
                <form className={classes.root} onSubmit={handleSubmit(logMe)} action="/Landing" method="POST">
                    <TextField type="text" id="username" inputRef={emailRef} label="Username" {...register("username", {required: true})}/>
                    <p>{errors.username ?.message}</p>
                    <TextField type="password" id="password" inputRef={passwordRef} label="Password" variant="filled" {...register("password", {required: true})} />
                    <p>{error && error}</p>
                    <p>{errors.password ?.message}</p>
                    <button type="submit"> Log in </button>
                    <p>Need an account? <Link to="/signup">Sign up</Link></p>
                </form>
            </Grid>
        </Grid>
    );
}

export default Landing;
