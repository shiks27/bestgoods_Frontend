import React from "react";
import { TextField, InputBase } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Container1,
  Container2,
  Row,
  Column,
  Heading,
  FooterLink,
} from "./FooterStyles";
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Toolbar from '@mui/material/Toolbar';
import GoogleIcon from '@mui/icons-material/Google';
import { Divider } from '@mui/material';
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { grid } from "@mui/system";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center"  {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        BestGoods All Rights Reserved to Numeric Infosystem Pvt.Ltd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField);
export default function Footers(props) {


  return (

    <Box>
      <Container1 ><h1 style={{
        color: "black",
        textAlign: "center",
        marginTop: "10px",
        width:'100%'
      }}>
        CONTACT US
      </h1>
        <Row style={{width:'100%'}}>
          <Column style={{ marginLeft: 400 }}>
            <div >
              <h4 >For Complaints</h4>
              For Complaints
              <div>E-mail: help@portronics.com</div>
              <div>  Phone: (+91)9555-245-245</div>
              <div>   Need Help : Click here</div>
            </div>
          </Column>
          <Column style={{ marginLeft: 800 }}>
            <div >
              <h4>FOR BUSINESS QUERIES</h4>
              <div>sales@portronics.com</div>
              <div>Track Order : Click here</div>
            </div>
          </Column>
        </Row>
      </Container1>

      <Container>
        <h1 style={{
          color: "white",
          textAlign: "center",
          marginTop: "-80px"
        }}>
          JOIN THE CLUB
        </h1>
        <h4 style={{
          color: "white", marginTop: "10px", textAlign: "center"
        }}>
          Subscribe today to hear about our newest offers, new products, collaborations, everything Portronics - Directly to your inbox.
        </h4>
        <Row style={{ display: 'flex', paddingBottom: "30px", justifyContent: 'center', marginTop: 20 }}>

          <CssTextField
            className="username"
            name="username"
            placeholder="Enter Your mail"
            type="text"
            variant="standard"

            inputProps={{ style: { fontFamily: 'nunito', color: 'white', width: 400, fontSize: 20, letterSpacing: 7 } }}
            InputProps={{
              endAdornment: (
                <InputAdornment >
                  <IconButton>
                    <MailIcon style={{ color: "#fff" }} />
                  </IconButton>

                </InputAdornment>

              ),
            }}
            focused
          />

        </Row>
      </Container>
      <Container2>

        <Row style={{ display: 'flex', paddingBottom: "30px", justifyContent: 'center' }}>

          <InstagramIcon style={{ width: 50, height: 50, marginRight: 20 }} />
          <FacebookSharpIcon style={{ width: 50, height: 50, marginRight: 20 }} />
          <TwitterIcon style={{ width: 50, height: 50, marginRight: 20 }} />
          <PinterestIcon style={{ width: 50, height: 50, marginRight: 20 }} />
          <YouTubeIcon style={{ width: 50, height: 50, marginRight: 20 }} />
        </Row>

        <Row style={{ display: 'flex', paddingBottom: "30px", justifyContent: 'center' }}>

          <FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Blogs</FooterLink>
          <FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Support</FooterLink>
          <FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Privacy Policy</FooterLink>
          <FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>E-waste management</FooterLink>
          <FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Terms and Conditions</FooterLink>
          <FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>CSR Policy</FooterLink>
          <FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Warranty,Return and Refund</FooterLink>
          <FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Track</FooterLink>
          <FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>About US</FooterLink>
          <FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Become Partner</FooterLink>
          <FooterLink href="#" style={{ color: '#000', fontSize: '12px', marginRight: 20, letterSpacing: 1 }}>Bronchure</FooterLink>

        </Row>
        <Row style={{ display: 'flex', paddingBottom: "30px", justifyContent: 'center' }}>
          <img src="airtel.png" style={{ width: 25, height: 25, paddingRight: 15, borderRadius: "20%" }} />
          <img src="amex.png" style={{ width: 25, height: 25, paddingRight: 15, borderRadius: "20%" }} />
          <img src="freecharge.png" style={{ width: 25, height: 25, paddingRight: 15, borderRadius: "20%" }} />
          <img src="gpay.png" style={{ width: 25, height: 25, paddingRight: 15, borderRadius: "20%" }} />
          <img src="mastercard.png" style={{ width: 25, height: 25, paddingRight: 15, borderRadius: "20%" }} />
          <img src="mobikwik.png" style={{ width: 25, height: 25, paddingRight: 15, borderRadius: "20%" }} />
          <img src="netbanking.jpg" style={{ width: 25, height: 25, paddingRight: 15, borderRadius: "20%" }} />
          <img src="paytm.png" style={{ width: 25, height: 25, paddingRight: 15, borderRadius: "20%" }} />
          <img src="payzapp.png" style={{ width: 25, height: 25, paddingRight: 15, borderRadius: "20%" }} />
          <img src="rupay.png" style={{ width: 25, height: 25, paddingRight: 15, borderRadius: "20%" }} />
          <img src="visa.png" style={{ width: 25, height: 25, paddingRight: 15, borderRadius: "20%" }} />


        </Row>
        <Copyright sx={{ pt: 4 }} />
      </Container2>


    </Box>

  );

}
