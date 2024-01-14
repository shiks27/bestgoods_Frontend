import React, {useState, useEffect} from "react";
import {  Button, Grid, Paper, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { postData,ServerURL } from "../FetchNodeServices";
import Header from "./Header";

import { useSelector } from "react-redux";
import Footers from "./Footer";
const useStyles = makeStyles({
    root:
    {
        background:'#ecf0f1',
    },
})

export default function ListSubCategoryfromCategory(props){
    const classes=useStyles();
    const[list,setList]=useState([]);
        const fetchSubcategory=async()=>{
            var body={categoryid:props.location.state.categoryid}
            var result=await postData("subcategory/displayallsubcategorybycategory",body);
            // alert(JSON.stringify(result))
            setList(result.data);
        }
        useEffect(function () {
            fetchSubcategory();
        }, [])
        const handleForProducts=(sid)=>{
            props.history.push({pathname:"/productlist"}, {subcategoryid:sid})
        }
        const showPersonalised=()=>{
            return list.map((item)=>{
                return(
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:10 }}>
                    <Paper elevation={5} onClick={()=>handleForProducts(item.subcategoryid)} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:350, height:250, cursor:'pointer'}}>
                        <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <img src={`${ServerURL}/images/${item.image}`} width="200" height="190"></img>
                        </Grid>
                        <Grid item xs={12} style={{ display:'flex', color:'#000', padding:15 }}>
                            <span style={{ fontSize:20, fontWeight:500, }}>{item.subcategoryname}</span>
                        </Grid>
                    </Paper>
                </div>
                )
            })
        }

        return(
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Header history={props.history} />
                </Grid>
                <Grid item xs={12} style={{display:'flex', flexDirection:'row', padding:15, justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
                    {showPersonalised()}
                </Grid>
                <Grid item xs={12}>
                    <Footers />
                </Grid>
            </div>
        )
}