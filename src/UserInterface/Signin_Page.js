import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Container, Grid, TextField,Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment } from '@mui/material';
import Header from "./Header"
import Footer from './Footer';
import { postData } from '../FetchNodeServices';
import { useDispatch  } from 'react-redux';

const useStyles = makeStyles({
    root: {
        background: '#ecf0f1',
    }
})

export default function SignIn(props) {
    const classes = useStyles();
    var dispatch=useDispatch()
    const [userData,setUserData]=useState([]);
    const [mobileno,setMobileno]=useState("");
    const [visible,setVisible]=useState(false);
    const [generatedOtp,setgeneratedOtp]=useState(" ");
    const [inputOtp,setinputOtp]=useState(" ");
    const otpGenerator=()=>{
        var v=['1','2','3','4','5','6','7','8','9']
        var otp=""
        for(var i=1;i<=4;i++){
          otp+=v[parseInt((Math.random()*9))]
        }
        return otp
       }
   const callOtpServer=async(msg,otp)=>{
    var result=await postData("smsapi/sendotp",{mobileno:mobileno,otp:otp})
   }
   const  handleCheckUser=async()=>{
        var result=await postData("users/checkuserbymobilenumber",{mobileno:"+91"+mobileno})
        if(result.result){
          setVisible(true)
          var otp=otpGenerator()
          alert(otp)
          setgeneratedOtp(otp)
          setUserData(result.data)
          callOtpServer(mobileno,otp)
        }
        else{
          props.history.push({pathname:"/signup"},{mobileno:mobileno})
          var otp=otpGenerator()
          setgeneratedOtp(otp)
          callOtpServer(mobileno,otp)
        }
   }
   const handleCheckOtp=()=>{
       if(generatedOtp==inputOtp){
          dispatch({type:"ADD_USER",payload:[mobileno,userData]})
          props.history.push({pathname:'/ordersummary'})
       }
       else{
           alert("Incorrect")
       }
   }
    return (
        <div className={classes.root}>
             <Header history={props.history} />
            <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' ,padding:30, borderRadius: 10 }}>
                <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' ,padding:30, borderRadius: 10 }}>
                    <Grid item xs={8} >
                        <Container style={{ height: 'auto', background: '#fff', borderRadius: 10 ,padding:20 }}>
                            <img src="/banners.jpeg" style={{ height: 'auto', width: '100%', marginBottom: 0, borderRadius: 10 }} />
                        </Container>
                    </Grid>
                    <Grid item xs={4} >
                        <Container style={{ height: 'auto', background: '#fff' , borderRadius: 10 ,padding:20}}>
                            <div style={{ height: 'auto', background: '#fff', border: '1px solid grey', width: '100%', borderRadius: 10, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div  ><AccountCircleIcon style={{ margin: 10, width: 50, height: 50 }} /></div>
                                </div>
                                <div style={{}}>
                                    <div style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 20 }}>Sign in</div>
                                    <div style={{ marginLeft: 20, color: 'grey' }}>Sign in to access your Orders, Offers and Wishlist.</div>
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Enter your mobile no."
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    +91 |
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment  position="end">
                                                   <span onClick={()=>setMobileno('')} style={{cursor:"pointer",fontSize:12,color:'red'}}>Change </span> 
                                                </InputAdornment>
                                            ),
                                        }}
                                        value={mobileno}
                                        variant="outlined"
                                        style={{ margin:20, width: '90%'}}
                                       onChange={(event)=>setMobileno(event.target.value)}
                                    />
                                    <Button onClick={handleCheckUser}  variant="contained" endIcon={<SendIcon />} style={{width:'90%',marginLeft:20,background:'#000'}}>
                                        Send
                                    </Button>
                                 
                                   
                             
                                <div>
                                    <Grid >
                                        {visible?<>
                                      <Grid item xs={12}>
                                            <TextField id="outlined-basic" onChange={(event)=>setinputOtp(event.target.value)} label="Enter OTP" size="small"   variant="outlined" style={{ width: '90%',margin:20 }} />
                                        </Grid>
                                        <div style={{ marginLeft:400,color:'red',fontSize: 10 }} >Resend OTP</div>
                                      <Button  onClick={()=>handleCheckOtp()} variant="contained" style={{width:'90%',margin:10,marginLeft:20,background:'#000'}}>
                                           Verify
                                    </Button>
                           
                                    
                                    </>:<></>}
                                    </Grid>
                                    <div style={{ margin: 15, color: 'grey',fontSize:12,textAlign:'center' }}>
                                        By continuing you agree to our<span style={{color:'red'}}>
                                             Terms of service </span>and
                                    <div style={{color:'red',textAlign:'center'}}> Privacy & Legal Policy.</div></div>
                                
                                </div>
                                </div>
                            </div>
                        </Container>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )

}