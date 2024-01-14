import { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { Save, ClearAll, List } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { getData, postDataAndImage, ServerURL } from '../FetchNodeServices';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import DisplayallSubCategories from "./DisplayallSubCategories";
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
export default function SubCategories(props) {
    const classes = useStyles(props);
    const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" });
    const [categoryId, setcategoryId] = useState(" ");
    const [subcategoryname, setsubcategoryname] = useState(" ");
    const [subcategorydesc, setdescription] = useState(" ");
    const [ListCategory, setListCategory] = useState([])
    useEffect(function(){
        fetchAllCategories()
    },[])
    const fetchAllCategories = async () => {
        var result = await getData("category/displayallcategory")
        setListCategory(result.data)
    }

    const fillCategory=()=>{
        return ListCategory.map((item)=>{
               return <MenuItem value={item.categoryid}>
                    {item.categoryname}
                </MenuItem>
            })
    }
    const handleimage = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }
    const handleClick = () => {
        // props.history.push({ pathname: '/displayallsubcategories' })
        props.setComponent(<DisplayallSubCategories setComponent={props.setComponent}/>)
    }
    const handleChange=(event)=>{
        setcategoryId(event.target.value)
    }
    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryId', categoryId)
        formData.append('subcategoryname', subcategoryname)
        formData.append('description', subcategorydesc)
        formData.append('image', picture.bytes)
        var result = await postDataAndImage('subcategory/subcategorysubmit', formData, { headers: { "content-type": "multipart/formData" } })

        if (result) {
            Swal.fire({
                text: 'Sub-Category Added Successfully',
                imageUrl: '/logo.jpg',
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({
                title: 'Sub-Category Interface',
                text: 'Failed to add Subcategory',
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
                            Sub-Category Interface
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Button startIcon={<List />} onClick={() => handleClick()} variant="contained">Sub Category List</Button>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="Category ID"
                                onChange={(event)=>handleChange(event)}
                            >
                                {fillCategory()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField onChange={(event) => setsubcategoryname(event.target.value)} fullWidth variant="outlined" label="Sub-Category name" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event) => setdescription(event.target.value)} fullWidth variant="outlined" label="Description" />
                    </Grid>

                    <Grid item xs={6} >
                        <label htmlFor="contained-button-file">
                            <input onChange={(event) => handleimage(event)} accept="image/*" className={classes.inputstyle} id="contained-button-file" multiple type="file" />
                            <Button fullWidth variant="contained" component="span">
                                Upload
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar alt="Picture" variant="rounded" src={picture.filename} />
                    </Grid>

                    <Grid item xs={6}>
                        <Button fullWidth onClick={(event) => handleSubmit(event)} variant="contained" startIcon={<Save />}>Save</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}