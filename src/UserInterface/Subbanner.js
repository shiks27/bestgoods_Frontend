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
import { DropzoneDialog } from 'material-ui-dropzone';
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

export default function Subbanner(props) {
    const classes = useStyles(props);
    const [categoryId, setCategoryId] = useState(" ");
    const [subCategoryId, setsubCategoryId] = useState(" ");
    const [dropVisible, setDropVisible] = useState(false);
    const [subbannerid, setSubbannerid] = useState(" ");
    const [ListCategory, setListCategory] = useState([])
    const [ListsubCategory, setListsubCategory] = useState([])
    const handlesubcategoryid = (event) => {
        setsubCategoryId(event.target.value);
    }
    const handlecategoryid = (event) => {
        setCategoryId(event.target.value);
        fetchAllSubCategory(event.target.value);
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
    const fillCategory = () => {
        return ListCategory.map((item) => {
            return <MenuItem value={item.categoryid}>
                {item.categoryname}
            </MenuItem>
        })
    }
    const handleSave = async (files) => {
        var formData = new FormData();
        formData.append('subbannerid', subbannerid);
        formData.append('categoryid',categoryId);
        formData.append('subcategoryid',subCategoryId);
        files.map((file, index) => {
            formData.append("image" + index, file)
        })
        var result = await postDataAndImagewithid('subbanner/savesubbanner', formData, { headers: { "content-type": "multipart/formData" } })

        if (result) {
            setSubbannerid(result.subbannerid);
            Swal.fire({
                text: 'Subbanner Added Successfully',
                imageUrl: '/logo.jpg',
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({
                title: 'Subbanner Interface',
                text: 'Failed to add Subbanner',
                imageUrl: '/logo.jpg',
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }
        setDropVisible(false)
    }
    useEffect(function(){
        fetchAllCategories()
    },[])
    const fillsubcategory = () => {
        return ListsubCategory.map((item) => {
            return <MenuItem value={item.subcategoryid}>
                {item.subcategoryname}
            </MenuItem>
        })
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
                           Subbanner
                        </div>
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
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={() => handleAddPicture()} startIcon={<Add />}>Add More Pictures</Button>
                    </Grid>
                  
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
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