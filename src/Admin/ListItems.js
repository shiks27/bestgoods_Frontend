import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from '@mui/material/Divider';
import DisplayallCategories from "./DisplayallCategories";
import DisplayallSubCategories from "./DisplayallSubCategories";
import DisplayallProducts from "./DisplayallProducts";
import DisplayCompany from "./DisplayCompany";
import Displayallcolors from "./Displayallcolors";
import DisplayFinalProduct from "./DisplayFinalProduct";
import Displayallmodels from './displayallmodels';
import FinalProduct from './FinalProduct';
import DisplayallBanner from './DisplayallBanner';
import Displaymorepictures from './Displaymorepictures';

export default function ListItems(props){
  const handleClick=(view)=>{
    props.setComponent(view)
  }
  return(<div>
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" onClick={()=>handleClick(<DisplayallCategories setComponent={props.setComponent}/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Subcategories" onClick={()=>handleClick(<DisplayallSubCategories setComponent={props.setComponent}/>)}  />
    </ListItem>
   
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Products" onClick={()=>handleClick(<DisplayallProducts setComponent={props.setComponent}/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Companies" onClick={()=>handleClick(<DisplayCompany setComponent={props.setComponent}/>)}/>
    </ListItem>
    
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Colors" onClick={()=>handleClick(<Displayallcolors setComponent={props.setComponent}/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Models" onClick={()=>handleClick(<Displayallmodels setComponent={props.setComponent}/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Final Product"  onClick={()=>handleClick(<DisplayFinalProduct setComponent={props.setComponent}/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Banners"  onClick={()=>handleClick(<DisplayallBanner setComponent={props.setComponent}/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="DisplaymorePictures"  onClick={()=>handleClick(<Displaymorepictures Pictures setComponent={props.setComponent}/>)}/>
    </ListItem>
  </div>

<Divider/>
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
</div>
);
}