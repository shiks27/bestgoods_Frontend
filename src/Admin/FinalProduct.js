import * as React from 'react';
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button, Avatar, getDrawerUtilityClass } from "@mui/material";
import { Save, ClearAll, List, Add } from "@mui/icons-material"
import { useState, useEffect } from "react";
import Swal from "sweetalert2"
import { getData, postDataAndImage, postData, ServerURL, postDataAndImagewithid } from "../FetchNodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayFinalProduct from './DisplayFinalProduct';
import { DropzoneDialog } from 'material-ui-dropzone';
import Displaymorepictures from './Displaymorepictures';

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

export default function FinalProduct(props) {
    const classes = useStyles(props);
    const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" });
    const [categoryId, setCategoryId] = useState(" ")
    const [subCategoryId, setsubCategoryId] = useState(" ")
    const [companyId, setCompanyId] = useState(" ")
    const [productId, setproductId] = useState(" ")
    const [modelid, setmodelId] = useState(" ")
    const [colorId, setcolorId] = useState(" ")
    const [description, setdescription] = useState(" ")
    const [price, setprice] = useState(" ")
    const [stock, setstock] = useState(" ")
    const [offerprize, setofferprize] = useState([])
    const [ListCategory, setListCategory] = useState([])
    const [ListsubCategory, setListsubCategory] = useState([])
    const [Listcompany, setListcompany] = useState([])
    const [Listproducts, setListproducts] = useState([])
    const [ListModels, setListModels] = useState([])
    const [ListColors, setListColors] = useState([])
    const [size, setsize] = useState(" ")
    const [dropVisible, setDropVisible] = useState(false);
    const [finalproductid, setfinalproductid] = useState(" ");
    const [productStatus, setProductStatus] = useState(" ");

    const handlepicture = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }
    const fetchAllCategories = async () => {
        var result = await getData("category/displayallcategory")
        setListCategory(result.data)
    }
    const fetchAllSubCategory = async (cid) => {
        var body = { categoryid: cid }
        var result = await postData("subcategory/displayallsubcategorybycategory", body);
        setListsubCategory(result.data)
    }
    const fetchallmodels = async (cid) => {
        var body = { companyid: cid }
        var result = await postData('models/displayallmodelsbycompany', body)
        setListModels(result.data);
    }
    const fetchallproducts = async (sid) => {
        var body = { subcategoryid: sid }
        var result = await postData('products/displayallproductsbysubcategory', body);
        setListproducts(result.data);
    }
    const fetchallcolors = async (cid) => {
        var body = { companyid: cid }
        var result = await postData('colors/displayallcolorsbycompany', body);
        setListColors(result.data);
    }
    const fetchallcompany = async (pid) => {
        var body = { productid: pid }
        var result = await postData("products/displayallproductsbycompany", body);
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
    const fillproducts = () => {
        return Listproducts.map((item) => {
            return <MenuItem value={item.productid}>
                {item.productname}
            </MenuItem>
        })
    }
    const fillmodels = () => {
        return ListModels.map((item) => {
            return <MenuItem value={item.modelid}>
                {item.modelname}
            </MenuItem>
        })
    }

    const fillcolors = () => {
        return ListColors.map((item) => {
            return <MenuItem value={item.colorid}>{item.color}</MenuItem>
        })
    }
    const fillsize = () => {
        return ListModels.map((item) => {
            return <MenuItem value={item.size}>{item.size}</MenuItem>
        })
    }
    const handlesubcategoryid = (event) => {
        setsubCategoryId(event.target.value);
        fetchallproducts(event.target.value);
    }

    const handlecategoryid = (event) => {
        setCategoryId(event.target.value);
        fetchAllSubCategory(event.target.value);
    }
    const handlecompanyid = (event) => {
        setCompanyId(event.target.value);
        fetchallmodels(event.target.value);
        fetchallcolors(event.target.value);
    }
    const handleproductid = (event) => {
        setproductId(event.target.value);
        fetchallcompany(event.target.value);
    }

    const handlemodelid = (event) => {
        setmodelId(event.target.value);
        
    }
    const handlecolorid = (event) => {
        setcolorId(event.target.value);

    }
    const handlesize=(event)=>{
        setsize(event.target.value);
    }
    const handleClick = () => {
        // props.history.push({pathname:'/displayallcolors'})
        props.setComponent(<DisplayFinalProduct setComponent={props.setComponent} />)
        
    }
    const handleclick = () => {
        // props.history.push({pathname:'/displayallcolors'})
        props.setComponent(<Displaymorepictures setComponent={props.setComponent} />)
        
    }
    const handleSave = async (files) => {
        var formData = new FormData();
        formData.append('finalproductid', finalproductid);
        files.map((file, index) => {
            formData.append("image" + index, file)
        })
        var result = await postDataAndImage('finalproduct/savemorepictures', formData)
        alert(result)
    }
    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid', categoryId);
        formData.append('subcategoryid', subCategoryId);
        formData.append('companyid', companyId);
        formData.append('productid', productId);
        formData.append('modelid', modelid);
        formData.append('colorid', colorId);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('size', size);
        formData.append('offerprize', offerprize);
        formData.append('picture', picture.bytes);
        formData.append('productstatus',productStatus);

        var result = await postDataAndImagewithid('finalproduct/finalproductsubmit', formData, { headers: { "content-type": "multipart/formData" } })

        if (result.result) {
            setfinalproductid(result.finalproductid);
            Swal.fire({
                text: 'Final Products Added Successfully',
                imageUrl: '/logo.jpg',
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({
                title: 'Final Products Interface',
                text: 'Failed to add Final Products',
                imageUrl: '/logo.jpg',
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }

    }
    const handleAddPicture = () => {
        setDropVisible(true);
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
                        <Grid item xs={6}> 
                            <Button startIcon={<List />} onClick={() => handleClick()} variant="contained">Display List</Button>
                        </Grid>
                        <Grid item xs={6}>
                                <Button startIcon={<List />} onClick={() => handleclick()} variant="contained">Display More Pictures</Button>
                        </Grid>

                    </Grid>
                    <Grid item xs={4}>
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

                    <Grid item xs={4}>
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

                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Color Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={colorId}
                                label="Color Id"
                                onChange={(event) => handlecolorid(event)}
                            >
                                {fillcolors()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Model Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={modelid}
                                label="Company Id"
                                onChange={(event) => handlemodelid(event)}
                            >
                                {fillmodels()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Size</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={size}
                                label="Size"
                                onChange={(event) => handlesize(event)}
                            >
                                {fillsize()}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={4}>
                        <TextField fullWidth onChange={(event) => setsize(event.target.value)} variant="outlined" label="Size" />
                    </Grid> */}
                    
                    <Grid item xs={4}>
                        <TextField fullWidth onChange={(event) => setprice(event.target.value)} variant="outlined" label="Price" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth onChange={(event) => setstock(event.target.value)} variant="outlined" label="Stock" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth onChange={(event) => setofferprize(event.target.value)} variant="outlined" label="Offer Prize" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth onChange={(event) => setdescription(event.target.value)} variant="outlined" label="Description" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={productStatus}
                                label="Product Status"
                                onChange={(event) =>setProductStatus(event.target.value)}
                            >
                                <MenuItem value="Trending">Trending</MenuItem>
                            <MenuItem value="New Arrrival">New Arrival</MenuItem>
                            </Select>
                           
                        </FormControl>
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
                    <Grid item xs={4}>
                        <Button fullWidth variant="contained" onClick={() => handleAddPicture()} startIcon={<Add />}>Add More Pictures</Button>
                    </Grid>
                </Grid>
                <DropzoneDialog
                    open={dropVisible}
                    onSave={(files) => handleSave(files)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    filesLimit={10}
                    onClose={() => setDropVisible(false)}
                />
            </div>

        </div>


    )
}