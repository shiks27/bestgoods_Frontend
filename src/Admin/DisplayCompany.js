import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import { Grid, TextField } from "@mui/material";
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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Country, State, City } from 'country-state-city';
import Company from "./Company";
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


export default function DisplayCompany(props) {
    const classes = useStyles(props);
    const [list, setList] = useState([]);
    const [logo, setlogo] = useState({ filename: "/camera.png", bytes: "" });
    const [companyid, setcompanyid] = useState(" ");
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
    const [open, setOpen] = useState(false);
    const [btnState, setbtnState] = useState(false);
    const [Oldlogo, setOldlogo] = useState('')
    const [categoryId, setCategoryId] = useState(" ")
    const [subCategoryId, setsubCategoryId] = useState(" ")
    const [ListCategory, setListCategory] = useState([])
    const [ListsubCategory, setListsubCategory] = useState([])
    const fetchallcompany = async () => {
        var result = await getData('company/displayallcompanies')
        setList(result.data);
    }
    useEffect(function () {
        fetchallcompany()
        fetchAllCategories()
        fetchAllSubCategory()
    }, [])
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
    
    const handleClickOpen = (rowData) => {
        setCategoryId(rowData.categoryid);
        setsubCategoryId(rowData.subcategoryid);
        setcompanyid(rowData.companyid);
        setcompanyname(rowData.companyname);
        setphonenumber(rowData.companycontactno);
        setpersonname(rowData.contactperson);
        setemailid(rowData.companyemailid);
        setaddress1(rowData.address1);
        setaddress2(rowData.address2);
        setcountry(rowData.country);
        setdescription(rowData.description);
        setstate(rowData.state);
        setcity(rowData.city);
        setzipcode(rowData.zipcode);
        setlogo({ filename: `${ServerURL}/images/${rowData.logo}`, bytes: "" })
        fillCountry()
        fillStates()
        fillCity()
        setOpen(true);


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
                    {showCompanyform()}
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


    const handlelogo = (event) => {
        setlogo({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setbtnState(true);
    }

    const handleSubmit = async () => {
        setOpen(false);
        var body = {
            companyid: companyid, companyname: companyname, personname: personname, phonenumber: phonenumber, emailid: emailid, address1: address1, address2: address2,
            country: country, description: description, state: state, city: city, zipcode: zipcode
        }
        var result = await postData('company/updatecompanydata', body)
        if (result) {
            Swal.fire({
                text: 'Company details Updated Successfully',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({
                title: 'Category Interface',
                text: 'Failed to Update Companydetails',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }
        fetchallcompany()
    }

    const handleEditLogo = async () => {
        setOpen(false)
        var formData = new FormData()
        formData.append('companyid', companyid)
        formData.append('logo', logo.bytes)

        var result = await postDataAndImage('company/editcompanylogo', formData)
        if (result) {
            Swal.fire({
                text: 'Company Logo Successfully',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({

                text: 'Failed to Update Company Logo',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }
        fetchallcompany()
    }
    const handleCancel = () => {
        setbtnState(false);
        setlogo({ filename: `${ServerURL}/images/${Oldlogo}`, bytes: "" });
    }
    const handleClick = () => {
        // props.history.push({ pathname: '/company' });
        props.setComponent(<Company setComponent={props.setComponent}/>)
    }


    const fillCountry = () => {
        return Country.getAllCountries().map((item) => {
            return <MenuItem value={item.name}>
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
    
    const showCompanyform = () => {
        return (<div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>

                        <div style={{ fontSize: 18, letterSpacing: 1, fontWeight: 800 }}>
                            Edit CompanyDetails
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
                        <TextField value={companyname} fullWidth onChange={(event) => setcompanyname(event.target.value)} variant="outlined" label="Company name" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField onChange={(event) => setpersonname(event.target.value)} value={personname} id="input-with-icon-textfield" label="Person Name" InputProps={{
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
                        <TextField value={phonenumber} fullWidth onChange={(event) => setphonenumber(event.target.value)} variant="outlined" label="Phone-Number" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField value={emailid} onChange={(event) => setemailid(event.target.value)} fullWidth variant="outlined" label="Email-ID" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={address1} onChange={(event) => setaddress1(event.target.value)} fullWidth variant="outlined" label="Address 1" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={address2} onChange={(event) => setaddress2(event.target.value)} fullWidth variant="outlined" label="Address 2" />
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
                        <TextField value={description} onChange={(event) => setdescription(event.target.value)} fullWidth variant="outlined" label="Description" />
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
                            <Button onClick={() => handleClick()} startIcon={<AddBox />} variant="contained" >Add Company Details</Button>
                        </div>

                        <div style={{ width: 200, fontSize: 20, fontWeight: 700, letterSpacing: 1, padding: 5, float: 'right' }}>
                            List of Companies
                        </div>
                        <div>

                        </div>
                    </div>
                    }
                    columns={[
                        // { title: 'Category Id', field: 'categoryid' },
                        // { title: 'Sub Category Id', field: 'subcategoryid' },
                        { title: 'Companyid', field: 'companyid' },
                        { title: 'companyname', field: 'companyname' },

                        { title: 'Personal Details', render: rowData => <div><div>{rowData.contactperson}</div><div>{rowData.companycontactno}</div><div>{rowData.companyemailid}</div></div> },

                        { title: 'Address', render: rowData => <div><div>{rowData.address1} </div><div>{rowData.address2}</div></div> },

                        { title: 'country', render: rowData => <div><div>{Country.getCountryByCode(rowData.country).name},{State.getStateByCodeAndCountry(rowData.state,rowData.country).name}<div>{rowData.city}</div><div>{rowData.zipcode}</div></div></div> },
                        { title: 'description', field: 'description' },



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
                            onClick: (event, rowData) => alert("You saved " + rowData.categoryname)
                        }
                    ]}

                />
            </div>
            {showDialog()}
        </div>
    )
}