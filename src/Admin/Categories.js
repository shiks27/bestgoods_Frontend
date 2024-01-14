import React,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import {  ClearAll, List ,Edit} from '@mui/icons-material';
import { postDataAndImage, ServerURL } from '../FetchNodeServices';
import Swal from 'sweetalert2';
import DisplayallCategories from './DisplayallCategories';
const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center'
    },
    subdiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        width: 600,
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
    }
});

export default function Categories(props) {
    const classes = useStyles();
    const [category, setCategory] = useState(" ");
    const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" })
    const handlePicture = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }
    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryname', category)
        formData.append('icon', picture.bytes)
        var result = await postDataAndImage('category/categorysubmit', formData, { headers: { "content-type": "multipart/formData" } })

        if (result) {
            Swal.fire({
                text: 'Category Added Successfully',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({
                title: 'Category Interface',
                text: 'Failed to add category',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }

    }
    const handleClick=()=>{
        // props.history.push({pathname:'/displayallcategories'})
        props.setComponent(<DisplayallCategories setComponent={props.setComponent}/>)
    }
    return (<div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={2}>
                    <Grid item xs={12} >
                          <Grid container spacing={1}>
                              <div style={{flexDirection: 'row',display: 'flex'}}>
                                       <div style={{width: 10,height: 5,paddingRight: 30}}>
                                       <img src="/category.jpg" width="30" />
                                       </div>
                               </div>
                              <div style={{fontSize: 18,letterSpacing: 1,fontWeight: 800}}>
                                  Category Interface
                              </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <div>
                                <Button startIcon={<List/>} onClick={() => handleClick()} variant="contained">Category List</Button>
                            </div>
                        </Grid>
            

            <Grid item xs={12}>
            <TextField onChange={(event) => setCategory(event.target.value)} fullWidth variant="outlined" label="Category name" />
            </Grid>
            <Grid item xs={6} >
            <label htmlFor="contained-button-file">
            <input onChange={(event) => handlePicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type ="file" />
            <Button fullWidth variant="contained" component="span">
            Upload
            </Button>
            
            </label>
            </Grid>
            <Grid item xs={6} className={classes.center}>
            <Avatar alt="Picture" variant="rounded" src={picture.filename} />
            </Grid>

            <Grid item xs={6}>
            <Button onClick={() => handleSubmit()} fullWidth variant="contained" startIcon={<Edit />}>Edit</Button>
            </Grid>
            <Grid item xs={6}>
            <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
            </Grid>
            </Grid>
        </div>

    </div>
    )
}