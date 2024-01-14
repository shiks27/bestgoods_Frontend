import * as React from 'react';
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button, Avatar, colors } from "@mui/material";
import { Save, AddBox, ClearAll, List, Edit } from "@mui/icons-material"
import { useState, useEffect } from "react";
import Swal from "sweetalert2"
import { getData, postData, postDataAndImage, ServerURL } from "../FetchNodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import MaterialTable from "material-table";
import FinalProduct from './FinalProduct';


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

export default function DisplayFinalProduct(props) {
    const classes = useStyles(props);
    const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" });
    const [finalproductid, setfinalproductid] = useState(" ")
    const [categoryId, setCategoryId] = useState(" ")
    const [subCategoryId, setsubCategoryId] = useState(" ")
    const [companyId, setCompanyId] = useState(" ")
    const [productId, setproductId] = useState(" ")
    const [modelId, setmodelId] = useState(" ")
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
    const [List, setList] = useState([])
    const [open, setOpen] = useState(false)
    const [size, setsize] = useState(" ")
    const [btnState,setbtnState]=useState(false);
    const [Oldpicture,setOldpicture]=useState(' ')

    const handlepicture = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setbtnState(true);
    }
    const handleCancel = () => {
        setbtnState(false);
        setPicture({ filename: `${ServerURL}/images/${Oldpicture}`, bytes: "" });
      }
    const fetchallfinalproducts = async () => {
        var result = await getData("finalproduct/displayfinalproducts")
        setList(result.data);
    }
    const fetchAllCategories = async () => {
        var result = await getData("category/displayallcategory")
        setListCategory(result.data)
    }
    const fetchallmodels = async (cid) => {
        var body = { companyid: cid }
        var result = await postData('models/displayallmodelsbycompany', body)
        setListModels(result.data);
    }

    const fetchAllSubCategory = async (cid) => {
        var body = { categoryid: cid }
        var result = await postData("subcategory/displayallsubcategorybycategory", body);
        setListsubCategory(result.data);
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
        fetchallfinalproducts()
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
    const handleClickOpen = (rowData) => {
        fetchAllSubCategory(rowData.categoryid)
        fetchallproducts(rowData.subcategoryid)
        fetchallcompany(rowData.productid)
        fetchallcolors(rowData.companyid)
        fetchallmodels(rowData.companyid)
        setfinalproductid(rowData.finalproductid);
        setCategoryId(rowData.categoryid);
        setsubCategoryId(rowData.subcategoryid);
        setproductId(rowData.productid);
        setCompanyId(rowData.companyid);
        setcolorId(rowData.colorid);
        setmodelId(rowData.modelid);
        setdescription(rowData.description);
        setstock(rowData.stock);
        setprice(rowData.price);
        setofferprize(rowData.offerprize);
        setsize(rowData.size);
        setPicture({ filename: `${ServerURL}/images/${rowData.picture}`, bytes: "" })
        setOpen(true);
    }

    const handleEditPicture = async () => {
        setOpen(false)
        var formData = new FormData()
        formData.append('finalproductid', finalproductid)
        formData.append('picture', picture.bytes)

        var result = await postDataAndImage('finalproduct/editpicture', formData)
        if (result) {
            Swal.fire({
                text: 'Product Logo Successfully',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({

                text: 'Failed to Update Product Logo',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }
        fetchallfinalproducts()
    }

    const showDialog = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Edit FinalProduct
                </DialogTitle>
                <DialogContent>
                    {FinalProductform()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>

                </DialogActions>
            </Dialog>
        )
    }
    const handleDelete=async(data)=>{
        Swal.fire({
          title: `Do you want to delete the ${data.finalproductid}?`,
          imageUrl: "/logo.jpg",
          showDenyButton:true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            result=await postData('finalproduct/deletefinalproduct',{finalproductid:data.finalproductid});
            if(result){
                Swal.fire("Record Deleted Successfully");
                 fetchallfinalproducts();
            }
            else{
              Swal.fire("Fail to Delete Record");
          }
          }
           else if (result.isDenied) {
            Swal.fire("Product is Safe");
          }
        })
       
      }
    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = async () => {
        setOpen(false);
        var body = { finalproductid: finalproductid, categoryId: categoryId, subcategoryid: subCategoryId, productid: productId, companyid: companyId, colorid: colorId, modelid: modelId, description: description, stock: stock, price: price, offerprize: offerprize, size: size }
        var result = await postData('finalproduct/updatefinalproductdata', body)
        if (result) {
            Swal.fire({
                text: 'Final Products  Updated Successfully',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({
                title: 'Colors Interface',
                text: 'Failed to Update Final Product details',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }
        fetchallfinalproducts()
    }

    const FinalProductform = () => {
        return (
            <div className={classes.root}>
                <div className={classes.subdiv}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{ fontSize: 18, letterSpacing: 1, fontWeight: 800 }}>
                                Edit Final Products
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
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Model Id</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={modelId}
                                    label="Company Id"
                                    onChange={(event) => handlemodelid(event)}
                                >
                                    {fillmodels()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth value={size} onChange={(event) => setsize(event.target.value)} variant="outlined" label="Size" />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField value={price} fullWidth onChange={(event) => setprice(event.target.value)} variant="outlined" label="Price" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField value={stock} fullWidth onChange={(event) => setstock(event.target.value)} variant="outlined" label="Stock" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField value={offerprize} fullWidth onChange={(event) => setofferprize(event.target.value)} variant="outlined" label="Offer Prize" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField value={description} fullWidth onChange={(event) => setdescription(event.target.value)} variant="outlined" label="Description" />
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
                            {btnState ?
                                <span>
                                    <Button onClick={() => handleEditPicture()}>Save </Button>
                                    <Button onClick={() => handleCancel()}>Cancel</Button>
                                </span> : <></>}
                            <Avatar alt="picture" variant="rounded" src={picture.filename} />
                        </Grid>

                        <Grid item xs={6}>
                            <Button fullWidth variant="contained" onClick={(event) => handleSubmit(event)} startIcon={<Edit />}>Edit</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth variant="contained" startIcon={<ClearAll />}>Delete</Button>
                        </Grid>
                    </Grid>

                </div>

            </div>
        )
    }
   const handleClick=()=>{
       props.setComponent(<FinalProduct setComponent={props.setComponent}/>)
       
   }
   
    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <MaterialTable
                    title={<div style={{ width: 500, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ padding: 5 }}>
                            <Button startIcon={<AddBox />} onClick={()=>handleClick()} variant="contained" >Add Final Product Details</Button>
                        </div>
                      

                        <div style={{ width: 200, fontSize: 20, fontWeight: 700, letterSpacing: 1, padding: 5, float: 'right' }}>
                            DisplayFinalProducts
                        </div>
                        <div>

                        </div>
                    </div>
                    }
                    columns={[
                        { title: 'Category Id', render: rowData => (<div>{rowData.categoryid},{rowData.categoryname}</div>) },
                        { title: 'Sub Category Id', render: rowData => (<div>{rowData.subcategoryid},{rowData.subcategoryname}</div>) },
                        { title: 'Companyid', render: rowData => (<div>{rowData.companyid},{rowData.companyname}</div>) },
                        { title: 'Productid', render: rowData => (<div>{rowData.productid},{rowData.productname}</div>) },
                        { title: 'ColorId', render: rowData => (<div>{rowData.colorid},{rowData.color}</div>) },
                        { title: 'ModelId', render: rowData => (<div>{rowData.modelid},{rowData.modelname}</div>) },
                        { title: 'Description', field: 'description' },
                        { title: 'Prize', field: 'price' },
                        { title: 'Stock', field: 'stock' },
                        { title: 'Offer Prize', field: 'offerprize' },
                        { title: 'size', field: 'size' },
                        {
                            title: 'Picture', field: "picture",
                            render: rowData =>
                                <Avatar
                                    alt="Company logo"
                                    src={`${ServerURL}/images/${rowData.picture}`}
                                    variant="rounded"
                                    sx={{ width: 56, height: 56 }}
                                />
                        },
                    ]}
                    data={List}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Category',
                            onClick: (event, rowData) => handleClickOpen(rowData)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete Category',
                            onClick: (event, rowData) => handleDelete(rowData)
                        }
                    ]}

                />
            </div>
            {showDialog()}
        </div>
    )

}