import React, { useState, useEffect,createRef } from "react";
import Header from "./Header";
import { makeStyles } from "@mui/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getData, postData, ServerURL } from "../FetchNodeServices"
import { Paper } from "@mui/material";
import Footer from "./Footer";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {ArrowBackIos,ArrowForwardIos, Transform, Translate} from '@mui/icons-material';
import '../style.css'
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

export default function Home(props) {
    const classes = useStyles(props);
    var theme=useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  var csettings = {
    dots: false,
    arrows:false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    slidesToShow: matches?3:6,
    slidesToScroll: 1,
    autoplayspeed: 3000
};
    var cSlider=createRef();
    const [listBanner, setlistBanner] = useState([])
    const [categoryList, setCategoryList] = useState([]);
    const [ListsubCategory, setListsubCategory] = useState([])
    const [trendingList,setTrendingList]=useState([])
    const fetchAllBanners = async () => {
        var result = await getData("banner/displayallbanners ")
        setlistBanner(result.data)
    }
    const fetchAllTrending = async () => {
        var result = await getData("finalproduct/displayfinalproducttrending ")
        setTrendingList(result.data)
    }
    const fetchAllCategory = async () => {
        var result = await getData("category/displayallcategory");
        setCategoryList(result.data)
    //    alert(JSON.stringify(result))
    }
    const fetchAllSubCategory = async () => {
        var result = await getData("subcategory/displayallsubcategory");
        setListsubCategory(result.data)
    }
    const showSlider = () => {
        return listBanner.map((item) => {
            return <div><img src={`${ServerURL}/images/${item.image}`} width="100%" /></div>
        })
    }
    const handleforSubCategory=(cid)=>{
       props.history.push({pathname:'/listsubcategoryfromcategory'},{categoryid:cid})
    }
    const handleForProducts=(sid)=>{
        props.history.push({pathname:'/productlist',},{subcategoryid:sid})
    }
    const showCategories = () => {
        return categoryList.map((item) => {
            return (<div  style={{ display: 'flex',width:'80%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: '50%', background: '#fff', margin: 10,height:170 }}>
                <img src={`${ServerURL}/images/${item.icon}`} style={{ width: '80%',height:150, borderRadius: '50%' }} /></div>
                <div onClick={()=>handleforSubCategory(item.categoryid)} style={{cursor:'pointer',textAlign:'center', fontSize: '18', fontWeight: 'bold' }}>{item.categoryname}</div>
            </div>)
        })
    }
    const showSubCategories = () => {
        return ListsubCategory.map((item) => {
            return (<Paper  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 450, height: 450 , background: '#fff',margin:10,padding:5}} elevation={2}>
                <div style={{ fontSize: 28, fontWeight: 'bold',padding:10 }}>{item.subcategoryname}</div>
                <div style={{ fontSize: 20, fontWeight: '600',color:'#222f3e',letterSpacing:2}}>{item.subcategorydesc}</div>
                <div onClick={()=>handleForProducts(item.subcategoryid)}  style={{cursor:'pointer', fontSize: 12, fontWeight: 'bold', color: 'red' }}>{"View All >"}</div>
                <div style={{ padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img class="glassBox__imgBox" src={`${ServerURL}/images/${item.image}`} style={{ width: 300, height: 300 }} />
                    
                </div>
               
            </Paper>)
        })
    }
    const showTrending = () => {
        return trendingList.map((item) => {
            return (<Paper style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 350, height: 350 , background: '#fff',margin:10,padding:5}} elevation={2}>
               
                <div style={{ padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={`${ServerURL}/images/${item.picture}`} style={{ width: 200, height: 200 }} />
                    
                </div>
                <div style={{ fontSize: 24, fontWeight: '400',padding:10 }}>{item.productname}</div>
               { item.offerprize>0?<div style={{ fontSize:28,fontWeight:'500',letterSpacing:2}}>&#8377;{item.offerprize}<s style={{color:'#353b48', fontSize: 18, fontWeight: '500',letterSpacing:2}}>&#8377;{item.price}</s></div>:<div style={{fontSize:14,fontWeight: '600',color:'#222f3e',letterSpacing:2}}>&#8377;{item.offerprize}</div>}
            </Paper>)
        })
    }
    useEffect(function () {
        fetchAllBanners()
        fetchAllCategory()
        fetchAllSubCategory()
        fetchAllTrending()
    }, [])
    const handleBack=()=>{
        cSlider.current.slickPrev()
       
    }
    const handleForward=()=>{
        cSlider.current.slickNext()
    }
    return (<div className={classes.root}>

        <Header history={props.history} />
        <div>
            <Slider {...settings}>
                {showSlider()}
            </Slider>
            <div style={{display:'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'row' }}>
                <ArrowBackIos onClick={()=>handleBack()}/>
            <div style={{width:'80%',padding:20}}>
            <Slider ref={cSlider} {...csettings}>
                {showCategories()}
            </Slider>
            </div>
            <ArrowForwardIos onClick={()=>handleForward()}/>
            </div>
           
            <div class="about" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 20, borderRadius: '50%', flexWrap: 'wrap' }}>
                {showSubCategories()}
            </div>
            <div style={{fontSize:40,fontWeight:'bold',letterSpacing:1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 30, borderRadius: '50%', flexWrap: 'wrap' }}>
            Trending Products
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: '10', borderRadius: '50%', flexWrap: 'wrap' }}>
                {showTrending()}
            </div>
            <div style={{justifyContent:'center',display:'flex',alignItems:'center',background:'#000',color:'#fff',padding:"8px 18px",display:"inline-block",margin:"4px 2px",cursor:"pointer",borderRadius:"18px",fontWeight:600,marginLeft:800}}>
                {"View All >"}
            </div>
            <div style={{marginTop:'60px'}}>  <Footer /></div>
        
        </div>
    </div>
    )
}
