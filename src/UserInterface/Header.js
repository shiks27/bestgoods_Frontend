import React, { useState, useEffect } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/system';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { getData, postData,  ServerURL } from '../FetchNodeServices';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import UserProfile from "./UserProfile";
import "./style.css"
export default function Header(props) {

  var theme=useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  console.log(matches)
  var cart = useSelector(state => state.cart)
  var keys = Object.keys(cart)
  var cartitems = Object.values(cart)
  
  var totalamount=cartitems.reduce((a,b)=>getTotalAmount(a,b),0)
  function getTotalAmount(p1,p2){
    var price=p2.offerprize>0?p2.offerprize*p2.qty:p2.price*p2.qty
    return(price+p1)
  }
  var netamount=cartitems.reduce((a,b)=>getNetAmount(a,b),0)
  function getNetAmount(p1,p2){
    var price=p2.price*p2.qty
    return(price+p1)
  }
  var savings=cartitems.reduce((a,b)=>getSavings(a,b),0)
  function getSavings(p1,p2){
    var price=p2.offerprize>0?p2.price-p2.offerprize*p2.qty:p2.price*p2.qty
    return(price+p1)
  }
  console.log("KEYS", keys)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [ListsubCategory, setListsubCategory] = useState([])
  const [categoryId, setCategoryId] = useState(" ")
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);



  // Drawer
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
function handleProceed(){
  props.history.push({pathname:"/signin"})
}
  const list = (anchor) => (
  <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
  >
    <div style={{display:'flex',padding:5,justifyContent:'center',alignItems:'center',width:380}}> <img
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            src="/logo.jpg"
            width="150"
          /></div>
    <div style={{display:'flex',padding:5,justifyContent:'center',alignItems:'center',width:380}}>
      <span style={{fontWeight:'bold',fontSize:18}}>Cart Items({keys.length})</span> 
      <span style={{fontWeight:'bold',fontSize:18,marginLeft:'auto'}}>Total &#8377;{totalamount}</span> 
    </div>
    
      <List>
          {cartitems.map((item, index) => (
              <ListItem button >
                  <ListItemIcon>
                      <img src={`${ServerURL}/images/${item.picture}`} style={{width:80,borderRadius:10}}/>

                  </ListItemIcon>
                  <div style={{display:'flex',flexDirection:'column'}}>
                  <ListItemText primary={item.modelname} style={{fontWeight:'bold'}} />
                  
                  <ListItemText primary={item.offerprize > 0 ? (
                  <div 
                     style={{width:280, fontSize: 18, 
                     fontWeight: '500', 
                     letterSpacing: 1 }}>
                       
                  <s 
                  style={{ 
                    color: '#353b48', 
                    fontSize: 14,
                    fontWeight: '500',
                    letterSpacing: 2 }}>
                    &#8377;{item.price}</s>{" "} 
                    &#8377; {item.offerprize} x{item.qty}
                  <div 
                      style={{ 
                        display:'flex',
                        color: 'darkgreen', 
                        fontSize: 18, 
                        fontWeight: '500', 
                        letterSpacing: 1 }}>
                         You Save &#8377;{(item.price - item.offerprize)*item.qty}
                      <span style={{marginLeft:'auto'}}>&#8377;{item.offerprize*item.qty}</span>
                  </div>
                  </div> ):(<>
                    <div
                     style={{ 
                       width:280,
                       fontSize: 14, 
                       fontWeight: '600',
                        color: '#222f3e',
                         letterSpacing: 2 }}>
                       &#8377;{item.price} x{item.qty}
                    </div>
                    <div
                    style={{

                      display:'flex',
                      color: "darkgreen",
                      fontSize: 18,
                      fontWeight: "500",
                      letterSpacing: 1,
                    }}
                  >
                    &nbsp;
                    <span style={{marginLeft:'auto'}}>
                   &#8377;{item.price * item.qty}
                   </span>
                  </div></>)}/>
            </div>
              </ListItem>
          ))}
      </List>
      <Divider />
      <div style={{display:'flex',padding:5,justifyContent:'center',alignItems:'center',width:380}}>
      <span style={{fontWeight:'bold',fontSize:18}}>Net Amount:</span> 
      <span style={{fontWeight:'bold',fontSize:18,marginLeft:'auto'}}> &#8377;{netamount}</span> 
    </div>
    <div style={{display:'flex',padding:5,justifyContent:'center',alignItems:'center',width:380}}>
      <span style={{fontWeight:'bold',fontSize:18}}>Savings:</span> 
      <span style={{fontWeight:'bold',fontSize:18,marginLeft:'auto'}}> &#8377;{savings}</span> 
    </div>
    <div style={{display:'flex',padding:5,justifyContent:'center',alignItems:'center',width:380}}>
      <span style={{fontWeight:'bold',fontSize:18}}>Delivery Charges:</span> 
      <span style={{fontWeight:'bold',fontSize:18,marginLeft:'auto'}}> &#8377;{0}</span> 
    </div>
    <Divider/>
    <div style={{display:'flex',padding:5,justifyContent:'center',alignItems:'center',width:380}}>
      <span style={{fontWeight:'bold',fontSize:18}}>Final Amount:</span> 
      <span style={{fontWeight:'bold',fontSize:18,marginLeft:'auto'}}> &#8377;{netamount-savings}</span> 
    </div>
    <div style={{display:'flex',padding:5,justifyContent:'center',alignItems:'center',width:380}}>
     <Button variant='contained' onClick={handleProceed} fullWidth style={{background:'black',color:'#fff',fontWeight:'bold',fontSize:18}}>Proceed</Button> 
    </div>
      {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                  <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
              </ListItem>
          ))}
      </List> */}
  </Box >
);
  //Drawer



  /////////My Menu////
  const [anchorElM, setAnchorElM] = React.useState(null);
  const mopen = Boolean(anchorElM);
  const handlemClick = (event) => {
    setCategoryId(event.currentTarget.value);
    setAnchorElM(event.currentTarget);
    fetchAllSubCategory(event.currentTarget.value)
  };
  const handlemClose = () => {
    setAnchorElM(null);
  };

  const handleMenuClick = (sid) => {
    props.history.push({ pathname: '/ProductList' }, { subcategoryid: sid })
  }
  function subMenu() {

    return (
      <div>

        <Menu
          anchorEl={anchorElM}
          open={mopen}
          onClose={handlemClose}
          onClick={handlemClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >


          {ListsubCategory.map((item) => {
            return (
              <MenuItem onClick={() => handleMenuClick(item.subcategoryid)}>
                <img src={`${ServerURL}/images/${item.image}`} width="30" />
                {item.subcategoryname}
              </MenuItem>
            )
          })}

        </Menu>
      </div>
    );
  }
  ////////////////////

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const fetchAllCategory = async () => {
    var result = await getData("category/displayallcategory");
    setCategoryList(result.data)
  }
  const fetchAllSubCategory = async (cid) => {
    var body = { categoryid: cid }
    var result = await postData("subcategory/displayallsubcategorybycategory", body);
    setListsubCategory(result.data)
  }
  useEffect(function () {
    fetchAllCategory();
  }, [])

  const mainMenu = () => {
    return categoryList.map((item, index) => {
      return (index < 4 ? <Button value={item.categoryid} className="header" onClick={handlemClick} style={{ color: '#000', fontWeight: 'bold', marginLeft: 30, fontSize: 18,
     
      }}>
        {item.categoryname}
      </Button> : <></>)
    })
  }
  const drawerMenu = () => {
    return categoryList.map((item) => {
      return ( <Button value={item.categoryid} onClick={handlemClick} 
        style={{ color: '#000',textAlign:'left',fontWeight:500,  marginLeft: 30, fontSize: 20,marginTop:10
      }}>
        {item.categoryname}
      </Button> )
    })
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    //setAnchorEl(null);
    //handleMobileMenuClose();
   props.history.push({pathname:"/userprofile"});
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={keys.length} color="error">
            <ShoppingCart onClick={toggleDrawer('right', true)} />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
//Responsive toggle Drawer
  const toggleDrawer1 = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list1 = (anchor) => (
    <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
    >
        <div style={{display:'flex',padding:5,justifyContent:'center',alignItems:'center',width:380}}> <img
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            src="/logo.jpg"
            width="150"
          /></div>
     
      <div style={{display:'flex',flexDirection:'column',marginTop:20}}>
    
        {drawerMenu()}
      </div>
        
    </Box >
  );



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: '#fff' }} position="static">
        <Toolbar>
          {matches?
          <IconButton
            size="large"
            edge="start"
            color="default"
            aria-label="open drawer"
            onClick={toggleDrawer1('left', true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>:<></>}
          <img
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            src="/logo.jpg"
            width="150"
          />
{matches?<></>: <>
{mainMenu()}
          {subMenu()}</>}
         

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="default">
              <Badge badgeContent={keys.length} color="error">
                <ShoppingCart onClick={toggleDrawer('right', true)} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="default"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="default"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div>

        <React.Fragment key={'right'}>
          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>
        </React.Fragment>

      </div>
      <div>
      <React.Fragment key={'left'}>
      <SwipeableDrawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {list1('left')}
      </SwipeableDrawer>
    </React.Fragment>
    </div>
      
    </Box>
  );
}
