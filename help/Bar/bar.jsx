import React from "react";
import { makeStyles } from "@mui/material";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";




const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


  const ButtonAppBar = () =>{
    const classes = useStyles();
    const navigate = useNavigate();

    const login = () =>{
        navigate()
    }

  }



export default ButtonAppBar;