import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Container, Grid, Button } from '@mui/material';
import Header from "./Header"
import Footer from './Footer';
import { postData, ServerURL } from '../FetchNodeServices';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartComponent from "./ShoppingCartComponent";
import { useDispatch } from 'react-redux';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const useStyles = makeStyles({
    root: {
        background: '#fff',
    }
})
export default function ProductView(props) {
    const classes = useStyles();
    var dispatch = useDispatch();
    var theme=useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [listfinalproducts, setListFinalProducts] = useState([]);
    const [qty, setqty] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [value, setValue] = React.useState(2);
  
  
    const fetchproduct = async () => {
        var body = { finalproductid: props.location.state.finalproductid }
        var result = await postData("finalproduct/displayproductbyfinalproductid", body);
        setListFinalProducts(result.data);
    }
    useEffect(function () {
        fetchproduct();
    }, [])
    const handleQtyChange = (value, item) => {
        if (value > 0) {
            item['qty'] = value
            setqty(value)
            dispatch({ type: 'ADD_ITEM', payload: [item.finalproductid, item] })
        }
        else {
            dispatch({ type: 'DELETE_ITEM', payload: [item.finalproductid, item] })
        }
        setRefresh(!refresh)
    }
    const showFinalProducts = () => {
        return listfinalproducts.map((item) => {
            return (<div className={classes.root}>
                {matches?<div >
                <Grid container spacing={1} style={{display:'flex',flexDirection:'column'}}>
                 
                 
                 <Grid item xs={5}>
                     <Container style={{  borderRadius: 10, padding: 20 }}>
                         <img src={`${ServerURL}/images/${item.picture}`} style={{ height:'80%', width: '100%', marginBottom: 0, borderRadius: 10 }} />
                     </Container>
                 </Grid>
               
                 <Grid item xs={7}>
                     <div style={{ display: 'flex', flexDirection: 'row' }}>
                         <div style={{ marginLeft: 30, marginTop: 50, fontSize: 55, fontWeight: 'bold' }}>
                             {item.subcategoryname}
                         </div>
                         <div style={{ marginLeft: 30, marginTop: 85, fontSize: 20, fontWeight: 'bold', color: 'brown' }}>
                             {item.modelname}
                         </div>
                     </div>

                     <div style={{ marginLeft: 30, marginTop: 5, fontSize: 30, fontWeight: 'bold', color: 'orangered' }}>
                         {item.description}
                     </div>
                     <div style={{ marginLeft: 30, marginTop: 5, display: 'flex', flexDirection: 'row', color: 'orange' }}>

                         <Rating
                             name="simple-controlled"
                             value={value}
                             onChange={(event, newValue) => {
                                 setValue(newValue);
                             }}
                         />
                         <Typography component="legend" style={{ color: '#000' }}>Write Review</Typography>

                     </div>
                     <div style={{ marginLeft: 30, fontSize: 40, color: '#000' }}>
                         &#8377;{item.price}<s style={{ fontSize: 20, marginLeft: 10 }}>  &#8377;{item.offerprize}</s>
                     </div>
                     <div style={{ color: '#000', marginLeft: 30, marginTop: 10 }}>Tax Included</div>
                     
                     <div style={{display:'flex',flexDirection:'row'}}>
                     <div style={{color: '#000',marginLeft: 34, margin: 15,marginTop:10,fontSize:20,fontWeight:'bold'}}>Qty:-</div>
                     <div style={{width:200,marginLeft: 33, margin: 15,marginTop:10}}>
                   
                         <FormControl fullWidth>
                             
                             <Select
                                 labelId="demo-simple-select-label"
                                 id="outlined-basic"
                                 variant="outlined"   
                                 label="Qty"
                                 size="small"
                             >
                                 <MenuItem value={10}>{item.qty}</MenuItem>
                                 
                             </Select>
                         </FormControl>
                         </div>
                         <div style={{color: '#000',marginLeft: 33, margin: 15,marginTop:10,fontSize:20,fontWeight:'bold'}}>Size:-</div>
                         <div style={{width:200,marginLeft: 33, margin: 15,marginTop:10}}>
                             
                         <FormControl fullWidth>
                            
                             <Select
                                 labelId="demo-simple-select-label"
                                 id="demo-simple-select"
                                 variant="outlined"
                                 label="Qty" 
                                 size="small"
                             >
                                 <MenuItem value={10}>{item.size}</MenuItem>
                                
                             </Select>
                         </FormControl>
                         </div>
                     </div>
                      
                     {/* <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                        
                         <div><InfoOutlinedIcon style={{ marginLeft: 5, fontSize: 20 }} /></div>
                     </div> */}
                     <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10,marginLeft:30 }}>
                         <div sx={{ padding: 8 }}>
                             <ShoppingCartComponent value={qty} onChange={(value) => handleQtyChange(value, item)} style={{ marginLeft: 70 }} />
                         </div>

                         {/* <Button  variant="contained" style={{width:'40%',marginLeft:30,background:'#000',fontWeight:'bold',fontSize:18,borderWidth:1,borderColor:'black',borderRadius:30,marginTop:20,height:50}}>
                                     Buy it Now
                      </Button> */}
                     </div>
                     <div style={{ color: '#000', marginLeft: 30, marginTop: 20, fontSize: 16, fontWeight: 'bold' }}><LocalOfferIcon style={{ marginRight: 5 }} />Offers Available </div>
                     <div style={{ display: 'flex', marginLeft: 30, flexDirection: 'row', marginTop: 10, border: '1px solid black', width: '80%', height: 40 }}>
                         <img src='mobikwik.png' style={{ margin: 5, height: 30 }} /><div style={{ margin: 7 }}>Get Up to 10% Cashback</div></div>
                 </Grid>


             </Grid>
                
                
                </div>:<>
                <Grid container spacing={1}>
                 
                 
                    <Grid item xs={5}>
                        <Container style={{  borderRadius: 10, padding: 20 }}>
                            <img src={`${ServerURL}/images/${item.picture}`} style={{ height:'50%', width: '100%', marginBottom: 0, borderRadius: 10 }} />
                        </Container>
                    </Grid>
                  
                    <Grid item xs={7}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ marginLeft: 30, marginTop: 50, fontSize: 55, fontWeight: 'bold' }}>
                                {item.subcategoryname}
                            </div>
                            <div style={{ marginLeft: 30, marginTop: 85, fontSize: 20, fontWeight: 'bold', color: 'brown' }}>
                                {item.modelname}
                            </div>
                        </div>

                        <div style={{ marginLeft: 30, marginTop: 5, fontSize: 30, fontWeight: 'bold', color: 'orangered' }}>
                            {item.description}
                        </div>
                        <div style={{ marginLeft: 30, marginTop: 5, display: 'flex', flexDirection: 'row', color: 'orange' }}>

                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <Typography component="legend" style={{ color: '#000' }}>Write Review</Typography>

                        </div>
                        <div style={{ marginLeft: 30, fontSize: 40, color: '#000' }}>
                            &#8377;{item.price}<s style={{ fontSize: 20, marginLeft: 10 }}>  &#8377;{item.offerprize}</s>
                        </div>
                        <div style={{ color: '#000', marginLeft: 30, marginTop: 10 }}>Tax Included</div>
                        
                        <div style={{display:'flex',flexDirection:'row'}}>
                        <div style={{color: '#000',marginLeft: 34, margin: 15,marginTop:10,fontSize:20,fontWeight:'bold'}}>Qty:-</div>
                        <div style={{width:200,marginLeft: 33, margin: 15,marginTop:10}}>
                      
                            <FormControl fullWidth>
                                
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="outlined-basic"
                                    variant="outlined"   
                                    label="Qty"
                                    size="small"
                                >
                                    <MenuItem value={10}>{item.qty}</MenuItem>
                                    
                                </Select>
                            </FormControl>
                            </div>
                            <div style={{color: '#000',marginLeft: 33, margin: 15,marginTop:10,fontSize:20,fontWeight:'bold'}}>Size:-</div>
                            <div style={{width:200,marginLeft: 33, margin: 15,marginTop:10}}>
                                
                            <FormControl fullWidth>
                               
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    variant="outlined"
                                    label="Qty" 
                                    size="small"
                                >
                                    <MenuItem value={10}>{item.size}</MenuItem>
                                   
                                </Select>
                            </FormControl>
                            </div>
                        </div>
                         
                        {/* <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                           
                            <div><InfoOutlinedIcon style={{ marginLeft: 5, fontSize: 20 }} /></div>
                        </div> */}
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10,marginLeft:30 }}>
                            <div sx={{ padding: 8 }}>
                                <ShoppingCartComponent value={qty} onChange={(value) => handleQtyChange(value, item)} style={{ marginLeft: 70 }} />
                            </div>

                            {/* <Button  variant="contained" style={{width:'40%',marginLeft:30,background:'#000',fontWeight:'bold',fontSize:18,borderWidth:1,borderColor:'black',borderRadius:30,marginTop:20,height:50}}>
                                        Buy it Now
                         </Button> */}
                        </div>
                        <div style={{ color: '#000', marginLeft: 30, marginTop: 20, fontSize: 16, fontWeight: 'bold' }}><LocalOfferIcon style={{ marginRight: 5 }} />Offers Available </div>
                        <div style={{ display: 'flex', marginLeft: 30, flexDirection: 'row', marginTop: 10, border: '1px solid black', width: '80%', height: 40 }}>
                            <img src='mobikwik.png' style={{ margin: 5, height: 30 }} /><div style={{ margin: 7 }}>Get Up to 10% Cashback</div></div>
                    </Grid>


                </Grid></>}
            </div>)
        })
    }

    return (
        <div className={classes.root}>
            <Header history={props.history} />


            <div>
                {showFinalProducts()}
            </div>
            <Footer />


        </div>

    );

}