import * as React from 'react';
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { Save, ClearAll, List } from "@mui/icons-material"
import { useState, useEffect } from "react";
import Swal from "sweetalert2"
import { getData, postDataAndImage,postData, ServerURL } from "../FetchNodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Displayallmodels from './displayallmodels';

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
export default function Models(props) {
    const classes = useStyles(props);
    const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" });
    const [categoryId, setCategoryId] = useState(" ")
    const [subCategoryId, setsubCategoryId] = useState(" ")
    const [companyId, setCompanyId] = useState(" ")
    const [productId, setproductId] = useState(" ")
    const [modelName,setModelName] = useState(" ")
    const [size,setSize] = useState(" ")
    const [weight,setWeight] = useState(" ")
    const [ListCategory, setListCategory] = useState([])
    const [ListsubCategory, setListsubCategory] = useState([])
    const [Listcompany, setListcompany] = useState([])
    const [Listproducts, setListproducts] = useState([])


    const handlepicture = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const fetchAllCategories = async () => {
        var result = await getData("category/displayallcategory")
        setListCategory(result.data)
    }
      const fetchAllSubCategory = async (cid) => {
        var body={categoryid:cid}
        var result = await postData("subcategory/displayallsubcategorybycategory",body);
        setListsubCategory(result.data)
      }
      const fetchallproducts = async (sid) => {
          var body={subcategoryid:sid}
           var result = await postData('products/displayallproductsbysubcategory',body);
           setListproducts(result.data);
      }
      const fetchallcompany=async(pid)=>{
        var body={productid:pid}
        var result=await postData("products/displayallproductsbycompany",body)
        setListcompany(result.data);
    }
    useEffect(function () {
        fetchAllCategories()
       
    }, [])
    const fillCategory = () => {
        return ListCategory.map((item) => {
            return <MenuItem value={item.categoryid}>
                {item.categoryname}
            </MenuItem>
        })
    }
    const fillsubcategory = () => {
        return ListsubCategory.map((item) => {
            return <MenuItem value={item.subcategoryid}>
                {item.subcategoryname}
            </MenuItem>
        })
    }
    const fillcompany = () => {
        return Listcompany.map((item) => {
            return <MenuItem value={item.companyid}>
                {item.companyname}
            </MenuItem>
        })
    }
    const fillproducts=()=>{
        return Listproducts.map((item)=>{
            return <MenuItem value={item.productid}>
                {item.productname}
            </MenuItem>
        })
    }

    const handlesubcategoryid = (event) => {
        setsubCategoryId(event.target.value);
        fetchallproducts(event.target.value);
    }
   
    const handlecategoryid=(event)=>{
        setCategoryId(event.target.value);
        fetchAllSubCategory(event.target.value);
      }
    const handlecompanyid = (event) => {
        setCompanyId(event.target.value);
        
    }
    const handleproductid = (event) => {
        setproductId(event.target.value);
        fetchallcompany(event.target.value);        
    }
     
    const handleClick=()=>{
        // props.history.push({pathname:'/displayallmodels'})
        props.setComponent(<Displayallmodels setComponent={props.setComponent}/>)
      }
    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid', categoryId);
        formData.append('subcategoryid', subCategoryId);
        formData.append('companyid', companyId);
        formData.append('productid',productId);
        formData.append('modelname',modelName);
        formData.append('size',size);
        formData.append('weight',weight);
        formData.append('picture',picture.bytes);
        
        var result = await postDataAndImage('models/submitmodel', formData, { headers: { "content-type": "multipart/formData" } })
    
        if (result) {
          Swal.fire({
            text: 'Models Added Successfully',
            imageUrl: '/logo.jpg',
            imageAlt: 'Custom image',
            icon: 'success'
          })
        }
        else {
          Swal.fire({
            title: 'Colors Interface',
            text: 'Failed to add Models',
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
                            Models Interface
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Button startIcon={<List />} onClick={()=>handleClick()}  variant="contained">Models List</Button>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="Category Id"
                                onChange={(event) => handlecategoryid(event)}
                            >
                                {fillCategory()}
                            </Select>
                        </FormControl>


                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sub Category Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategoryId}
                                label="Sub Category Id"
                                onChange={(event) => handlesubcategoryid(event)}
                            >
                                {fillsubcategory()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={productId}
                                label="Company Id"
                                onChange={(event) => handleproductid(event)}
                            >
                                {fillproducts()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Company Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={companyId}
                                label="Company Id"
                                onChange={(event) => handlecompanyid(event)}
                            >
                                {fillcompany()}
                            </Select>
                        </FormControl>
                    </Grid>
                   
                    <Grid item xs={12}>
                        <TextField fullWidth onChange={(event) => setModelName(event.target.value)} variant="outlined" label="ModelName" />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth onChange={(event) => setSize(event.target.value)} variant="outlined" label="Size" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth onChange={(event) => setWeight(event.target.value)} variant="outlined" label="Weight" />
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

                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={(event) => handleSubmit(event)} startIcon={<Save />}>Save</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                    </Grid>
                </Grid>

            </div>

        </div>
    )
}