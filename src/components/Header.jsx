import React from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    typographyStyles: {
        flex: 1
    }
});

function Header () {
    const classes = useStyles();
    return (
        <AppBar position="fixed" >
            <ToolBar>
                <Typography className={classes.typographyStyles}>
                    <Link style={{color: "white", textDecoration: "none"}} to="/home">MariBnb</Link>
                </Typography>
                <Link><AccountCircleIcon style={{ color: "white" }}/></Link>
            </ToolBar>
        </AppBar>
    );
}

export default Header;