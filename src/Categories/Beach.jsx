import React from "react";
import { Grid } from "@material-ui/core";
import Destination from "../components/Destination";
// import Header from "./components/Header";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react"
import { useHistory } from "react-router";

const Beach = () => {

    const [array, setArray] = useState([]);
    const history = useHistory();
    useEffect(async() => {
        setArray(await axios.get("http://localhost:8080/Apartments").then(res => res.data))
        console.log(array.data);
        }, [])
    
    return(
        <Grid container style={{ padding: 100}} container spacing={2}>
            {
                array &&
                array.map((x) => {
                    return(
                        <Grid item xs={12} sm={4} onClick={()=>{history.push(`/home/Beach/${x.name}`)}}>
                            {
                                x.category === "Beach" &&
                                <Destination
                                src={x.image}
                                title={x.name}
                                description={x.description}
                                />
                            }
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default Beach;