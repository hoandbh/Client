import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import { useNavigate } from "react-router-dom";
import axios from "axios";
import {BrowserRouter as Router, Routes, Route, Link, NavLink} from 'react-router-dom'; 
import { Replay } from '@material-ui/icons';
import Personal_area from '../../pages/Personal_area';
import Secrtery from '../../pages/secretery/secrtery';
//const navigate = useNavigate();

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


export default function ButtonAppBar() {
  const classes = useStyles();
  const navigate = useNavigate();

 
 const login=()=>{
  
  navigate("../login",{replace:false})
}
const planTrip=()=>{
 
  navigate("../planTrip",{replace:false})
}
const home=()=>{
 
  navigate("../",{replace:false})
}
const regist=()=>{
 
  navigate("../register",{replace:false})
}
const personal_area=()=>{
 
  navigate("../Personal_area",{replace:false})
}
const secrtery=()=>{
 
  navigate("../secrtery",{replace:false})
}
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={home} color="inherit">Home</Button>
          <Button onClick={planTrip} color="inherit">Planing Trip</Button>
          <Button onClick={login} color="inherit">Login</Button>
          <Button onClick={regist} color="inherit">Register</Button>
          <Button onClick={personal_area} color="inherit">Personal  area</Button>
          <Button onClick={secrtery} color="inherit">Secrtery</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}