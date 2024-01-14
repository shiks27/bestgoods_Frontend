import React, {useState, useEffect} from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Paper, TextField, Box, List } from "@mui/material";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import EditDrawer from '@mui/material/SwipeableDrawer';
import { useSelector } from "react-redux";
import { postData } from "../FetchNodeServices";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Call, Home, Edit, DeleteOutline } from '@mui/icons-material';
// import '../bestgoods.css'

const useStyles = makeStyles({
    rightside:{
        display:'flex',
        flexDirection:'row',
    },
    function:{
        margin:10,
        padding:15,
        width:'100%',

    },
    fnhd:{
        fontWeight:700,
        fontSize:24
    },
    blankaddress:{
        display:'flex',
        flexDirection:"column",
        padding:20,
        border:'dashed',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        cursor:'pointer',
        margin:10,
        width:500
    },
    address:{
        display:'flex',
        flexDirection:"column",
        border:'solid',
        borderColor:'#ecf0f1',
        borderWidth:1,
        margin:10,
        padding:5
    }
})

export default function Addresses() {
    const classes = useStyles()
    var user = useSelector(state=>state.user)
    var userData = Object.values(user)[0]
    const [state, setState] = React.useState({bottom: false})
    const [editDrawer, setEditDrawer] = React.useState({bottom: false})
    const [addressId, setAddressId] = useState('')
    const [addressStatus, setAddressStatus] = useState({status:false, data:[]})
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [getMobileNo, setMobileNo] = useState('')
    const [emailId, setEmailId] = useState('')
    const [addressOne, setAddressOne] = useState('')
    const [addressTwo, setAddressTwo] = useState('')
    const [states, setStates] = useState('')
    const [city, setCity] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [view, setView] = React.useState("");

    const checkAddress=async()=>{
        var result=await postData("users/checkuseraddress",{mobileno:userData.mobileno})
        setAddressStatus({status:result.result,data:result.data})
        if(!result.result)
        {
          setMobileNo(userData.mobileno)
          setFirstName(userData.firstname)
          setLastName(userData.lastname)
          setEmailId(userData.emailId)
        }
    }
    useEffect(function(){
        checkAddress()
    },[])
    console.log(addressStatus)

    const fetchAddress = () => {
        return addressStatus.data.map((item,index)=>{
            return( index < 4 ?
                <Grid item xs={5}>
                    <div className={classes.address}>
                        <div className={classes.rightside}>
                            <AccountCircle  style={{fontSize:18, margin:5}}/>
                            <div style={{margin:4, fontSize:14}}>{item.firstname} {item.lastname}</div>
                        </div>
                        <div className={classes.rightside}>
                            <Call style={{fontSize:18, margin:5}}/>
                            <div style={{margin:4, fontSize:13}}>{item.mobileno}</div>
                        </div>
                        <div className={classes.rightside}>
                            <Home style={{fontSize:18, margin:5}}/>
                            <div style={{display:'flex', flexDirection:'column', margin:4}}>
                                <div style={{ fontSize:13 }}>{item.addressone}, {item.addresstwo}</div>
                                <div style={{ fontSize:13 }}>{item.city}-{item.zipcode}, {item.state}</div>
                            </div>
                        </div>
                        <div className={classes.rightside}>
                            <Button onClick={ editToggleDrawer('bottom', true)} variant="contained" style={{margin:5, background:'#000', fontSize:13}} startIcon={<Edit />} fullWidth>Edit</Button>
                            <Button onClick={handleDeleteAddress} variant="outlined" style={{margin:5, color:'#000', borderColor:'#000'}} startIcon={<DeleteOutline />} fullWidth>Delete</Button>
                        </div>
                    </div>
                </Grid>
            : <></> )
        })
    }
    const handleDeleteAddress=async()=>{
        var result = await postData('users/deleteaddress', {addressid:addressId})
        alert(result)
    }
    const toggleDrawer = (anchor, open) => (event) => {
        setState({ ...state, [anchor]: open });
    };

    const editToggleDrawer = (anchor, open, rowData) => (event) => {
        setEditDrawer({ ...editDrawer, [anchor]: open , rowData});
        setFirstName(rowData.firstname);
        setLastName(rowData.lastname);
    };
    const handleAddress=async()=>{
        var body={mobileno:getMobileNo, addressone:addressOne, addresstwo:addressTwo, state:states, city:city, zipcode:zipcode, firstname:firstName, lastname:lastName, usermobileno:userData.mobileno}
        var result=await postData("users/addnewaddress", body)
        alert(result)
        toggleDrawer('bottom',false)
        checkAddress()
    }
    const handleEditAddress=async()=>{
        var body={mobileno:getMobileNo, addressone:addressOne, addresstwo:addressTwo, state:states, city:city, zipcode:zipcode, firstname:firstName, lastname:lastName}
        var result = await postData('users/editaddress', body)
        alert(result)
    }
    
    const bottomList = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
          role="presentation"
        >
          <List>
            <div className={classes.rightside}>
                <Grid item xs={4} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <img src="/logo.jpg" width="30%" style={{margin:5}}></img>
                    <img src="/delivery 2.jpg" width="65%" style={{margin:5}}></img>
                </Grid>
                <Grid item xs={7} style={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <div className={classes.rightside}>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={firstName} onChange={(event)=>setFirstName(event.target.value)} fullWidth variant="outlined" label="First Name" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={lastName} onChange={(event)=>setLastName(event.target.value)} fullWidth variant="outlined" label="Last Name" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                    </div>
                    <div className={classes.rightside}>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={getMobileNo} onChange={(event)=>setMobileNo(event.target.value)} fullWidth variant="outlined" label="Mobile No" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" onChange={(event)=>setZipcode(event.target.value)} fullWidth variant="outlined" label="Zipcode" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                    </div>
                    <div className={classes.rightside}>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" onChange={(event)=>setStates(event.target.value)} fullWidth variant="outlined" label="State" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" onChange={(event)=>setCity(event.target.value)} fullWidth variant="outlined" label="City" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                    </div>
                    <div className={classes.rightside}>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" onChange={(event)=>setAddressOne(event.target.value)} fullWidth variant="outlined" label="Address 1" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" onChange={(event)=>setAddressTwo(event.target.value)} fullWidth variant="outlined" label="Address 2" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                    </div>
                    <div className={classes.rightside}>
                        <Grid item xs={12} style={{margin:7}}>
                            <Button onClick={handleAddress} variant="outlined" fullWidth style={{color:'#000', borderColor:'#000', fontSize:14}}>Add Address</Button>
                        </Grid>
                    </div>
                </Grid>
            </div>
          </List>
        </Box>
    );
    
    const editBottomList = (anchor, rowData) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
          role="presentation"
        >
          <List>
            <div className={classes.rightside}>
                <Grid item xs={4} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <img src="/logo.jpg" width="30%" style={{margin:5}}></img>
                    <img src="/delivery 2.jpg" width="65%" style={{margin:5}}></img>
                </Grid>
                <Grid item xs={7} style={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <div className={classes.rightside}>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={firstName} onChange={(event)=>setFirstName(event.target.value)} fullWidth variant="outlined" label="First Name" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={lastName} onChange={(event)=>setLastName(event.target.value)} fullWidth variant="outlined" label="Last Name" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                    </div>
                    <div className={classes.rightside}>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={getMobileNo} onChange={(event)=>setMobileNo(event.target.value)} fullWidth variant="outlined" label="Mobile No" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={zipcode} onChange={(event)=>setZipcode(event.target.value)} fullWidth variant="outlined" label="Zipcode" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                    </div>
                    <div className={classes.rightside}>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={states} onChange={(event)=>setStates(event.target.value)} fullWidth variant="outlined" label="State" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={city} onChange={(event)=>setCity(event.target.value)} fullWidth variant="outlined" label="City" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                    </div>
                    <div className={classes.rightside}>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={addressOne} onChange={(event)=>setAddressOne(event.target.value)} fullWidth variant="outlined" label="Address 1" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={addressTwo} onChange={(event)=>setAddressTwo(event.target.value)} fullWidth variant="outlined" label="Address 2" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                    </div>
                    <div className={classes.rightside}>
                        <Grid item xs={12} style={{margin:7}}>
                            <Button onClick={handleEditAddress} variant="outlined" fullWidth style={{color:'#000', borderColor:'#000', fontSize:14}}>Edit Address</Button>
                        </Grid>
                    </div>
                </Grid>
            </div>
          </List>
        </Box>
    );

    return(
        <Grid item xs={12}>
            <Paper className={classes.function}>
                <Grid item xs={6} style={{margin:12}}>
                    <div className={classes.fnhd}>Your Address</div>
                </Grid>
                <Grid item xs={12} style={{display:'flex', flexWrap:'wrap'}}>
                {addressStatus.status ? 
                    <>{fetchAddress()}</>
                : <></>}
                <Grid item xs={4}>
                    <div className={classes.blankaddress} onClick={toggleDrawer('bottom', true)}>
                        <img src="/plussign.png" width="100"></img>
                        <div style={{margin:20, fontSize:25, fontWeight:700}}>Add Address</div>
                    </div>
                </Grid>
                </Grid>
            </Paper>
            <div>
                <React.Fragment key={'bottom'}>
                    <SwipeableDrawer
                        anchor={'bottom'}
                        open={state['bottom']}
                        onClose={toggleDrawer('bottom', false)}
                        onOpen={toggleDrawer('bottom', true)}
                    >
                        {bottomList('bottom')}
                    </SwipeableDrawer>
                </React.Fragment>
            </div>
            <div>
                <React.Fragment key={'bottom'}>
                    <EditDrawer
                        anchor={'bottom'}
                        open={editDrawer['bottom']}
                        onClose={editToggleDrawer('bottom', false)}
                        onOpen={editToggleDrawer('bottom', true)}
                    >
                        {editBottomList('bottom')}
                    </EditDrawer>
                </React.Fragment>
            </div>
        </Grid>
    )
}