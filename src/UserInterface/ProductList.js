import React, { useState, useEffect } from "react";
import Header from "./Header";
import { makeStyles } from "@mui/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getData, postData, ServerURL } from "../FetchNodeServices"
import { Paper } from "@mui/material";
import ShoppingCartComponent from "./ShoppingCartComponent";
import { useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import Footer from './Footer';




const useStyles = makeStyles({
    root: {

        background: '#ecf0f1',
    },
})
var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplayspeed: 3000
};
export default function ProductList(props) {
    const classes = useStyles();
    var dispatch = useDispatch()
    const [listProducts, setlistProducts] = useState([])
    const [qty, setqty] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [listSubcategorybanner, setListsubCategorybanner] = useState([]);

   
    const fetchAllSubcategorybyid = async () => {
        var body = { subcategoryid: props.location.state.subcategoryid }
       // alert(props.location.state.subcategoryid)
        var result = await postData("Subbanner/displayallbannerbyid", body)
        setListsubCategorybanner(result.data)
    }

    const fetchAllProductList = async () => {
        var body = { subcategoryid: props.location.state.subcategoryid }
        var result = await postData("finalproduct/displayfinalproductbysubcategoryid ", body)
        setlistProducts(result.data)
        // alert(JSON.stringify(props.location.state.subcategoryid))
    }
    const fetchProductListByPrice = async (min,max) => {
        var body = {min:min,max:max ,subcategoryid: props.location.state.subcategoryid}
        var result = await postData("finalproduct/displayfinalproductbyprice", body)
        setlistProducts(result.data)
    }
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
    const handlepClick=(pid)=>{
        props.history.push({ pathname: '/ProductView' }, { finalproductid: pid })
    }
    const showProducts = () => {
        return listProducts.map((item) => {
            return (<Paper style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 350, height: 370, background: '#fff', margin: 10, padding: 5 }} elevation={2}>
                <div style={{ textAlign: 'center', fontSize: 18, fontWeight: '600', padding: 5, letterSpacing: 2 }}>
                    {item.companyname}{item.productname}</div>
                <div style={{ padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={`${ServerURL}/images/${item.picture}`} style={{cursor:'pointer', width: 200, height: 170 }} onClick={()=>handlepClick(item.finalproductid)}  />
                </div>
                <div style={{ textAlign: 'center', fontSize: 18, fontWeight: '400', padding: 10, letterSpacing: 2 }}>
                    <div> {item.modelname}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    {item.offerprize > 0 ? <div style={{ fontSize: 18, fontWeight: '500', letterSpacing: 1 }}>&#8377;{item.offerprize}<s style={{ color: '#353b48', fontSize: 14, fontWeight: '500', letterSpacing: 2 }}>&#8377;{item.price}</s> <div style={{ color: 'darkgreen', fontSize: 18, fontWeight: '500', letterSpacing: 1 }}>You Save &#8377;{item.price - item.offerprize}</div></div> :
                        <div style={{ fontSize: 14, fontWeight: '600', color: '#222f3e', letterSpacing: 2 }}>&#8377;{item.offerprize}</div>}
                </div>
                <div sx={{ padding: 8 }}>
                    <ShoppingCartComponent value={qty} onChange={(value) => handleQtyChange(value, item)} />
                </div>

            </Paper>)
        })
    }
    const showSlider = () => {
        return listSubcategorybanner.map((item) => {
            return <div style={{ width: '100%', height: '600px' }}><img src={`${ServerURL}/images/${item.image}`} style={{width:'100%'}} /></div>
        })
    }
    useEffect(function () {
        fetchAllProductList()
        fetchAllSubcategorybyid()
    }, [])
    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <Slider {...settings} >
                {showSlider()}
            </Slider>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 70 }}>
                <div style={{ padding: 5 }}>
                    <Sidebar fetchProductListByPrice={fetchProductListByPrice} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 6, borderRadius: '50%', flexWrap: 'wrap' }}>
                    {showProducts()}
                </div>
            </div>
            <Footer />
        </div>
    );
}