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
export default function Displaymorepictures(props) {
  const classes = useStyles(props);
  const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" });
  const [open, setOpen] = useState(false)
  const [btnState, setbtnState] = useState(false);
  const [Oldpicture, setOldpicture] = useState(' ')
  const [finalproductid, setfinalproductid] = useState(" ")
  const [pictureid,setpictureid]=useState([])
  const [List, setList] = useState([])


  const handlepicture = (event) => {
    setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setbtnState(true);
  }
  const handleCancel = () => {
    setbtnState(false);
    setPicture({ filename: `${ServerURL}/images/${Oldpicture}`, bytes: "" });
  }

  const handleClickOpen = (rowData) => {
    setpictureid(rowData.pictureid);
    setfinalproductid(rowData.finalproductid);
    setPicture({ filename: `${ServerURL}/images/${rowData.image}`, bytes: "" })
    setOpen(true);
  }
  const handleEditPicture = async () => {
    setOpen(false)
    var formData = new FormData()
    formData.append('pictureid',pictureid)
    formData.append('picture', picture.bytes)

    var result = await postDataAndImage('finalproduct/editmorepicture', formData)
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
    fetchallmorepictures()
  }
  const handleClick = () => {
    props.setComponent(<FinalProduct setComponent={props.setComponent} />)
  }


  useEffect(function () {
    fetchallmorepictures()

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
          Edit More Pictures
        </DialogTitle>
        <DialogContent>
          {MorePicturesform()}
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
  const fetchallmorepictures = async () => {
    var result = await getData("finalproduct/displaymorepictures")
    setList(result.data);
  }
  const handleDelete=async(data)=>{
    Swal.fire({
      title: `Do you want to delete the ${data.pictureid}?`,
      imageUrl: "/logo.jpg",
      showDenyButton:true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData('finalproduct/deletemorepictures',{pictureid:data.pictureid});
        if(result){
            Swal.fire("Record Deleted Successfully");
             fetchallmorepictures();
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

  const MorePicturesform = () => {
    return (
      <div className={classes.root}>
        <div className={classes.subdiv}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ fontSize: 18, letterSpacing: 1, fontWeight: 800 }}>
                Edit Final Products
              </div>
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
          </Grid>
        </div>
      </div>
    )
  }
  return (<div className={classes.root}>
    <div className={classes.subdiv}>
      <MaterialTable
        title={<div style={{ width: 500, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ padding: 5 }}>
            <Button onClick={() => handleClick()} startIcon={<AddBox />} variant="contained" >Add More Pictures</Button>
          </div>

          <div style={{ width: 200, fontSize: 20, fontWeight: 700, letterSpacing: 1, padding: 5, float: 'right' }}>
            List of More Pictures
          </div>
          <div>

          </div>
        </div>
        }
        columns={[
          { title: 'FinalProduct', field: "finalproductid" },
          
          
            { title: 'Pictures', field: "image" ,
            render: rowData =>
              <Avatar
                alt="Model Logo"
                src={`${ServerURL}/images/${rowData.image}`}
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
  </div>)
}