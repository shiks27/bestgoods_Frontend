import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import { Grid, TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import { Save, AddBox, ClearAll, list, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { getData, postData, postDataAndImage, ServerURL } from '../FetchNodeServices';
import Dialog from '@mui/material/Dialog';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Products from "./products";


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Country, State, City } from 'country-state-city';
import * as React from 'react';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',

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


export default function DisplayProducts(props) {
  const classes = useStyles(props);
  const [productid, setproductid] = useState(" ");
  const [ListCategory, setListCategory] = useState([])
  const [Listcompany, setListcompany] = useState([])
  const [ListsubCategory, setListsubCategory] = useState([])
  const [list, setList] = useState([]);
  const [logo, setlogo] = useState({ filename: "/camera.png", bytes: "" });
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [categoryId, setCategoryId] = useState(" ")
  const [subCategoryId, setsubCategoryId] = useState(" ")
  const [companyId, setCompanyId] = useState(" ")
  const [productName, setProductName] = useState(" ")
  const [description, setdescription] = useState(" ")
  const [open, setOpen] = useState(false);
  const [btnState, setbtnState] = useState(false);
  const [Oldlogo, setOldlogo] = useState('')
  const handleChange = (event) => {
    setSelectedValue(event.target.value);

    // [variable,setFN]=useState()
  }
  const handlelogo = (event) => {
    setlogo({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setbtnState(true);
  }
  const handleCancel = () => {
    setbtnState(false);
    setlogo({ filename: `${ServerURL}/images/${Oldlogo}`, bytes: "" });
  }
  const fetchallproducts = async () => {
    var result = await getData('products/displayallproducts')
    setList(result.data);
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
  
  const fetchallcompany = async () => {
    var result = await getData('company/displayallcompanies')
    setListcompany(result.data);
  }

  useEffect(function () {
    fetchallproducts()
    fetchAllCategories()
    fetchallcompany()
  }, [])
  const handleClickOpen = (rowData) => {
    fetchAllSubCategory(rowData.categoryid)
    setproductid(rowData.productid);
    setCategoryId(rowData.categoryid);
    setsubCategoryId(rowData.subcategoryid);
    setCompanyId(rowData.companyid);
    setProductName(rowData.productname);
    setdescription(rowData.description);
    setSelectedValue(rowData.status);
    setlogo({ filename: `${ServerURL}/images/${rowData.logo}`, bytes: "" })
    setOpen(true);
    
  }

  const handleSubmit = async () => {
    setOpen(false);
    var body = {
      productid: productid, categoryId: categoryId, companyId: companyId, subcategoryid: subCategoryId, productname: productName, description: description,
      selectedValue: selectedValue, logo: logo
    }
    var result = await postData('products/updateproductdata', body)
    if (result) {
      Swal.fire({
        text: 'Product details Updated Successfully',
        imageUrl: "/logo.jpg",
        imageAlt: 'Custom image',
        icon: 'success'
      })
    }
    else {
      Swal.fire({
        title: 'Category Interface',
        text: 'Failed to Update Productdetails',
        imageUrl: "/logo.jpg",
        imageAlt: 'Custom image',
        icon: 'error'
      })
    }
    fetchallproducts()
  }

  const handleEditLogo = async () => {
    setOpen(false)
    var formData = new FormData()
    formData.append('productid', productid)
    formData.append('logo', logo.bytes)

    var result = await postDataAndImage('products/editproductlogo', formData)
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
    fetchallproducts()
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
          Edit Company Details
        </DialogTitle>
        <DialogContent>
          {showProductform()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>

        </DialogActions>
      </Dialog>
    )
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleClick = () => {
    // props.history.push({ pathname: '/products' });
    props.setComponent(<Products setComponent={props.setComponent}/>)
  }
  
  const handlecategoryid=(event)=>{
    setCategoryId(event.target.value);
    fetchAllSubCategory(event.target.value);
  }
  const handlesubcategoryid = (event) => {
    setsubCategoryId(event.target.value);
    fillcompany();
  }

  const handlecompanyid = (event) => {
    setCompanyId(event.target.value);
    fillsubcategory();
  }
  const fillcompany = () => {
    return Listcompany.map((item) => {
      return <MenuItem value={item.companyid}>
        {item.companyname}
      </MenuItem>
    })
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


  const handleDelete=async(data)=>{
    Swal.fire({
      title: `Do you want to delete the ${data.productname}?`,
      imageUrl: "/logo.jpg",
      showDenyButton:true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData('products/deleteproducts',{productid:data.productid});
        if(result){
            Swal.fire("Record Deleted Successfully");
             fetchallproducts();
        }
        else{
          Swal.fire("Fail to Delete Record");
      }
      }
       else if (result.isDenied) {
        Swal.fire(`${data.productname} is Safe`);
      }
    })
   
  }

  const showProductform = () => {
    return (
      <div className={classes.root}>
        <div className={classes.subdiv}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ fontSize: 18, letterSpacing: 1, fontWeight: 800 }}>
                Edit Products Interface
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
              <TextField value={productName} fullWidth onChange={(event) => setProductName(event.target.value)} variant="outlined" label="Product Name" />
            </Grid>
            <Grid item xs={6}>
              <TextField value={description} fullWidth onChange={(event) => setdescription(event.target.value)} variant="outlined" label="Product Description" />
            </Grid>
            <Grid item xs={6}>
              Status:-
              <Radio
                checked={selectedValue === 'continue'}
                onChange={handleChange}
                value="continue"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
              /> Continue
              <Radio
                checked={selectedValue === 'discontinue'}
                onChange={handleChange}
                value="discontinue"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'B' }}
              /> Discontinue

            </Grid>
            <Grid item xs={6} >
              <label htmlFor="contained-button-file">
                <input onChange={(event) => handlelogo(event)} accept="image/*" className={classes.inputstyle} id="contained-button-file" multiple type="file" />
                <Button fullWidth variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </Grid>
            <Grid item xs={6} className={classes.center}>
              {btnState ?
                <span>
                  <Button onClick={() => handleEditLogo()}>Save </Button>
                  <Button onClick={() => handleCancel()}>Cancel</Button>
                </span> : <></>}
              <Avatar alt="Logo" variant="rounded" src={logo.filename} />
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" onClick={(event) => handleSubmit(event)} startIcon={<Edit />}>Edit</Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
            </Grid>

          </Grid>
        </div>
      </div>
    )
  }
  return (
    <div className={classes.root}>

      <div className={classes.subdiv}>
        <MaterialTable
          title={<div style={{ width: 500, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ padding: 5 }}>
              <Button onClick={(event) => handleClick(event)} startIcon={<AddBox />} variant="contained" >Add Products Details</Button>
            </div>

            <div style={{ width: 200, fontSize: 20, fontWeight: 700, letterSpacing: 1, padding: 5, float: 'right' }}>
              List of Products
            </div>
            <div>

            </div>
          </div>
          }
          columns={[
            { title: 'CategoryId', render: rowData => (<div>{rowData.categoryid},{rowData.categoryname}</div>) },
            { title: 'subCategoryId', render: rowData => (<div>{rowData.subcategoryid},{rowData.subcategoryname}</div>) },
            { title: 'companyId', render: rowData => (<div>{rowData.companyid},{rowData.companyname}</div>) },
            { title: 'productName', field: 'productname' },
            { title: 'description', field: 'description' },
            { title: 'Status', field: 'status' },
            {
              title: 'logo', field: "logo",
              render: rowData =>
                <Avatar
                  alt="Company logo"
                  src={`${ServerURL}/images/${rowData.logo}`}
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
    </div>
  )
}