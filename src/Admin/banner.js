import * as React from 'react';
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button, Avatar, getDrawerUtilityClass } from "@mui/material";
import { Save, ClearAll, List, Add } from "@mui/icons-material"
import { useState, useEffect } from "react";
import Swal from "sweetalert2"
import { getData, postDataAndImage, postData, ServerURL, postDataAndImagewithid } from "../FetchNodeServices";
import DisplayallBanner from './DisplayallBanner';

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

export default function Banner(props) {
    const classes = useStyles(props);
    const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" });
    const [description, setdescription] = useState(" ")
    const [priority, setpriority] = useState(" ")

    const handlepicture = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }
    const handleClick =()=>{
        props.setComponent(<DisplayallBanner setComponent={props.setComponent}/>)
      }
    
    const handleSubmit=async()=>{
         var formData=new FormData();
         formData.append('description',description);
         formData.append('priority',priority);
         formData.append('image', picture.bytes);

         var result=await postDataAndImage('banner/bannersubmit',formData,{ headers: { "content-type": "multipart/formData" } })
         if(result){
            Swal.fire({
                text: 'Banner Added Successfully',
                imageUrl: '/logo.jpg',
                imageAlt: 'Custom image',
                icon: 'success'
            })
         }
         else {
            Swal.fire({
                title: 'Banner Interface',
                text: 'Failed to add Banner',
                imageUrl: '/logo.jpg',
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }
    }
    return (
    <div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ fontSize: 18, letterSpacing: 1, fontWeight: 800 }}>
                        Final Products
                    </div>
                </Grid>
                <Grid item xs={12}>
                            <div>
                                <Button startIcon={<List/>} onClick={() => handleClick()} variant="contained"> List of Banners</Button>
                            </div>
                        </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth onChange={(event) => setdescription(event.target.value)} variant="outlined" label="Description" />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth onChange={(event) => setpriority(event.target.value)} variant="outlined" label="Priority" />
                </Grid>
                <Grid item xs={6} >
                    <label htmlFor="contained-button-file">
                        <input onChange={(event) => handlepicture(event)} accept="image/*" className={classes.inputstyle} id="contained-button-file" multiple type="file" />
                        <Button fullWidth variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <Avatar alt="picture" variant="rounded" src={picture.filename} />
                </Grid>
                <Grid item xs={4}>
                    <Button fullWidth variant="contained" onClick={(event) => handleSubmit(event)} startIcon={<Save />}>Save</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                </Grid>
            </Grid>
        </div>
    </div>
    )
}