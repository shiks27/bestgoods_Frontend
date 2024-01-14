import { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { Grid, TextField, Button, Avatar } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Save, ClearAll, List } from '@mui/icons-material';
import 'react-phone-number-input/style.css';
import Swal from 'sweetalert2';
import { getData, postDataAndImage, ServerURL } from '../FetchNodeServices';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Country, State, City } from 'country-state-city';
import DisplayCompany from "./DisplayCompany";
const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center'
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
    inputstyle: {
        display: 'none'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export default function Company(props) {
    const classes = useStyles(props);
    const [logo, setlogo] = useState({ filename: "/camera.png", bytes: "" });
    const [categoryId, setCategoryId] = useState(" ")
    const [subCategoryId, setsubCategoryId] = useState(" ")
    const [companyname, setcompanyname] = useState(" ");
    const [phonenumber, setphonenumber] = useState(" ");
    const [personname, setpersonname] = useState(" ");
    const [emailid, setemailid] = useState(" ");
    const [address1, setaddress1] = useState(" ");
    const [address2, setaddress2] = useState(" ");
    const [country, setcountry] = useState(" ");
    const [description, setdescription] = useState(" ");
    const [state, setstate] = useState(" ");
    const [city, setcity] = useState(" ");
    const [zipcode, setzipcode] = useState(" ");
    const [ListCategory, setListCategory] = useState([])
    const [ListsubCategory, setListsubCategory] = useState([])
    useEffect(function () {
        fetchAllCategories()
        fetchAllSubCategory()
    }, [])
    
    const handlelogo = (event) => {
        setlogo({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }
    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid',categoryId);
        formData.append('subcategoryid',subCategoryId)
        formData.append('companyname', companyname)
        formData.append('phonenumber', phonenumber)
        formData.append('personname', personname)
        formData.append('emailid', emailid)
        formData.append('address1', address1)
        formData.append('address2', address2)
        formData.append('country', country)
        formData.append('description', description)
        formData.append('state', state)
        formData.append('city', city)
        formData.append('zipcode', zipcode)
        formData.append('logo', logo.bytes)
        var result = await postDataAndImage('company/companysubmit', formData, { headers: { "content-type": "multipart/formData" } })

        if (result) {
            Swal.fire({
                text: 'Category Added Successfully',
                imageUrl: '/logo.jpg',
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({
                title: 'Category Interface',
                text: 'Failed to add category',
                imageUrl: '/logo.jpg',
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }

    }
    const handleClick = () => {
        // props.history.push({ pathname: '/displaycompany' })
        props.setComponent(<DisplayCompany setComponent={props.setComponent}/>)
    }
    const fetchAllCategories = async () => {
        var result = await getData("category/displayallcategory")
        setListCategory(result.data)
    }
    const fetchAllSubCategory = async () => {
        var result = await getData("subcategory/displayallsubcategory");
        setListsubCategory(result.data)
    }
    const handlesubcategoryid=(event)=>{
        setsubCategoryId(event.target.value);
      
      }
      const handlecategoryid=(event)=>{
        setCategoryId(event.target.value);
         
      } 

      
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
    
    const fillCountry = () => {
        return Country.getAllCountries().map((item) => {
            return <MenuItem value={item.isoCode}>
                {item.name}
            </MenuItem>
        })
    }
    const handleCountry = (event) => {
        setcountry(event.target.value)
        fillStates();
    }
    const handleStates = (event) => {
        setstate(event.target.value)
        fillCity();
    }
 
   
    const fillStates = () => {
        return State.getStatesOfCountry(country).map((item) => {
            return <MenuItem value={item.isoCode}>
                {item.name}
            </MenuItem>
        })
    }
    const fillCity = () => {
        return City.getCitiesOfState(country, state).map((item) => {
            return <MenuItem value={item.name}>
                {item.name}
            </MenuItem>
        })
    }
  
    
   

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div style={{ fontSize: 18, letterSpacing: 1, fontWeight: 800 }}>
                            Companies Interface
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Button startIcon={<List />} onClick={() => handleClick()} variant="contained">Company List</Button>
                        </div>
                    </Grid>
                    {/* <Grid item xs={6}>
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
                    </Grid> */}
                    <Grid item xs={6}>
                        <TextField fullWidth onChange={(event) => setcompanyname(event.target.value)} variant="outlined" label="Company name" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField onChange={(event) => setpersonname(event.target.value)} id="input-with-icon-textfield" label="Person Name" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                            variant="outlined"
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth onChange={(event) => setphonenumber(event.target.value)} variant="outlined" label="Phone-Number" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField onChange={(event) => setemailid(event.target.value)} fullWidth variant="outlined" label="Email-ID" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event) => setaddress1(event.target.value)} fullWidth variant="outlined" label="Address 1" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event) => setaddress2(event.target.value)} fullWidth variant="outlined" label="Address 2" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={country}
                                label="Country"
                                onChange={(event) => handleCountry(event)}
                            >
                                {fillCountry()}
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={6}>
                        <TextField onChange={(event) => setdescription(event.target.value)} fullWidth variant="outlined" label="Description" />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={state}
                                label="State"
                                onChange={(event) => handleStates(event)}
                            >
                                {fillStates()}
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={city}
                                label="State"
                                onChange={(event) => setcity(event.target.value)}
                            >
                                {fillCity()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField onChange={(event) => setzipcode(event.target.value)} fullWidth variant="outlined" label="Zip Code" />
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
