import React from "react";
import { Grid } from "@material-ui/core";
import Destination from "./Destination";
import imgSrc0 from "./static/nyc.jpg";
import imgSrc1 from "./static/serra.jpg";
import imgSrc2 from "./static/spiaggia.jpg";
import { Redirect, useHistory } from "react-router-dom";


function Content() {
    const history = useHistory();
    return (
        <Grid style={{ padding: 100}} container spacing={2}>
            <Grid item xs={12} sm={12}>
                <h1 className="Title">Cosa ti piace?</h1>
            </Grid>
            <Grid item xs={12} sm={4} onClick={() => {history.push("/home/Metropolis")}}>
                <Destination 
                src={imgSrc0}
                title="Metropoli"
                description="Giungla di cemento?"
                />
            </Grid>
            <Grid item xs={12} sm={4} onClick={() => {history.push("/home/Relax")}}>
                <Destination 
                src={imgSrc1}
                title="Tranquillità"
                description="Giungla?"
                />
            </Grid>
            <Grid item xs={12} sm={4} onClick={() => {history.push("/home/Beach")}}>
                <Destination 
                src={imgSrc2}
                title="Mare"
                description="Fregna?"
                />
            </Grid>
        </Grid>
    );
}

export default Content;