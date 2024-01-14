import * as React from 'react';
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button, Avatar, colors } from "@mui/material";
import { Save, AddBox, ClearAll, List, Edit, Fastfood } from "@mui/icons-material"
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
import Models from './models';

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

export default function Displayallmodels(props){
    const classes=useStyles(props);
    const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" });
    const [modelid,setModelId]=useState(" ")
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
    const [list, setList] = useState([]);
    const[open,setOpen]=useState(false);
    const[btnState,setbtnState]=useState(false);
    const[Oldlogo,setOldlogo]=useState(' ');
    
    const handlepicture = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setbtnState(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleCancel = () => {
        setbtnState(false);
        setPicture({ filename: `${ServerURL}/images/${Oldlogo}`, bytes: "" });
      }
    const fetchallmodels=async()=>{
        var result=await getData("models/displayallmodels");
        setList(result.data)
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
    }

      
      useEffect(function () {
        fetchallmodels()
        fetchAllCategories()
        
    }, [])
    const showDialog = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Edit Model Details
                </DialogTitle>
                <DialogContent>
                    {showModelform()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>

                </DialogActions>
            </Dialog>
        )
    }
    const handleClickOpen = (rowData) => {
        fetchAllSubCategory(rowData.categoryid)
        fetchallproducts(rowData.subcategoryid)
        fetchallcompany(rowData.productid)
        setModelId(rowData.modelid);
        setCategoryId(rowData.categoryid);
        setsubCategoryId(rowData.subcategoryid);
        setCompanyId(rowData.companyid);
        setproductId(rowData.productid);
        setModelName(rowData.modelname);
        setSize(rowData.size);
        setWeight(rowData.weight);
        setPicture({ filename: `${ServerURL}/images/${rowData.picture}`, bytes: "" })
        setOpen(true);
    }
    const handleEditPicture = async () => {
        setOpen(false)
        var formData = new FormData()
        formData.append('modelid', modelid)
        formData.append('picture', picture.bytes)

        var result = await postDataAndImage('models/editpicture', formData)
        if (result) {
            Swal.fire({
                text: 'Model Updated Successfully',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({

                text: 'Failed to Update Models',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }
        fetchallmodels()
    }
    const handleSubmit = async () => {
        setOpen(false);
        var body = { modelid: modelid, categoryid: categoryId, subcategoryid: subCategoryId, productid: productId, companyid: companyId, modelname:modelName,size:size,weight:weight }
        var result = await postData('models/updatemodeldata', body)
        if (result) {
            Swal.fire({
                text: 'Models details Updated Successfully',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({
                text: 'Failed to Update Model details',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }
        fetchallmodels()
    }
    const handleDelete=async(data)=>{
        Swal.fire({
          title: `Do you want to delete the ${data.modelid}?`,
          imageUrl: "/logo.jpg",
          showDenyButton:true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            result=await postData('models/deletemodels',{modelid:data.modelid});
            if(result){
                Swal.fire("Record Deleted Successfully");
                 fetchallmodels();
            }
            else{
              Swal.fire("Fail to Delete Record");
          }
          }
           else if (result.isDenied) {
            Swal.fire(`${data.modelName} is Safe`);
          }
        })
       
      }
      const handleClick=()=>{
        // props.history.push({pathname:'/models'})
        props.setComponent(<Models setComponent={props.setComponent}/>)
      }
    const showModelform = () => {
        return (<div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: 18, letterSpacing: 1, fontWeight: 800 }}>
                          Edit Models Interface
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Button startIcon={<List />} variant="contained">Models List</Button>
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
                    <Grid item xs={12}>
                        <TextField fullWidth value={modelName} onChange={(event) => setModelName(event.target.value)} variant="outlined" label="ModelName" />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth value={size} onChange={(event) => setSize(event.target.value)} variant="outlined" label="Size" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth value={weight} onChange={(event) => setWeight(event.target.value)} variant="outlined" label="Weight" />
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
                        <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                    </Grid>
                </Grid>
            </div>

        </div>)
    }
    return(<div className={classes.root}>
        <div className={classes.subdiv}>
        <MaterialTable
                    title={<div style={{ width: 500, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ padding: 5 }}>
                            <Button onClick={()=>handleClick()}   startIcon={<AddBox />} variant="contained" >Add Model</Button>
                        </div>

                        <div style={{ width: 200, fontSize: 20, fontWeight: 700, letterSpacing: 1, padding: 5, float: 'right' }}>
                            List of Models
                        </div>
                        <div>

                        </div>
                    </div>
                    }
                    columns={[
                        { title: 'Model Id', field: 'modelid' },
                        { title: 'Category Id',  render:rowData=>(<div>{rowData.categoryid},{rowData.categoryname}</div>) },
                        { title: 'Sub Category Id',  render:rowData=>(<div>{rowData.subcategoryid},{rowData.subcategoryname}</div>) },
                        { title: 'Companyid', render:rowData=>(<div>{rowData.companyid},{rowData.companyname}</div>) },
                        { title: 'Product id', render:rowData=>(<div>{rowData.productid},{rowData.productname}</div>) },
                        { title: 'Size', field: 'size' },
                        { title: 'Weight', field: 'weight' },

                        {
                            title: 'logo', field: "picture",
                            render: rowData =>
                                <Avatar
                                    alt="Model Logo"
                                    src={`${ServerURL}/images/${rowData.picture}`}
                                    variant="rounded"
                                    sx={{ width: 56, height: 56 }}
                                />
                        },
                    ]}
                    data={list}
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
    </div>)
}