import React from 'react'
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from "react-router";

export default function Signup({ setLogged }) {

    const history = useHistory();

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
    }));


    const classes = useStyles();
    const { signup } = useAuth();
    console.log(signup);
    const validationSchema = yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
        confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords do not match')
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });

    const sign = async () => {

            const g = () => {
                return new Promise(resolve => {
                    signup(document.getElementById("username").value, document.getElementById("password").value);
                    console.log("REGISTRATO");
                    resolve();
                })
            }

            g()
            .then(() => {
                setLogged(true);
                sessionStorage.setItem("logged", true);
                history.push("/home")
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <Grid style={{ padding: 50}} container>
            <Grid item xs={12} sm={12}>
                <h1>MariBnB</h1>
                <h3>Enter your username and password</h3>
            </Grid>
            <Grid item xs={12} sm={12}>
                <form className={classes.root} onSubmit={handleSubmit(sign)} action="/Landing" method="POST">
                    <TextField type="text" id="username" label="Username" {...register("username", {required: true})}/>
                    <p>{errors.username ?.message}</p>
                    <TextField type="password" id="password" label="Password" variant="filled" {...register("password", {required: true})} />
                    <p>{errors.password ?.message}</p>
                    <TextField type="password" id="confirmPassword" label="Confirm Password" variant="filled" {...register("confirmPassword", {required: true})} />
                    <p>{errors.confirmPassword ?.message}</p>

                    <button type="submit"> Sign up </button>
                    <p>Already have an account? <Link to="/home">Sign in</Link></p>
                </form>
            </Grid>
        </Grid>
        </div>
    )
}
