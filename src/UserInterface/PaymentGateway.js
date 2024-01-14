import React, { Component, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
 import { postData, ServerURL } from '../FetchNodeServices';
 import { css } from "@emotion/react";
 import SyncLoader from "react-spinners/SyncLoader";
 const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  margin: {
    marginRight: "80%",
    paddingLeft: "",
  },
  button: {
    margin: theme.spacing.unit,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const PaymentGateway = (props) => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  var user=useSelector(state=>state.user)
  var userData=Object.values(user)[0]
  var cart=useSelector(state=>state.cart)
  var keys = Object.keys(cart)
  var cartitems = Object.values(cart)

  var da=useSelector(state=>state.da)
  var useraddress=Object.values(da)
  

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



  const gotoRazorpay=()=>{
    return(
      
     <div style={{ display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
 
     <div style={{fontSize:30,fontWeight:'bold',color:'GrayText',padding:20}}>Redirecting to Razorpay pls wait........</div>
 
     <div className="sweet-loading">
 
 
 
   <SyncLoader color={color} loading={loading} css={override} size={25} />
   {openPayModal()}
 </div>
 </div>
    )
  }
  const handleSubmit=async(razorpay_payment_id)=>{
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    var body={cart:cartitems,amount:totalamount,date:date,transactionid:razorpay_payment_id,mobileno:useraddress[0].mobileno,emailid:userData.emailid,address:useraddress[0].addressone+useraddress[0].addresstwo,city:useraddress[0].city,state:useraddress[0].state,zipcode:useraddress[0].zipcode};
    var result=await postData('orders/saveorders',body)
    alert(result.result)
    alert(options.razorpay_payment_id)
  }
  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: totalamount*100, //  = INR 1
    name: "BestGoods.com",
    // description: 'some description',
    image:
      `${ServerURL}/images/logo.jpg`,
    handler: function (response) {
      // handleRazorpay(response.razorpay_payment_id)
      // props.addnewrecord()
      alert(response.razorpay_payment_id);
      
      alert(JSON.stringify(cartitems))
      alert(cartitems[0].productname)
      alert(JSON.stringify(useraddress))
      alert(JSON.stringify(userData))
      {handleSubmit(response.razorpay_payment_id)}
    },
   
    prefill: {
      name: userData.firstname + " " + userData.lastname,
      contact: userData.mobileno,
      email: userData.emailid
    },

    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const { classes } = props;

  return (
    <>
       {gotoRazorpay()}
    </>
  );
};

export default withStyles(styles)(PaymentGateway);
