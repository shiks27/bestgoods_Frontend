import React, {useState, useEffect} from "react";
import {  Button, Grid, Paper, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { postData } from "../FetchNodeServices";
import { useSelector } from "react-redux";
const useStyles = makeStyles({
      root:{
        display:'flex',
        width:800,
        height:500,
        flexDirection:'column',
        marginLeft:100,
        marginTop:19,
        backgroundColor:'#fff',
        padding:40
      },
      text:{
        fontWeight:'bold',
        fontSize:30
      },
      grid:{
        marginTop:20,
        width:800
      },
      
})
export default function UserInformation(props){
    const classes = useStyles()
    const[firstName,setFirstName]=useState(" ");
    const[lastName,setLastName]=useState(" ");
    const[mobileno,setMobileNo]=useState(" ");
    const[emailid,setEmailId]=useState(" ");
    const [list,setList]=useState([]);
    var user=useSelector(state=>state.user);
    var userData=Object.values(user)[0];
    console.log("user--",userData)
    const fetchdata=async()=>{
        var result=await postData("users/fetchuserdata",{mobileno:userData.mobileno})
        ///alert(JSON.stringify(result))
        setList({status:result.result,data:result.data})
        setFirstName(result.data.firstname)
        setLastName(result.data.lastname)
        setEmailId(result.data.emailid)
        setMobileNo(result.data.mobileno)
        console.log("Check-----",result)
    }

    useEffect(function(){
        fetchdata()
    },[user])
   
    const userInfo=()=>{
        // return list.data.map((item,index)=>{
            return(
                <div className={classes.root}> 
                    <Grid container spacing={2}>
                        {console.log("Misssy----",list)}
                        <Grid item xs={8}>
                        <div className={classes.text}>Personal information</div>
                        <div className={classes.grid} style={{fontWeight:'bold'}}>You can Update your details here</div>
                        <div className={classes.grid}>
                            <TextField id="outlined-basic" label="Your First Name" value={firstName} variant="outlined" fullWidth></TextField>
                        </div>
                        <div className={classes.grid}>
                            <TextField id="outlined-basic" label="Your Last Name" value={lastName} variant="outlined" fullWidth ></TextField>
                        </div>
                        <div className={classes.grid}>
                            <TextField id="outlined-basic" label="Your Mobile No." value={mobileno} variant="outlined" fullWidth></TextField>
                        </div>
                        <div className={classes.grid}>
                            <TextField id="outlined-basic" label="Email ID" value={emailid} variant="outlined" fullWidth ></TextField>
                        </div>
                       <div>
                        <Button style={{backgroundColor:'#000',color:'#fff',fontWeight:'bold',marginTop:30,fontSize:20,padding:5,width:800}} fullWidth>Update</Button>
                       </div>
                        </Grid>
                    </Grid>
                    
                </div>)
        // })
    }


    return(
        <div>{userInfo()}</div>
     
       
    )}
