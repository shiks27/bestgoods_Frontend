import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Divider } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grid, TextField } from "@mui/material";
const useStyles = makeStyles({
    root: {
        margin: 70,
       backgroundColor:'#ecf0f1',
       padding:30
    },
    content: {
        marginLeft: 30,
        margin: 10
        
    },
    subdiv: {
        display: 'flex',
        flexDirection: 'column',
        width:1400,
        padding:20,
       
    },
    img:{
        width:50,
        height:30,
        marginLeft:30  
    },
    image:{
        display:'flex',
        flexDirection:'row',
        padding:30
    }
})
export default function PaymentType(props) {
    const classes = useStyles();
    const [debit,setdebit]=useState(" ");
    const [netbanking,setnetbanking]=useState(" ")
    
    const handleCOD=()=>{
        props.history.push({ pathname: '/paymenttype' })
      }
    return (<div className={classes.root}>
        <div style={{fontSize:30,fontWeight:'bold',padding:20}}>Select Payment Options</div>
        <Paper className={classes.subdiv} >
            <div style={{padding:20}}>Another Payment Method</div>
            <Divider />
            <div>
           
                <FormControl>
                <RadioGroup
                 aria-labelledby="demo-radio-buttons-group-label"
                 defaultValue=""
                 name="radio-buttons-group"
                >
                    <FormControlLabel  value="debit" onClick={()=>handleCOD()} control={<Radio />} label="Add Debit/Credit/ATM Card" />
                    <div className={classes.content}>You can save your cards as per new RBI guidelines.</div>
                    <div className={classes.image}>
                        <img src="images/visa.png" className={classes.img}/>
                        <img src="images/rupay.png" className={classes.img}/>
                        <img src="images/mastercard (2).jpeg" className={classes.img}/>
                        <img src="images/maestro.jpeg" className={classes.img}/>
                        <img src="images/bluedart.jpeg" className={classes.img}/>
                        <img src="images/AmericanExpress.jpeg" className={classes.img}/>
                    </div>
                    </RadioGroup>
                </FormControl>

            </div>

            <div>
                <FormControl>
                    <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
                    <div className={classes.content}>You can save your cards as per new RBI guidelines.</div>
                </FormControl>
                <div>
                    <FormControl>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={type}
                            label="Choose Payment Option"
                            sx={{ margin: 2, width: 200 }}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl></div>
            </div>
            <div>
                <FormControl>
                    <FormControlLabel value="upi" control={<Radio />} label="Other UPI Apps" />
                    <div>
                        <div className={classes.content} style={{display:'flex',flexDirection:'column'}}>Please Enter your UPI ID
                            <TextField className={classes.content} variant="outlined"   label="Enter Your UPI PIN" /></div>
                    </div>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <FormControlLabel value="cod" control={<Radio />} label="Pay on Delivery" />
                    <div className={classes.content}>Pay digitally with SMS Pay Link. Cash may not be accepted in COVID restricted areas.</div>
                </FormControl>
            </div>
        </Paper>
    </div>)
}