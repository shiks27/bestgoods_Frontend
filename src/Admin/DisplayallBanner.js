import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import { Grid, TextField } from "@mui/material";
import { Save, AddBox, ClearAll, List, Edit } from '@mui/icons-material';
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
import * as React from 'react';
import Banner from "./banner";

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
export default function DisplayallBanner(props) {
    const classes = useStyles(props);
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [btnState, setbtnState] = useState(false);
    const [OldPicture, setOldPicture] = useState('');
    const [bannerid,setbannerid]=useState('');
    const [picture, setPicture] = useState({ filename: "/camera.png", bytes: "" });
    const [description, setdescription] = useState("")
    const [priority, setpriority] = useState(" ")
    const fetchAllBanners = async () => {
        var result = await getData("banner/displayallbanners");
        setList(result.data)
    }
    const handleCancel = () => {
        setbtnState(false);
        setPicture({ filename: `${ServerURL}/images/${OldPicture}`, bytes: "" });
      }

      const handlepicture = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setbtnState(true);
      }
    
    useEffect(function () {
        fetchAllBanners()
    }, [])
    const handleSubmit = async () => {
        setOpen(false)
        var body={description:description,priority:priority,bannerid:bannerid}
        var result=await postData('banner/updatebanner',body)
        if (result) {
          Swal.fire({
              text: 'Banner Updated Successfully',
              imageUrl: "/logo.jpg",
              imageAlt: 'Custom image',
              icon: 'success'
          })
      }
      else {
          Swal.fire({
              title: 'Category Interface',
              text: 'Failed to Update banner',
              imageUrl: "/logo.jpg",
              imageAlt: 'Custom image',
              icon: 'error'
          })
      }
      fetchAllBanners()
      }
      const handleClose = () => {
        setOpen(false);
      };
      const handleClick =()=>{
        props.setComponent(<Banner setComponent={props.setComponent}/>)
      }
    
      const handleEditPicture = async () => {
        setOpen(false)
        var formData = new FormData()
         formData.append('bannerid',bannerid)
          formData.append('image', picture.bytes)
          
          var result=await postDataAndImage('banner/editbanner',formData, { headers: { "content-type": "multipart/formData" } })
          if (result) {
            Swal.fire({
                text: 'Banner Updated Successfully',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({
                title: 'Category Interface',
                text: 'Failed to Update Banner',
                imageUrl: "/logo.jpg",
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }
        fetchAllBanners()
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
              Edit Banner
            </DialogTitle>
            <DialogContent>
              {showbannerform()}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
    
            </DialogActions>
          </Dialog>
        )
      }
      const handleDelete=async(data)=>{
        Swal.fire({
          title: `Do you want to delete the ${data.description}?`,
          imageUrl: "/logo.jpg",
          showDenyButton:true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            result=await postData('banner/deletebanner',{bannerid:data.bannerid});
            if(result){
                Swal.fire("Record Deleted Successfully");
                 fetchAllBanners();
            }
            else{
              Swal.fire("Fail to Delete Record");
          }
          }
           else if (result.isDenied) {
            Swal.fire(`${data.description} is Safe`);
          }
        })
       
      }
    
    const handleClickOpen = (rowData) => {
        
        setbannerid(rowData.bannerid)
        setdescription(rowData.description)
        setpriority(rowData.priority)
        setOldPicture(rowData.image)
        setPicture({ filename: `${ServerURL}/images/${rowData.image}`, bytes: "" })
        setOpen(true);
    };
    const showbannerform = () => {
        return (<div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: 18, letterSpacing: 1, fontWeight: 800 }}>
                            Final Products
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField value={description} fullWidth onChange={(event) => setdescription(event.target.value)} variant="outlined" label="Description" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField value={priority} fullWidth onChange={(event) => setpriority(event.target.value)} variant="outlined" label="Priority" />
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
                        <Avatar alt="Picture" variant="rounded" src={picture.filename} />
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={() => handleSubmit()} fullWidth variant="contained" startIcon={<Edit />}>Edit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                    </Grid>


                </Grid>
            </div>
        </div>)
    }
    return (
        <div className={classes.root}>

            <div className={classes.subdiv}>
                <MaterialTable
                    title={<div style={{ width: 500, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ padding: 5 }}>
                            <Button onClick={() => handleClick()} startIcon={<AddBox />} variant="contained" >Add New Banner</Button>
                        </div>
                        <div style={{ width: 400, fontSize: 20, fontWeight: 700, letterSpacing: 1, padding: 5, float: 'right' }}>
                            List of Banners
                        </div>
                        <div>
                        </div>
                    </div>
                    }

                    columns={[
                        { title: 'Description', field: 'description' },
                        { title: 'Priority', field: 'priority' },

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
                            tooltip: 'Edit Banner',
                            onClick: (event, rowData) => handleClickOpen(rowData)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete Banner',
                            onClick: (event, rowData) =>handleDelete(rowData)
                        }
                    ]}

                />
            </div>
            {showDialog()}
        </div>
    )
}