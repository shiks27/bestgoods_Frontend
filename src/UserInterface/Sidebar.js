import React, { useState, useEffect } from "react";
import { Grid, Button, Avatar } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Typography from "@material-ui/core/Typography";
import Paper from '@mui/material/Paper';
import { Divider } from "@mui/material";
import Radio from '@mui/material/Radio';
import { Checkbox } from "@mui/material";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { KeyboardArrowUp } from "@mui/icons-material";
const useStyles = makeStyles({
    root: {
        background: '#ecf0f1',
        width: "100%",
        height: "100%",
    },
    subdiv: {
        background: "#fff",
        fontWeight: 'bold',
       
        height: 50,
      
    },
    grid: {
        height: 400,
        background: "#fff",
        fontWeight: 'bold',
        width: 300,
        height: 50,
        marginTop: 5
    },

})

export default function Sidebar(props) {
    const classes = useStyles(props);
    const [value1, setValue1] = useState([100,7000]);
    const [btn, setbtn] = useState(false);
    const [open, setOpen] = useState(false);
    const [btn1, setbtn1] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [btn2, setbtn2] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [minprice,setMinPrice]=useState(100);
    const [maxprice,setMaxPrice]=useState(10000);
    function valuetext(value) {
        return `${value}°C`;
    }

    const minDistance = 10;
    const handleChange1 = async(event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
            setMinPrice(value1[0])
            await props.fetchProductListByPrice(value1[0],value1[1])
            
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
            setMaxPrice(value1[1])
            await props.fetchProductListByPrice(value1[0],value1[1])
        }
      
    };
    const handleClick = () => {
        setbtn(!btn);
        setOpen(!open);
    }
    const handleClick1 = () => {
        setbtn1(!btn1);
        setOpen1(!open1);
    }
    const handleClick2 = () => {
        setbtn2(!btn2);
        setOpen2(!open2);
    }

    return (
        <div style={{ background: '#fff', width: 250, height: 'auto',position:'-webkit-sticky',position:'sticky',top:100,left:10,bottom:0,right:0,zIndex:5 }}>
            <div className={classes.subdiv}>
                <div style={{ display: 'flex', textAlign: 'left', padding: 5, marginLeft: 6, fontSize: 20, width: 250 }} >
                    Filter
                </div>
            </div>
            <Divider />
            <div style={{ padding: 10 }}>
                <div className={classes.subdiv}>
                    <div style={{ display: 'flex', textAlign: 'left', padding: 2, fontSize: 20 }} >
                        Price
                    </div>
                </div>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    value={value1}
                    onChange={handleChange1}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    min={1}
                    max={10000}
                />
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 12 }}>Min<br />{minprice}</div>
                    <div style={{ fontSize: 12, marginLeft: 150 }}>Max<br />{maxprice}</div>
                </div>
            </div>
            <Divider />
            <div >
                <div >

                    <FormControl component="fieldset" >
                        <div style={{ padding: 5 }} >
                            <FormLabel component="legend" style={{ marginLeft:3.5, fontWeight: 'bold', fontSize: 20, color: '#000' }}>
                                Sort by
                                {btn ? <KeyboardArrowDownIcon onClick={() => handleClick()} style={{ marginLeft: 142, marginTop: 3, cursor: 'pointer' }} /> : <KeyboardArrowUp onClick={() => handleClick()} style={{ marginLeft: 142, marginTop: 3, cursor: 'pointer' }} />}</FormLabel>
                        </div>
                        <div>{open ? <RadioGroup
                            aria-label="gender"
                            defaultValue="female"
                            name="radio-buttons-group"
                            style={{ marginLeft: 20 }}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="High to Low" />
                            <FormControlLabel value="male" control={<Radio />} label="Low to High" />
                            <FormControlLabel value="other" control={<Radio />} label="Older to Newest" />
                            <FormControlLabel value="other" control={<Radio />} label="Newest to Older" />
                        </RadioGroup> : null
                        }</div>

                    </FormControl>

                </div>
            </div>
            <Divider />


            <div >
                <FormControl component="fieldset" >
                    <div style={{ padding: 5 }} >
                        <FormLabel component="legend" style={{ fontWeight: 'bold', marginLeft: 3, color: '#000', fontSize: 20 }}>
                            Discount{btn1? <KeyboardArrowDownIcon onClick={() => handleClick1()} style={{ marginLeft: 120, marginTop: 3, cursor: 'pointer' }} />:<KeyboardArrowUp onClick={() => handleClick1()} style={{ marginLeft: 120, marginTop: 3, cursor: 'pointer' }}/>}</FormLabel>

                    </div>
                   <div>{open1?<RadioGroup
                        aria-label="gender"
                        defaultValue="female"
                        name="radio-buttons-group"
                        style={{ marginLeft: 20 }}
                    >
                        <FormControlLabel value="40% or More" control={<Radio />} label="40% or More" />
                        <FormControlLabel value="30% or More" control={<Radio />} label="30% or More" />
                        <FormControlLabel value="20% or More" control={<Radio />} label="20% or More" />
                        <FormControlLabel value="10% or More" control={<Radio />} label="10% or More" />
                    </RadioGroup>:null}</div> 
                </FormControl>

            </div>
            <Divider />
            <div >
                <FormControl component="fieldset" >
                    <div style={{ padding: 5 }} >
                        <FormLabel component="legend" style={{ fontWeight: 'bold', marginRight: 3, color: '#000', fontSize: 20 }}>
                            Companies{btn2? <KeyboardArrowDownIcon onClick={() => handleClick2()} style={{ marginLeft: 100, marginTop: 3, cursor: 'pointer' }}  />:<KeyboardArrowUp onClick={() => handleClick2()} style={{ marginLeft: 100, marginTop: 3, cursor: 'pointer' }} />}</FormLabel>

                    </div>
                    <div>
                        {open2?
                        <RadioGroup
                            aria-label="gender"
                            defaultValue="female"
                            name="radio-buttons-group"
                            style={{ marginLeft: 20 }}
                        >
                            <FormControlLabel value="40% or More" control={<Checkbox />} label="40% or More" />
                            <FormControlLabel value="30% or More" control={<Checkbox />} label="30% or More" />
                            <FormControlLabel value="20% or More" control={<Checkbox />} label="20% or More" />
                            <FormControlLabel value="10% or More" control={<Checkbox />} label="10% or More" />
                        </RadioGroup>:null}
                    </div>
                </FormControl>


            </div>
            <Divider />
            <div >
                <FormControl component="fieldset" >
                    <div style={{ padding: 5 }} >
                        <FormLabel component="legend" style={{ fontWeight: 'bold', marginLeft: 6, color: '#000', fontSize: 20 }}>
                           Availibility</FormLabel>

                    </div>
                    <div>
                        
                        <RadioGroup
                            aria-label="gender"
                            defaultValue="female"
                            name="radio-buttons-group"
                            style={{ marginLeft: 20 }}
                        >
                           
                            <FormControlLabel value="10% or More" control={<Checkbox />} label="Stock" />
                        </RadioGroup>
                    </div>
                </FormControl>


            </div>
        </div>

    )
}