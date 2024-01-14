import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import { Grid, TextField } from "@mui/material";
import { Save,AddBox, ClearAll, List } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { getData,postData,postDataAndImage,ServerURL } from '../FetchNodeServices';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Categories from "./Categories";

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

export default function DisplayallCategories(props) {
  const classes = useStyles();
  const [list, setList] = useState([])
  const [open, setOpen] = useState(false);
  const [btnState, setbtnState] = useState(false);
  const [OldPicture, setOldPicture]=useState('') 
  const fetchAllCategory = async() => {
    var result = await getData("category/displayallcategory");
    setList(result.data)
  }
  
  const [category, setCategory] = useState(" ");
  const [categoryId, setCategoryId] = useState([])
  const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" })
  const handlePicture = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setbtnState(true)
  }
  const handleCancel=()=>{
      setbtnState(false);
      setPicture({filename:`${ServerURL}/images/${OldPicture}`,bytes:""});
  }
  const handleSubmit = async () => {
      setOpen(false)
        var body={categoryId:categoryId,categoryName:category}
        var result=await postData('category/updatecategorydata',body)
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
      fetchAllCategory()
    }

    const handleEditPicture = async () => {
      setOpen(false)
      var formData = new FormData()
        formData.append('categoryId', categoryId)
        formData.append('icon', picture.bytes)
        
        var result=await postDataAndImage('category/categoryeditpicture',formData)
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
      fetchAllCategory()
    }

  useEffect(function () {
    fetchAllCategory()
  }, [])

  const handleClickOpen = (rowData) => {
    setCategory(rowData.categoryname)
    setCategoryId(rowData.categoryid)
    setPicture({filename:`${ServerURL}/images/${rowData.icon}`,bytes:""})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  const showCategoryForm=()=>{
    return (<div className={classes.root}>
      <div className={classes.subdivtable}>
     
          <Grid container spacing={2}>
                  <Grid item xs={12} >
                        <Grid container spacing={1}>
                            <div style={{flexDirection: 'row',display: 'flex'}}>
                                     <div style={{width: 10,height: 5,paddingRight: 30}}>
                                     <img src="/category.jpg" width="30" />
                                     </div>
                             </div>
                            <div style={{fontSize: 18,letterSpacing: 1,fontWeight: 800}}>
                                Edit Category
                            </div>
                          </Grid>
                      </Grid>
                     
          

          <Grid item xs={12}>
          <TextField value={category} onChange={(event) => setCategory(event.target.value)} fullWidth variant="outlined" label="Category name" />
          </Grid>
          <Grid item xs={6} >
          <label htmlFor="contained-button-file">
          <input onChange={(event) => handlePicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type ="file" />
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
          <Button onClick={() => handleSubmit()} fullWidth variant="contained" startIcon={<Save />}>Save</Button>
          </Grid>
          <Grid item xs={6}>
          <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
          </Grid>
          </Grid>
      </div>

  </div>
  )
  }
  const showDialog=()=>{
    return(
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Edit categories
      </DialogTitle>
      <DialogContent>
       {showCategoryForm()}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        
      </DialogActions>
    </Dialog>
    )
  }



  const handleClick=()=>{
  //  props.history.push({pathname:'/categories'})
    props.setComponent(<Categories setComponent={props.setComponent}/>)
  }

  const handleDelete=async(data)=>{
    Swal.fire({
      title: `Do you want to delete the ${data.categoryname}?`,
      imageUrl: "/logo.jpg",
      showDenyButton:true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData('category/deletecategory',{categoryid:data.categoryid});
        if(result){
            Swal.fire("Record Deleted Successfully");
             fetchAllCategory();
        }
        else{
          Swal.fire("Fail to Delete Record");
      }
      }
       else if (result.isDenied) {
        Swal.fire(`${data.categoryname} is Safe`);
      }
    })
   
  }

  return (
    <div className={classes.root}>

      <div className={classes.subdiv}>
      <MaterialTable
          title={<div style={{width:500,display:'flex',flexDirection:'row',alignItems:'center'}}>
            <div style={{padding:5}}>
                <Button onClick={()=>handleClick()} startIcon={<AddBox />} variant="contained" >New Category</Button>
                  </div>
              <div style={{width:200,fontSize:20,fontWeight:700,letterSpacing:1,padding:5,float:'right'}}>
                List of Categories
              </div>
              <div>
                
                </div>
                </div>
          }
          columns={[
            { title: 'CategoryId', field: 'categoryid' },
            { title: 'Category Name', field: 'categoryname' },
            { title: 'Icon', field: "icon" ,
            render: rowData => 
            <Avatar
        alt="Category image"
        src={`${ServerURL}/images/${rowData.icon}`} 
        variant="rounded"
        sx={{ width: 56, height: 56 }}
      />},

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
