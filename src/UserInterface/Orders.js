import React, { useState, useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button, Avatar, colors } from "@mui/material";
import { Save, AddBox, ClearAll, List, Edit, Fastfood } from "@mui/icons-material"
import { useState, useEffect } from "react";
import Swal from "sweetalert2"
import { getData, postData, postDataAndImage, ServerURL } from "../FetchNodeServices";
import { useDispatch, useSelector } from "react-redux"
const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center'
    },
    subdivtable: {
        //  display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        width: 1000,
        marginTop: 20,
        background: '#ecf0f1',
        padding: 20,
    },
    inputstyle: {
        display: 'none'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subdiv: {
        //  display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        width: 1000,
        marginTop: 20,
        background: '#ecf0f1',
        padding: 20,
    },
});
export default function Orders(props) {
    
    var order = useSelector(state => state.cart);
    var orderdata = Object.values(order);
    console.log(orderdata);
   
}