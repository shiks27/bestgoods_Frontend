import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import Address from './Addresses';
import { makeStyles } from "@mui/styles";
import UserInformation from './UserInformation';
const useStyles = makeStyles({
  root: {
    display:'flex',
      padding:10,
     marginTop:10,
    width:'150%'
  },
  
});
export default function ListUserprofile(props){
  const classes=useStyles();
      const handleClick=(v)=>{
        props.setViewComponent(v);
      }
    return(<div>
        <div >
        <Paper  className={classes.root}>
          <ListItem button>
            <ListItemIcon >
              <AccountCircleIcon style={{fontSize:60,color:'#000'}}/>
            </ListItemIcon>
            <div style={{fontSize:20,marginLeft:10}}>Hello Shikhar</div> 
          </ListItem>
          </Paper>
          <Paper className={classes.root}>
          <ListItem button >
            <ListItemIcon>
              <ShoppingCartIcon  style={{fontSize:60,color:'#000'}} />
            </ListItemIcon>
            <div style={{fontSize:20,marginLeft:10}}>Order History</div> 
          </ListItem>
          </Paper>
          <Paper className={classes.root}>
          <ListItem button  onClick={()=>handleClick(<UserInformation setViewComponent={props.setViewComponent} />)} >
            <ListItemIcon>
              <AccountCircleIcon  style={{fontSize:60,color:'#000'}}/>
            </ListItemIcon>
            <div style={{fontSize:20,marginLeft:10}}>My Profile</div> 
          </ListItem>
          </Paper>
          <Paper className={classes.root}>
          <ListItem button  onClick={()=>handleClick(<Address setViewComponent={props.setViewComponent} />)}>
            <ListItemIcon>
              <AddLocationIcon  style={{fontSize:60,color:'#000'}}/>
            </ListItemIcon>
            <div style={{fontSize:20,marginLeft:10}}>Address</div> 
          </ListItem>
          </Paper>
          <Paper className={classes.root}>
          <ListItem button >
            <ListItemIcon>
              <LogoutIcon  style={{fontSize:60,color:'#000'}}/>
            </ListItemIcon>
            <div style={{fontSize:20,marginLeft:10}}>LogOut</div> 
          </ListItem>
          </Paper>
        </div>
      
      <Divider/>
      
      </div>
      );
}