import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import { Grid, TextField } from "@mui/material";
import { Save,AddBox, ClearAll, List,Edit } from '@mui/icons-material';
import { getData, postData, postDataAndImage, ServerURL } from '../FetchNodeServices';
import Swal from 'sweetalert2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SubCategories from "./SubCategories";
import * as React from 'react';
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
export default function DisplayallSubCategories(props) {
  const classes = useStyles(props);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [btnState, setbtnState] = useState(false);
  const [OldPicture, setOldPicture] = useState('')
  const [ListCategory, setListCategory] = useState([])
  const [subCategoryId, setsubCategoryId] = useState([]);
  const [CategoryId, setCategoryId] = useState(" ");
  const [SubCategoryname, setSubCategoryname] = useState("")
  const [SubCategoryDescription, setSubCategoryDescription] = useState("")
  const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" })

  useEffect(function(){
    fetchAllCategories()
},[])
const fetchAllCategories = async () => {
    var result = await getData("category/displayallcategory")
    setListCategory(result.data)
}

const handleChange=(event)=>{
  setCategoryId(event.target.value)
}
const fillCategory=()=>{
    return ListCategory.map((item)=>{
           return <MenuItem value={item.categoryid}>
                {item.categoryname}
            </MenuItem>
        })
} 

  const fetchAllSubCategory = async () => {
    var result = await getData("subcategory/displayallsubcategory");
    setList(result.data)
  }
  
  const handleimage = (event) => {
    setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setbtnState(true);
  }

  const handleCancel = () => {
    setbtnState(false);
    setPicture({ filename: `${ServerURL}/images/${OldPicture}`, bytes: "" });
  }
  useEffect(function () {
    fetchAllSubCategory()
    fetchAllCategories()
  }, [])

  const handleSubmit = async () => {
    setOpen(false)
    var body={subCategoryId:subCategoryId,CategoryId:CategoryId,SubCategoryname:SubCategoryname,SubCategoryDescription:SubCategoryDescription}
    var result=await postData('subcategory/updatesubcategorydata',body)
    if (result) {
      Swal.fire({
          text: 'Category Updated Successfully',
          imageUrl: "/logo.jpg",
          imageAlt: 'Custom image',
          icon: 'success'
      })
  }
  else {
      Swal.fire({
          title: 'Category Interface',
          text: 'Failed to Update category',
          imageUrl: "/logo.jpg",
          imageAlt: 'Custom image',
          icon: 'error'
      })
  }
  fetchAllSubCategory()
  }

  const handleEditPicture = async () => {
    setbtnState(false)
    var formData = new FormData()
      formData.append('subCategoryId', subCategoryId)
      formData.append('image', picture.bytes)
      
      var result=await postDataAndImage('subcategory/subcategoryeditpicture',formData)
      if (result) {
        Swal.fire({
            text: 'Category Updated Successfully',
            imageUrl: "/logo.jpg",
            imageAlt: 'Custom image',
            icon: 'success'
        })
    }
    else {
        Swal.fire({
            title: 'Category Interface',
            text: 'Failed to Update category',
            imageUrl: "/logo.jpg",
            imageAlt: 'Custom image',
            icon: 'error'
        })
    }
    fetchAllSubCategory()
  }
  
  const handleClickOpen = (rowData) => {
    fillCategory();
    setsubCategoryId(rowData.subcategoryid)
    setCategoryId(rowData.categoryid)
    setSubCategoryname(rowData.subcategoryname)
    setSubCategoryDescription(rowData.subcategorydesc)
    setOldPicture(rowData.image)
    setPicture({ filename: `${ServerURL}/images/${rowData.image}`, bytes: "" })
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete=async(data)=>{
    Swal.fire({
      title: `Do you want to delete the ${data.subcategoryname}?`,
      imageUrl: "/logo.jpg",
      showDenyButton:true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData('subcategory/deletesubcategory',{subcategoryid:data.subcategoryid});
        if(result){
            Swal.fire("Record Deleted Successfully");
             fetchAllSubCategory();
        }
        else{
          Swal.fire("Fail to Delete Record");
      }
      }
       else if (result.isDenied) {
        Swal.fire(`${data.subcategoryname} is Safe`);
      }
    })
   
  }

  const showSubCategoryForm = () => {
    return (<div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ fontSize: 18, letterSpacing: 1, fontWeight: 800 }}>
              Edit Sub-Category Interface
            </div>
          </Grid>


          <Grid item xs={12}>
          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={CategoryId}
                                label="Category ID"
                                onChange={(event)=>handleChange(event)}
                            >
                                {fillCategory()}
                            </Select>
                        </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField value={SubCategoryname} onChange={(event) => setSubCategoryname(event.target.value)} fullWidth variant="outlined" label="Sub-Category name" />
          </Grid>
          <Grid item xs={12}>
            <TextField value={SubCategoryDescription} onChange={(event) => setSubCategoryDescription(event.target.value)} fullWidth variant="outlined" label="Description" />
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
          {btnState?
            <span>
            <Button onClick={()=>handleEditPicture()}>Save </Button>
            <Button onClick={()=>handleCancel()}>Cancel</Button>
            </span>:<></>}
            <Avatar alt="Picture" variant="rounded" src={picture.filename} />
          </Grid>

          <Grid item xs={6}>
            <Button onClick={()=>handleSubmit()} fullWidth variant="contained" startIcon={<Edit />}>Edit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
          </Grid>

        </Grid>
      </div>
    </div>
    )

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
          Edit SubCategories
        </DialogTitle>
        <DialogContent>
          {showSubCategoryForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>

        </DialogActions>
      </Dialog>
    )
  }
const handleClick=()=>{
  // props.history.push({pathname:'/subcategories'})
  props.setComponent(<SubCategories setComponent={props.setComponent}/>)
}
  return (
    <div className={classes.root}>

      <div className={classes.subdiv}>
        <MaterialTable
        title={<div style={{width:500,display:'flex',flexDirection:'row',alignItems:'center'}}>
        <div style={{padding:5}}>
            <Button onClick={()=>handleClick()} startIcon={<AddBox />} variant="contained" >New Sub Category</Button>
              </div>
          <div style={{width:400,fontSize:20,fontWeight:700,letterSpacing:1,padding:5,float:'right'}}>
            List of Sub Categories
          </div>
          <div>
            </div>
            </div>
      }
         
          columns={[
            { title: 'Category Id', render:(rowData)=>(<div>{rowData.categoryid},{rowData.categoryname}</div>) },
            { title: 'SubCategoryName', field: 'subcategoryname' },
            { title: 'SubCategoryDescription', field: 'subcategorydesc' },
            {
              title: 'Image', field: "image",
              render: rowData =>
                <Avatar
                  alt="Sub Category image"
                  src={`${ServerURL}/images/${rowData.image}`}
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
