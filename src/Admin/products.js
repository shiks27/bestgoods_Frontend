import * as React from 'react';
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { Save, ClearAll, List } from "@mui/icons-material"
import { useState, useEffect } from "react";
import Radio from '@mui/material/Radio';
import Swal from "sweetalert2"
import { getData, postDataAndImage,postData, ServerURL } from "../FetchNodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayProducts from './DisplayallProducts';

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

export default function Products(props) {
  const classes = useStyles(props);
  const [logo, setlogo] = useState({ filename: "/camera.png", bytes: "" });
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [categoryId, setCategoryId] = useState(" ")
  const [subCategoryId, setsubCategoryId] = useState(" ")
  const [companyId, setCompanyId] = useState(" ")
  const [productName, setProductName] = useState(" ")
  const [description, setdescription] = useState(" ")
  const[list, setList] = useState([]);
  const [ListCategory, setListCategory] = useState([])
  const [ListsubCategory, setListsubCategory] = useState([])
  const [Listcompany, setListcompany] = useState([])


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleSubmit = async () => {
    var formData = new FormData()
    formData.append('categoryId', categoryId);
    formData.append('subCategoryId', subCategoryId);
    formData.append('companyId', companyId);
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('selectedValue', selectedValue);
    formData.append('icon', logo.bytes)
    var result = await postDataAndImage('products/productsubmit', formData, { headers: { "content-type": "multipart/formData" } })

    if (result) {
      Swal.fire({
        text: 'Products Added Successfully',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon: 'success'
      })
    }
    else {
      Swal.fire({
        title: 'Category Interface',
        text: 'Failed to add products',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon: 'error'
      })
    }

  }
  const handlelogo = (event) => {
    setlogo({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
  }
  const handleClick = () => {
    // props.history.push({ pathname: '/displayallproducts' });
    props.setComponent(<DisplayProducts setComponent={props.setComponent}/>)
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
useEffect(function(){
  fetchAllCategories() 
  fetchallcompany()
},[])
  const fillCategory=()=>{
    return ListCategory.map((item)=>{
      return <MenuItem value={item.categoryid}>
      {item.categoryname}
      </MenuItem>
    })
  }
  const fillsubcategory=()=>{
    return ListsubCategory.map((item)=>{
      return<MenuItem value={item.subcategoryid}>
        {item.subcategoryname}
      </MenuItem>
    })
  }
  const fillcompany=()=>{
    return Listcompany.map((item)=>{
        return<MenuItem value={item.companyid}>
          {item.companyname}
        </MenuItem>
    })
  }
  const handlesubcategoryid=(event)=>{
    setsubCategoryId(event.target.value);
  }
  const handlecategoryid=(event)=>{
    setCategoryId(event.target.value);
    fetchAllSubCategory(event.target.value);
  }
  const handlecompanyid=(event)=>{
    setCompanyId(event.target.value);
    
  }
  
  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ fontSize: 18, letterSpacing: 1, fontWeight: 800 }}>
              Products Interface
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Button startIcon={<List />} onClick={() => handleClick()} variant="contained">Product List</Button>
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
            <TextField fullWidth onChange={(event) => setProductName(event.target.value)} variant="outlined" label="Product Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth onChange={(event) => setdescription(event.target.value)} variant="outlined" label="Product Description" />
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
            <Avatar alt="Logo" variant="rounded" src={logo.filename} />
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