import React, { useState, useEffect, createRef } from "react";
import Header from "./Header";
import { makeStyles } from "@mui/styles";
import { Container, Grid, TextField, Button, Paper } from '@mui/material';
import { NavigateBefore } from "@mui/icons-material";
import ListUserprofile from "./ListUserProfile";

const useStyles = makeStyles({
    root: {
       backgroundColor:'#ecf0f1',
       display:'flex',
       justifyContent:'center',
       flexDirection:'column',
       padding:30
    },
    center:{
        display:'flex',
        justifyContent:'center', 
        alignItems:'center'
    }
  });
export default function UserProfile(props){
    const classes=useStyles();
    const [view,setView]=useState(" ");
    const setViewComponent=(v)=>{
        setView(v);
    }
    return(
        
        <div >
       <Header/>
        <div className={classes.root} >
            
        <div style={{display:'flex'}}>
             <ListUserprofile  setViewComponent={setViewComponent}/>
             <div style={{width:'35%',marginLeft:200}}>{view}</div>
        </div>
        
        
        <Grid item xs={12} style={{margin:52, fontSize:14, letterSpacing:1,}}>
                <div className={classes.center}>
                    <span>By continuing you agree to our</span>
                    <span style={{color:'red', cursor:'pointer'}}>&nbsp;Terms of service</span>
                </div>
                <div className={classes.center}>
                    <span>and</span>
                    <span style={{color:'red', cursor:'pointer'}}>&nbsp;Privacy & Legal Policy.</span>
                </div>
            </Grid>
       </div>
       </div>
    );
}