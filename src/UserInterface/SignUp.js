import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Container, Grid, TextField, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Header from "./Header"
import { Divider } from '@mui/material';
import Footer from './Footer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';

import InputLabel from '@mui/material/InputLabel';
import { postData } from '../FetchNodeServices';
const useStyles = makeStyles({
    
    root: {
        background: '#ecf0f1',
    }
})


export default function SignUp(props) {
    const classes = useStyles();
  
    const[firstname,setfirstname]=useState(" ");
    const[lastname,setlastname]=useState(" ");
    const[mobileno,setMobileno]=useState('+91'+props.history.location.state.mobileno);
    const[emailid,setemailid]=useState(" ");
    const[password,setpassword]=useState(" ");
    const[cpassword,setcpassword]=useState(" ");
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
      const [cvalues, setcValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
      const handleConfirmChange = (prop) => (event) => {
        setcValues({ ...cvalues, [prop]: event.target.value });
      };
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
      const handleClickShowcPassword = () => {
        setcValues({
          ...cvalues,
          showcPassword: !cvalues.showcPassword,
        });
      };
    
      const handleMouseDowncPassword = (event) => {
        event.preventDefault();
      };
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const handleSubmit=async()=>{
          if(cvalues.password===values.password){
          var body={emailid:emailid,mobileno:mobileno,firstname:firstname,lastname:lastname,password:values.password}
          var result=await postData("users/insertuser",body)
          }
          else{
              alert("Password Not Matched");
          }
      }
    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <Grid container spacing={1} >
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    <Grid item xs={7} >
                        <Container style={{ height: 600, borderRadius: 10 }}>
                            <img src='/banners2.jpg' style={{ width: 980, height: 580, borderRadius: 10 }} />
                        </Container>

                    </Grid>
                    <Grid item xs={5}>
                        <Container style={{ height: 300 }}>
                            <div style={{ height: 580, background: '#fff', border: '1px solid grey', width: '100%', borderRadius: 10, display: 'flex', flexDirection: 'column' }}>
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                                        <div style={{ fontSize: 30, fontWeight: 'bold', margin: 20 }}>Sign Up
                                            <div style={{ fontSize: 14, fontWeight: 'bold' }}>Please enter your details.</div>
                                        </div>
                                        <div style={{ marginLeft: 250 }} ><PersonAddIcon style={{ margin: 20, width: 50, height: 50 }} />
                                        </div>

                                    </div>
                                    <Divider />
                                    <Grid item spacing={2} style={{ display: 'flex', flexDirection: 'row', margin: 20 }}>
                                        <Grid item xs={6}>
                                            <TextField id="outlined-basic" label="Enter your First Name" size="small" onChange={(event)=>setfirstname(event.target.value)}  variant="outlined" style={{ width: 250 }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField id="outlined-basic" label="Enter your Last Name" size="small"  onChange={(event)=>setlastname(event.target.value)}  variant="outlined" style={{ width: 250 }} />
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12} style={{ display: 'flex', margin: 20 }}>
                                        <TextField id="outlined-basic" label="Enter your Email id"  onChange={(event)=>setemailid(event.target.value)}  size="small"  variant="outlined" style={{ width: 560 }} />
                                    </Grid>
                                    <Grid item spacing={2} style={{ display: 'flex', flexDirection: 'row', margin: 20 }}>
                                    <Grid item xs={6}>
                                    <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handleChange('password')}
                                                size="small" 
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton 
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl sx={{ m: 1, width: '28ch' }} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={cvalues.showcPassword ? 'text' : 'password'}
                                                value={cvalues.cpassword}
                                                onChange={handleConfirmChange('password')}
                                                size="small" 
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowcPassword}
                                                            onMouseDown={handleMouseDowncPassword}
                                                            edge="end"
                                                        >
                                                            {cvalues.showcPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                    </Grid>
                                    </Grid>


                                    <div style={{marginTop:5,marginLeft:20,fontSize:12}}>Use 8 more characters with a mix of letters & numbers</div>
                                    <div style={{ fontSize: 25, fontWeight: 'bold', marginTop:5,marginLeft:20}}>Verify</div>
                                <div style={{display:'flex',flexDirection:'row'}}>
                                <div style={{marginTop:5,marginLeft:20,fontSize:12}}>We have sent you a 4 digit OTP on<b>+91-{mobileno}</b></div>
                                <div style={{marginLeft:300,fontSize:12,color:'red'}}>Change</div>
                                </div>
                               
                                <Grid item xs={12}>
                                            <TextField id="outlined-basic" label="Enter your OTP" variant="outlined" size="small" style={{width:580, margin:20}} />
                                 </Grid>
                                 <div style={{ marginLeft: 580,marginTop:-10,color:'red',fontSize: 10 }} >Resend OTP</div>
                                 <Button onClick={handleSubmit} style={{width:580,background:'#000',color:'#fff',fontWeight:'bold',marginTop:5,marginLeft:20}}>Verify</Button>
                                 <div style={{ marginLeft: 20, color: 'grey',fontSize:12,padding:30,textAlign:'center' }}>By continuing you agree to our<span style={{color:'red'}}> Terms of service </span>and<div style={{color:'red',textAlign:'center'}}> Privacy & Legal Policy.</div></div>
                            </div>
                            </div>
                        </Container>
                    </Grid>
                </Grid>
            </Grid>
            <Footer/>
        </div>
    )

}