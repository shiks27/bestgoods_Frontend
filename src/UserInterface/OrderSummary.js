import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Divider } from "@mui/material";
import { Grid, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BackpackIcon from '@mui/icons-material/Backpack';
import PaymentIcon from '@mui/icons-material/Payment';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import Checkbox from '@mui/material/Checkbox';
import Footers from "./Footer";
import { postData, ServerURL } from "../FetchNodeServices";
// import {postData} from "..FetchNodeServices"

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import ListItemIcon from '@mui/material/ListItemIcon';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/system';
import ListItemText from '@mui/material/ListItemText';

import { useSelector, useDispatch } from 'react-redux';
const useStyles = makeStyles({
  root: {
    padding: 20,
    background: '#ecf0f1',
  },


  divider: {
    flexGrow: 1,
    borderBottom: " 2px solid gray",
    marginBottom: 10,
    marginLeft: 5
  },
})
export default function OrderSummary(props) {
  const classes = useStyles(props);
  const [addressStatus, setAddressStatus] = useState({ status: false, data: [] })
  const [addressOne, setAddressOne] = useState(" ")
  const [addressTwo, setAddressTwo] = useState(" ")
  const [states, setStates] = useState(" ")
  const [city, setCity] = useState(" ")
  const [zipCode, setzipCode] = useState(" ")
  const [firstname, setFirstname] = useState(" ")
  const [lastname, setLastname] = useState(" ")
  const [getmobileno, setMobileno] = useState(" ")
  const [tick, settick] = useState(" ");
  var dispatch = useDispatch()
  var user = useSelector(state => state.user)
  var userData = Object.values(user)[0]
  const checkAddress = async () => {
    var result = await postData("users/checkuseraddress", { mobileno: userData.mobileno })
    //  alert(result.result)
    setAddressStatus({ status: result.result, data: result.data })
    if (!result.result) {
      setMobileno(userData.mobileno)
      setFirstname(userData.firstname)
      setLastname(userData.lastname)
    }
  }
  var cart = useSelector(state => state.cart)
  var keys = Object.keys(cart)
  var cartitems = Object.values(cart)
  var totalamount = cartitems.reduce((a, b) => getTotalAmount(a, b), 0)
  function getTotalAmount(p1, p2) {
    var price = p2.offerprize > 0 ? p2.offerprize * p2.qty : p2.price * p2.qty
    return (price + p1)
  }
  var netamount = cartitems.reduce((a, b) => getNetAmount(a, b), 0)
  function getNetAmount(p1, p2) {
    var price = p2.price * p2.qty
    return (price + p1)
  }
  var savings = cartitems.reduce((a, b) => getSavings(a, b), 0)
  function getSavings(p1, p2) {
    var price = p2.offerprize > 0 ? p2.price - p2.offerprize * p2.qty : p2.price * p2.qty
    return (price + p1)
  }


  /****************DRAWER */
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {


    setState({ ...state, [anchor]: open });
  };

  const handleAddress = async () => {
    var body = { mobileno: getmobileno, addressone: addressOne, addresstwo: addressTwo, states: states, city: city, zipcode: zipCode, firstname: firstname, lastname: lastname, usermobileno: userData.mobileno };
    var result = await postData("users/addnewaddress", body)

    alert(result.result);

    checkAddress()
  }


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
      role="presentation"
    >
      <div style={{ display: 'flex', padding: 5, justifyContent: 'center', alignItems: 'center', width: 380 }}> <img
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' } }}
        src="/logo.jpg"
        width="150"
      /></div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ display: 'flex', padding: 5, justifyContent: 'center', alignItems: 'center', width: 380 }}>
            <span style={{ fontWeight: 'bold', fontSize: 18, padding: 4 }}>{userData.firstname}</span>
            <span style={{ fontWeight: 'bold', fontSize: 18 }}>{userData.lastname}</span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ marginRight: 4, marginLeft: 4, width: 380 }}
            id="outlined"
            label="First Name"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ marginRight: 4, marginLeft: 4, width: 380 }}
            id="outlined"
            value={lastname}
            label="Last Name"
            onChange={(event) => setLastname(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ marginRight: 4, marginLeft: 4, width: 380 }}
            id="outlined"
            label="Address One"
            onChange={(event) => setAddressOne(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ marginRight: 4, marginLeft: 4, width: 380 }}
            id="outlined"
            label="Address Two"
            onChange={(event) => setAddressTwo(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ marginRight: 4, marginLeft: 4, width: 380 }}
            id="outlined"
            label="State"
            onChange={(event) => setStates(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ marginRight: 4, marginLeft: 4, width: 380 }}
            id="outlined"
            label="City"
            onChange={(event) => setCity(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ marginRight: 4, marginLeft: 4, width: 380 }}
            id="outlined"
            label="Zip Code"
            onChange={(event) => setzipCode(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ marginRight: 4, marginLeft: 4, width: 380 }}
            id="outlined"
            label="Mobile Number"
            value={getmobileno}
            onChange={(event) => setMobileno(event.target.value)}
          />
        </Grid>
      </Grid>


      <List>

      </List>

      <div style={{ display: 'flex', padding: 5, justifyContent: 'center', alignItems: 'center', width: 380 }}>
        <Button variant='contained' fullWidth style={{ background: 'black', color: '#fff', fontWeight: 'bold', fontSize: 18 }} onClick={() => handleAddress()} >Add New Address</Button>
      </div>

    </Box >
  );



  /************ */


  useEffect(function () {
    checkAddress()
  }, [])


  // const handleTick=()=>{
  //   settick({filename:"tick.png", bytes: ""})
  // }

  const handleSetAddress = (item) => {
    dispatch({ type: "ADD_DA", payload: [item.mobileno, item] })
  }
  const fetchAddress = () => {
    return addressStatus.data.map((item) => {
      return (
        <div style={{ width: 550, height: 'auto', background: '#ecf0f1', margin: 10, borderRadius: 10, marginLeft: 60 }}>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl>
                  <FormLabel style={{fontWeight:'bold',fontSize:20,color:'#000'}} id="demo-radio-buttons-group-label"> </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="Cash On Delivery" label={<div style={{ marginTop: 10, display: 'flex', flexDirection: 'column' }} onClick={() => handleSetAddress(item)}>
              <div> {item.mobileno}</div>
              <div> <b>{item.firstname}{item.lastname}</b></div>

              {item.addressone}

              <div>{item.addresstwo}</div>
              <div>{item.state}</div>
              <div>{item.city}</div>
              <div>{item.zipcode}</div>
              {/* <Button variant="contained" style={{ width: 200, height: 20, background: 'red', marginTop: 10, textDecoration: 'lowercase' }}>Default Address</Button> */}
            </div>
          } control={<Radio />}  />
                   
                  </RadioGroup>
                </FormControl>




            </div>
        </div>
      )
    })
  }
  const handleMakePayment = () => {
    props.history.push({ pathname: '/paymentgateway' })
  }
  const handleCOD=()=>{
    props.history.push({ pathname: '/paymenttype' })
  }
  const handlePayments=()=>{
    props.history.push({pathname:'/paymenttype'})
  }
  return (<div> <Header history={props.history} />
    <div className={classes.root} >

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <div style={{ fontWeight: 'bold', fontSize: 30, marginLeft: 120, marginTop: 30 }}>
            Order Summary
          </div>

          <div style={{ width: 800, height: 'auto', background: '#fff', borderRadius: 20, marginLeft: 150, marginTop: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', padding: 15 }}>Select Delivery Address</div>
            <div >
              {/* <img src="images/cart.png" style={{ width: 150, height: 140, marginLeft: 40 }} /> */}
              <Button variant='contained' style={{ background: 'black', color: '#fff', width: 600, marginLeft: 40, fontWeight: 'bold', fontSize: 18 }} onClick={toggleDrawer('right', true)} >
                <b> Change/Add Address</b>
              </Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', height: 'auto', padding: 5 }}>

              {addressStatus.status ? <>
                {fetchAddress()}
              </> : <><Button variant="contained" onClick={toggleDrawer('right', true)} style={{ background: "#000", color: "#fff", width: 220, height: 50, marginLeft: 15 }}  >
                <b> Add Address</b>
              </Button></>}

            </div>
          </div>

          <div style={{ width: 800, height: 'auto', background: 'pink', borderRadius: 10, marginLeft: 150, marginTop: 60 }}>
            <div style={{ display: 'flex', padding: 20, justifyContent: 'center', alignItems: 'center', width: 'auto' }}>
              <span style={{ fontWeight: 'bold', fontSize: 18 }}>Cart Items({keys.length})</span>
              <span style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 'auto' }}>Total &#8377;{totalamount}</span>
            </div>
            <Divider style={{ background: '#000' }} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <List>
                {cartitems.map((item, index) => (
                  <ListItem button >
                    <ListItemIcon>
                      <img src={`${ServerURL}/images/${item.picture}`} style={{ width: 80, borderRadius: 10 }} />

                    </ListItemIcon>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: 5, marginLeft: 20 }}>
                      <ListItemText primary={item.modelname} style={{ fontWeight: 'bold' }} />

                      <ListItemText primary={item.offerprize > 0 ? (
                        <div
                          style={{
                            width: 600, fontSize: 18,
                            fontWeight: '500',
                            letterSpacing: 1
                          }}>

                          <s
                            style={{
                              color: '#353b48',
                              fontSize: 14,
                              fontWeight: '500',
                              letterSpacing: 2
                            }}>
                            &#8377;{item.price}</s>{" "}
                          &#8377; {item.offerprize} x{item.qty}
                          <div
                            style={{
                              display: 'flex',
                              color: 'darkgreen',
                              fontSize: 18,
                              fontWeight: '500',
                              letterSpacing: 1
                            }}>
                            You Save &#8377;{(item.price - item.offerprize) * item.qty}
                            <span style={{ marginLeft: 'auto' }}>&#8377;{item.offerprize * item.qty}</span>
                          </div>
                        </div>) : (<>
                          <div
                            style={{
                              width: 280,
                              fontSize: 14,
                              fontWeight: '600',
                              color: '#222f3e',
                              letterSpacing: 2
                            }}>
                            &#8377;{item.price} x{item.qty}
                          </div>
                          <div
                            style={{

                              display: 'flex',
                              color: "darkgreen",
                              fontSize: 18,
                              width: '20%',
                              fontWeight: "500",
                              letterSpacing: 1,
                            }}
                          >
                            &nbsp;
                            <span style={{ marginLeft: 'auto' }}>
                              &#8377;{item.price * item.qty}
                            </span>
                          </div></>)} />
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>

          </div>

        </Grid>
        <Grid item xs={5} style={{ marginTop: 30 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, color: 'blue' }}>
              <ShoppingCartIcon /> <div style={{ marginLeft: 10, fontWeight: 'bold' }}>Your Cart</div>
            </div>
            <span className={classes.divider}></span>
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 5, color: 'blue' }}>
              <BackpackIcon /> <div style={{ marginLeft: 15, fontWeight: 'bold' }}>Order Summary</div>
            </div>
            <span className={classes.divider}></span>
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 5 }}>
              <PaymentIcon /> <div style={{ marginLeft: 15, fontWeight: 'bold' }}>Payment</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: 50, marginLeft: 20 }}>

            <WhatsAppIcon style={{ color: 'green' }} /><div style={{ marginLeft: 10, fontWeight: 'bold' }}>
              Enable order updates and important information on <br></br>Whatsapp</div>
            <Checkbox style={{ marginTop: -10, marginLeft: 20 }} />
          </div>
          <Divider style={{ marginTop: 30, marginRight: 70, width: 550 }} />
          <div style={{ width: 550, height: 'auto', background: '#fff', borderRadius: 10, marginLeft: 20, marginTop: 20 }}>
            <div style={{ display: 'flex', marginLeft: 40, flexDirection: 'column' }}>
              <div style={{ fontWeight: 'bold', margin: 10, fontSize: 30, padding: 10, textAlign: 'center' }}>Payment Details</div>
              <Divider />
              <div style={{ display: 'flex', padding: 5, justifyContent: 'center', alignItems: 'center', width: 380 }}>
                <span style={{ fontWeight: 'bold', fontSize: 18 }}>Net Amount:</span>
                <span style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 'auto', width: 'auto' }}> &#8377;{netamount}</span>
              </div>
              <div style={{ display: 'flex', padding: 5, justifyContent: 'center', alignItems: 'center', width: 380 }}>
                <span style={{ fontWeight: 'bold', fontSize: 18 }}>Savings:</span>
                <span style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 'auto' }}> &#8377;{savings}</span>
              </div>
              <div style={{ display: 'flex', padding: 5, justifyContent: 'center', alignItems: 'center', width: 380 }}>
                <span style={{ fontWeight: 'bold', fontSize: 18 }}>Delivery Charges:</span>
                <span style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 'auto' }}> &#8377;{0}</span>
              </div>
              <Divider />
              <div style={{ display: 'flex', padding: 5, justifyContent: 'center', alignItems: 'center', width: 380 }}>
                <span style={{ fontWeight: 'bold', fontSize: 18 }}>Final Amount:</span>
                <span style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 'auto' }}> &#8377;{netamount - savings}</span>
              </div>
              <div style={{marginTop:30}}>
                <FormControl>
                  <FormLabel style={{fontWeight:'bold',fontSize:20,color:'#000'}} id="demo-radio-buttons-group-label"> Payment Options</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="Cash On Delivery" onClick={()=>handlePayments()}  label="Cash on Delivery" control={<Radio />}  />
                    <FormControlLabel value="Net Banking" onClick={()=>handleCOD()} control={<Radio />}  label="Net Banking" />
                  </RadioGroup>
                </FormControl>
              </div>

            </div>

            <div style={{ display: 'flex', padding: 20, justifyContent: 'center', alignItems: 'center', width: 'auto' }}>
              <Button variant='contained' onClick={() => handleMakePayment()} fullWidth style={{ background: 'black', color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Make Payment</Button>
            </div>
          </div>
        </Grid>

      </Grid>
    </div><Footers />



    <React.Fragment key={'right'}>
      <SwipeableDrawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </React.Fragment></div>
  )
}